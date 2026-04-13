import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { getResolvedSubscriptionInfo } from '@/lib/subscriptionAccess.server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  const subscriptionInfo = getResolvedSubscriptionInfo(
    user?.publicMetadata,
    user?.primaryEmailAddress
  );

  return NextResponse.json(subscriptionInfo, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
