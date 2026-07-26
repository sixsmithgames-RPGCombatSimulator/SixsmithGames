/**
 * Link wrapper that records meaningful marketing actions after consent.
 *
 * If analytics is unavailable or declined, the helper is a no-op and the link
 * still navigates normally.
 */

'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { trackMarketingEvent } from '@/lib/analytics';

type MarketingLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    eventName: string;
    eventData?: Record<string, string | number | boolean | undefined>;
  };

export default function MarketingLink({
  children,
  eventName,
  eventData,
  ...linkProps
}: MarketingLinkProps) {
  return (
    <Link
      {...linkProps}
      onClick={() => trackMarketingEvent(eventName, eventData)}
    >
      {children}
    </Link>
  );
}
