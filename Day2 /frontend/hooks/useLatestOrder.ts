'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useChatMessages } from './useChatMessages';

export function useLatestOrder() {
  const router = useRouter();
  const messages = useChatMessages();
  const sessionStartTime = useRef<Date | null>(null);
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Store session start time on first mount
    if (!sessionStartTime.current) {
      sessionStartTime.current = new Date();
      console.log('📅 Session started at:', sessionStartTime.current.toISOString());
    }
  }, []);

  useEffect(() => {
    if (hasRedirected.current || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    const messageText = lastMessage?.message?.toLowerCase() || '';
    const isFromAgent = !lastMessage?.from?.isLocal;

    console.log('💬 Last message:', messageText.substring(0, 50));

    // Check if agent says order is confirmed/complete/ready
    if (
      isFromAgent &&
      (messageText.includes('order is confirmed') ||
       messageText.includes('order confirmed') ||
       messageText.includes('your order for') ||
       messageText.includes('coming right up') ||
       messageText.includes('receipt'))
    ) {
      console.log('🎯 Order confirmation detected in agent message!');
      console.log('⏳ Waiting 6 seconds before showing receipt...');

      hasRedirected.current = true;

      // Wait 6 seconds for agent to finish speaking and create anticipation
      setTimeout(async () => {
        try {
          const response = await fetch('/api/latest-order');
          const data = await response.json();

          if (data.order && data.orderId && data.timestamp) {
            const orderTime = new Date(data.timestamp);
            
            console.log('📦 Latest order:', data.orderId);
            console.log('   Order time:', orderTime.toISOString());
            console.log('   Session start:', sessionStartTime.current?.toISOString());

            // Check if order was created DURING this session
            if (
              sessionStartTime.current &&
              orderTime > sessionStartTime.current &&
              data.order.status === 'completed'
            ) {
              console.log('✅ Order created during this session!');
              console.log('🚀 Redirecting to receipt...');
              
              router.push(`/receipt/${data.orderId}`);
            } else {
              console.log('⚠️ No new order found for this session');
            }
          }
        } catch (error) {
          console.error('❌ Error fetching order:', error);
        }
      }, 6000);
    }
  }, [messages, router]);
}
