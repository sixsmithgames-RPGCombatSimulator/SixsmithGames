/**
 * Facebook ViewContent Event Tracker
 * Client-side component for tracking product page views
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import { useEffect } from 'react';
import { trackMarketingEvent } from '@/lib/analytics';

interface FacebookViewContentProps {
  contentId: string;
  contentName: string;
  contentType?: string;
  currency?: string;
  value?: number;
}

/**
 * Track a ViewContent event to Facebook Pixel (client-side)
 * This sends both to Meta Pixel (if installed) and GA
 */
export default function FacebookViewContent({
  contentId,
  contentName,
  contentType = 'product',
  currency,
  value,
}: FacebookViewContentProps) {
  useEffect(() => {
    // Send to Google Analytics (which may be connected to Meta)
    trackMarketingEvent('view_item', {
      content_type: contentType,
      content_id: contentId,
      content_name: contentName,
      ...(currency && { currency }),
      ...(value && { value }),
    });

    // Send to Facebook Pixel if available
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
      const fbq = (window as unknown as { fbq: (method: string, event: string, data?: Record<string, unknown>) => void }).fbq;
      
      const eventData: Record<string, unknown> = {
        content_ids: [contentId],
        content_name: contentName,
        content_type: contentType,
      };

      if (currency && value !== undefined) {
        eventData.currency = currency;
        eventData.value = value;
      }

      fbq('track', 'ViewContent', eventData);
    }
  }, [contentId, contentName, contentType, currency, value]);

  return null; // This component doesn't render anything
}
