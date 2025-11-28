"""
Cart management module for QuickBasket voice ordering system.
Handles cart operations, recipe lookups, and order persistence.
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

logger = logging.getLogger("cart_manager")

# File paths
BASE_DIR = Path(__file__).parent.parent
CATALOG_FILE = BASE_DIR / "catalog.json"
RECIPES_FILE = BASE_DIR / "recipes.json"
ORDERS_FILE = BASE_DIR / "orders.json"


class CartManager:
    """Manages shopping cart operations and order processing."""

    def __init__(self):
        self.cart: Dict[str, List[Dict]] = {"items": []}
        self.catalog: List[Dict] = self._load_catalog()
        self.recipes: Dict[str, List[str]] = self._load_recipes()
        logger.info("🛒 CartManager initialized")

    def _load_catalog(self) -> List[Dict]:
        """Load product catalog from JSON."""
        try:
            with open(CATALOG_FILE, "r") as f:
                catalog = json.load(f)
                logger.info(f"📦 Loaded {len(catalog)} items from catalog")
                return catalog
        except Exception as e:
            logger.error(f"❌ Failed to load catalog: {e}")
            return []

    def _load_recipes(self) -> Dict[str, List[str]]:
        """Load recipes from JSON."""
        try:
            with open(RECIPES_FILE, "r") as f:
                recipes = json.load(f)
                logger.info(f"📖 Loaded {len(recipes)} recipes")
                return recipes
        except Exception as e:
            logger.error(f"❌ Failed to load recipes: {e}")
            return {}

    def find_item_by_id(self, item_id: str) -> Optional[Dict]:
        """Find item in catalog by ID."""
        for item in self.catalog:
            if item["id"] == item_id:
                return item
        return None

    def find_item_by_name(self, name: str) -> Optional[Dict]:
        """Find item in catalog by name (case-insensitive partial match)."""
        name_lower = name.lower()
        for item in self.catalog:
            if name_lower in item["name"].lower():
                return item
        return None

    def add_to_cart(self, item_id: str, quantity: int = 1, notes: Optional[str] = None) -> str:
        """
        Add item to cart or update quantity if already exists.
        
        Args:
            item_id: Product ID from catalog
            quantity: Number of items to add
            notes: Optional notes about the item
            
        Returns:
            Confirmation message
        """
        item = self.find_item_by_id(item_id)
        if not item:
            logger.warning(f"⚠️ Item not found: {item_id}")
            return f"Sorry, I couldn't find that item in our catalog."

        # Check if item already in cart
        for cart_item in self.cart["items"]:
            if cart_item["item_id"] == item_id:
                cart_item["quantity"] += quantity
                cart_item["line_total"] = cart_item["quantity"] * cart_item["unit_price"]
                logger.info(f"✅ Updated {item['name']} quantity to {cart_item['quantity']}")
                return f"Updated {item['name']} to {cart_item['quantity']} units in your cart."

        # Add new item
        cart_item = {
            "item_id": item_id,
            "name": item["name"],
            "quantity": quantity,
            "unit_price": item["price"],
            "line_total": quantity * item["price"],
            "notes": notes or ""
        }
        self.cart["items"].append(cart_item)
        logger.info(f"✅ Added {quantity}x {item['name']} to cart")
        return f"Added {quantity} {item['name']} to your cart."

    def remove_from_cart(self, item_id: str) -> str:
        """
        Remove item from cart completely.
        
        Args:
            item_id: Product ID to remove
            
        Returns:
            Confirmation message
        """
        for i, cart_item in enumerate(self.cart["items"]):
            if cart_item["item_id"] == item_id:
                removed_item = self.cart["items"].pop(i)
                logger.info(f"🗑️ Removed {removed_item['name']} from cart")
                return f"Removed {removed_item['name']} from your cart."
        
        logger.warning(f"⚠️ Item not in cart: {item_id}")
        return "That item is not in your cart."

    def update_quantity(self, item_id: str, quantity: int) -> str:
        """
        Update quantity of an item in cart.
        
        Args:
            item_id: Product ID to update
            quantity: New quantity (0 to remove)
            
        Returns:
            Confirmation message
        """
        if quantity <= 0:
            return self.remove_from_cart(item_id)

        for cart_item in self.cart["items"]:
            if cart_item["item_id"] == item_id:
                cart_item["quantity"] = quantity
                cart_item["line_total"] = quantity * cart_item["unit_price"]
                logger.info(f"✅ Updated {cart_item['name']} quantity to {quantity}")
                return f"Updated {cart_item['name']} to {quantity} units."

        logger.warning(f"⚠️ Item not in cart: {item_id}")
        return "That item is not in your cart."

    def list_cart(self) -> Dict:
        """
        Get current cart contents with total.
        
        Returns:
            Dict with items and total
        """
        total = sum(item["line_total"] for item in self.cart["items"])
        return {
            "items": self.cart["items"],
            "total": total,
            "item_count": len(self.cart["items"])
        }

    def add_ingredients_for_dish(self, dish_name: str, servings: int = 1) -> str:
        """
        Add ingredients for a recipe to cart.
        
        Args:
            dish_name: Name of the dish (case-insensitive)
            servings: Number of servings (multiplies quantities)
            
        Returns:
            Confirmation message
        """
        dish_lower = dish_name.lower()
        
        # Find matching recipe
        recipe_items = None
        matched_dish = None
        for recipe_key, items in self.recipes.items():
            if dish_lower in recipe_key.lower() or recipe_key.lower() in dish_lower:
                recipe_items = items
                matched_dish = recipe_key
                break

        if not recipe_items:
            logger.warning(f"⚠️ Recipe not found: {dish_name}")
            return f"Sorry, I don't have a recipe for {dish_name}. Try asking for specific items instead."

        # Add each ingredient
        added_items = []
        for item_id in recipe_items:
            item = self.find_item_by_id(item_id)
            if item:
                self.add_to_cart(item_id, quantity=servings, notes=f"for {matched_dish}")
                added_items.append(item["name"])

        logger.info(f"📖 Added ingredients for {matched_dish}: {', '.join(added_items)}")
        
        items_text = ", ".join(added_items)
        return f"I've added {items_text} to your cart for {matched_dish}."

    def save_order(self, customer_name: str, customer_address: str = "", delivery_instructions: str = "") -> Dict:
        """
        Save current cart as an order to orders.json.
        
        Args:
            customer_name: Customer's name
            customer_address: Delivery address
            delivery_instructions: Special delivery notes
            
        Returns:
            Order object
        """
        if not self.cart["items"]:
            logger.warning("⚠️ Attempted to save empty cart")
            return {"error": "Cart is empty"}

        # Generate order ID
        timestamp = datetime.now()
        order_id = f"ORD-{timestamp.strftime('%Y%m%d-%H%M%S')}"

        # Build order object
        order = {
            "order_id": order_id,
            "timestamp": timestamp.isoformat(),
            "customer_name": customer_name,
            "customer_address": customer_address,
            "delivery_instructions": delivery_instructions,
            "items": self.cart["items"].copy(),
            "order_total": sum(item["line_total"] for item in self.cart["items"])
        }

        # Load existing orders
        try:
            with open(ORDERS_FILE, "r") as f:
                orders = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            orders = []

        # Append new order
        orders.append(order)

        # Save to file
        try:
            with open(ORDERS_FILE, "w") as f:
                json.dump(orders, f, indent=2)
            logger.info(f"💾 Saved order {order_id} for {customer_name}")
        except Exception as e:
            logger.error(f"❌ Failed to save order: {e}")
            return {"error": "Failed to save order"}

        # Clear cart
        self.cart = {"items": []}

        return order

    def clear_cart(self) -> str:
        """Clear all items from cart."""
        self.cart = {"items": []}
        logger.info("🗑️ Cart cleared")
        return "Your cart has been cleared."
