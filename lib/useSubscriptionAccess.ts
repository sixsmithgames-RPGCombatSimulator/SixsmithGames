'use client';

import { useEffect, useState } from 'react';

import type { SubscriptionInfo } from '@/lib/subscription';

export function useSubscriptionAccess(enabled: boolean) {
  const [accessInfo, setAccessInfo] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setAccessInfo(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('/api/access', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to load access');
        }
        return response.json() as Promise<SubscriptionInfo>;
      })
      .then((data) => {
        setAccessInfo(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load access');
        setLoading(false);
      });

    return () => controller.abort();
  }, [enabled]);

  return { accessInfo, loading, error };
}
