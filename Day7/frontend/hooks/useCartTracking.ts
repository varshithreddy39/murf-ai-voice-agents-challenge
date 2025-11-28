'use client';

import { useState, useEffect } from 'react';
import type { ReceivedChatMessage } from '@livekit/components-react';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface LastOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  total: number;
  customerName?: string;
}

export function useCartTracking(messages: ReceivedChatMessage[]) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch last order from backend on mount
  useEffect(() => {
    fetch('/api/orders/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.order) {
          setLastOrder({
            orderId: data.order.order_id,
            timestamp: data.order.timestamp,
            items: data.order.items.map((item: any) => ({
              id: item.item_id,
              name: item.name,
              quantity: item.quantity,
              price: item.unit_price,
            })),
            total: data.order.order_total,
            customerName: data.order.customer_name,
          });
        }
      })
      .catch((err) => console.error('Failed to fetch last order:', err));
  }, []);

  useEffect(() => {
    // Parse the last agent message for cart/order updates
    const lastAgentMessage = [...messages]
      .reverse()
      .find((msg) => msg.from && 'isLocal' in msg.from && !msg.from.isLocal);

    if (!lastAgentMessage?.message) return;

    const text = lastAgentMessage.message.toLowerCase();
    
    // Debug logging
    console.log('🛒 Cart Tracking - Processing message:', lastAgentMessage.message);

    // Check if order was placed
    if (text.includes('order') && text.includes('placed successfully')) {
      // Extract order ID
      const orderIdMatch = lastAgentMessage.message.match(/ORD-[\d-]+/);
      const orderId = orderIdMatch ? orderIdMatch[0] : 'ORD-UNKNOWN';

      // Extract total from message
      const totalMatch = lastAgentMessage.message.match(/total[:\s]+(?:is\s+)?(?:rupees\s+)?(\d+(?:\.\d+)?)/i);
      let total = totalMatch ? parseFloat(totalMatch[1]) : 0;

      // If total is 0 or not found, calculate from cart
      if (total === 0 && cart.length > 0) {
        total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        console.log('🛒 Calculated total from cart:', total);
      }

      // Extract customer name
      const nameMatch = lastAgentMessage.message.match(/thanks[,\s]+(\w+)/i);
      const customerName = nameMatch ? nameMatch[1] : 'Customer';

      // Create order from current cart
      if (cart.length > 0) {
        const order: LastOrder = {
          orderId,
          timestamp: new Date().toISOString(),
          items: [...cart],
          total,
          customerName,
        };

        console.log('🛒 Order created:', order);
        setLastOrder(order);
        setOrderPlaced(true);
        setCart([]); // Clear cart after order

        // Auto-hide order modal after 10 seconds
        setTimeout(() => setOrderPlaced(false), 10000);
      }
    }

    // Check if cart was read (contains current cart info) - PRIORITIZE THIS
    if (text.includes('you have') && text.includes('items in your cart')) {
      const cartItems = extractCartFromSummary(lastAgentMessage.message);
      console.log('🛒 Extracted cart from summary:', cartItems);
      if (cartItems.length > 0) {
        setCart(cartItems);
        return; // Exit early, this is the most accurate source
      }
    }

    // Check if items were added to cart
    if (text.includes('added') && text.includes('cart')) {
      // Extract item details from the message
      const itemMatches = extractCartItems(lastAgentMessage.message);
      console.log('🛒 Extracted items from add message:', itemMatches);
      
      if (itemMatches.length > 0) {
        setCart((prevCart) => {
          const newCart = [...prevCart];
          
          itemMatches.forEach((item) => {
            const existingIndex = newCart.findIndex((i) => i.name === item.name);
            
            if (existingIndex >= 0) {
              // Update existing item
              newCart[existingIndex].quantity = item.quantity;
            } else {
              // Add new item
              newCart.push(item);
            }
          });
          
          console.log('🛒 Updated cart:', newCart);
          return newCart;
        });
      }
    }

    // Check if item was removed
    if (text.includes('removed') && text.includes('cart')) {
      const removedItem = extractRemovedItem(lastAgentMessage.message);
      if (removedItem) {
        setCart((prevCart) => prevCart.filter((item) => item.name !== removedItem));
      }
    }

    // Check if cart was cleared
    if (text.includes('cart has been cleared') || text.includes('cart is empty')) {
      setCart([]);
    }
  }, [messages]);

  return {
    cart,
    lastOrder,
    orderPlaced,
    setOrderPlaced,
    total: cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
  };
}

// Helper function to extract cart items from "Added X to cart" messages
function extractCartItems(message: string): CartItem[] {
  const items: CartItem[] = [];
  
  // Pattern 1: "Added 2 Whole Wheat Bread to your cart"
  const addPattern = /added\s+(\d+)\s+([^.]+?)\s+to\s+(?:your\s+)?cart/gi;
  let match;
  
  while ((match = addPattern.exec(message)) !== null) {
    const quantity = parseInt(match[1]);
    const name = match[2].trim();
    
    items.push({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      quantity,
      price: estimatePrice(name),
    });
  }
  
  // Pattern 2: "I've added X, Y, Z to your cart for recipe"
  // Example: "I've added Maggi Masala Noodles, Salted Butter, Fresh Onions to your cart"
  const recipePattern = /added\s+([^.]+?)\s+to\s+(?:your\s+)?cart\s+for/i;
  const recipeMatch = message.match(recipePattern);
  
  if (recipeMatch && items.length === 0) {
    const itemsList = recipeMatch[1];
    // Split by commas and "and"
    const itemNames = itemsList.split(/,\s*(?:and\s+)?|\s+and\s+/);
    
    itemNames.forEach((name) => {
      const cleanName = name.trim();
      if (cleanName) {
        items.push({
          id: cleanName.toLowerCase().replace(/\s+/g, '_'),
          name: cleanName,
          quantity: 1, // Default to 1 for recipe items
          price: estimatePrice(cleanName),
        });
      }
    });
  }
  
  return items;
}

// Helper function to extract cart from summary message
function extractCartFromSummary(message: string): CartItem[] {
  const items: CartItem[] = [];
  
  // Pattern: "2 Whole Wheat Bread at rupees 45 each"
  const itemPattern = /(\d+)\s+([^at]+?)\s+at\s+rupees\s+(\d+(?:\.\d+)?)/gi;
  let match;
  
  while ((match = itemPattern.exec(message)) !== null) {
    const quantity = parseInt(match[1]);
    const name = match[2].trim();
    const price = parseFloat(match[3]);
    
    items.push({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      quantity,
      price,
    });
  }
  
  return items;
}

// Helper function to extract removed item name
function extractRemovedItem(message: string): string | null {
  const removePattern = /removed\s+([^from]+?)\s+from\s+(?:your\s+)?cart/i;
  const match = message.match(removePattern);
  return match ? match[1].trim() : null;
}

// Estimate price based on item name (fallback)
function estimatePrice(name: string): number {
  const nameLower = name.toLowerCase();
  
  // Price estimates based on common items
  if (nameLower.includes('bread')) return 45;
  if (nameLower.includes('milk')) return 65;
  if (nameLower.includes('egg')) return 90;
  if (nameLower.includes('butter')) return 55;
  if (nameLower.includes('rice')) return 180;
  if (nameLower.includes('oil')) return 220;
  if (nameLower.includes('onion')) return 40;
  if (nameLower.includes('tomato')) return 50;
  if (nameLower.includes('chips')) return 20;
  if (nameLower.includes('biscuit')) return 25;
  if (nameLower.includes('chocolate')) return 35;
  if (nameLower.includes('cashew') || nameLower.includes('nuts')) return 180;
  if (nameLower.includes('noodles') || nameLower.includes('maggi')) return 14;
  if (nameLower.includes('pasta') && !nameLower.includes('sauce')) return 85;
  if (nameLower.includes('sauce')) return 120;
  if (nameLower.includes('cheese')) return 150;
  if (nameLower.includes('peanut butter')) return 180;
  if (nameLower.includes('pizza')) return 250;
  if (nameLower.includes('sandwich')) return 80;
  if (nameLower.includes('coffee')) return 120;
  
  return 50; // Default price
}
