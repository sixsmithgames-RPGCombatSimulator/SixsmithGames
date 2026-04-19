/**
 * Facebook Conversions API (CAPI) Server-Side Tracking
 * Sends events directly to Facebook for accurate attribution
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

export interface FacebookUserData {
  em?: string[]; // Hashed email addresses
  ph?: string[]; // Hashed phone numbers
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string; // Click ID from URL param fbclid
  fbp?: string; // Browser ID from _fbp cookie
  country?: string[]; // Country codes
}

export interface FacebookCustomData {
  currency?: string;
  value?: number;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  order_id?: string;
  status?: string;
  subscription_id?: string;
  predicted_ltv?: number;
}

export interface FacebookEvent {
  event_name: string;
  event_time: number;
  event_source_url?: string;
  action_source: 'website' | 'app' | 'physical_store' | 'phone_call' | 'chat' | 'email' | 'other';
  user_data: FacebookUserData;
  custom_data?: FacebookCustomData;
  event_id?: string; // For deduplication with Pixel
}

export interface FacebookEventPayload {
  data: FacebookEvent[];
}

// Facebook Graph API version
const FB_API_VERSION = 'v22.0';

/**
 * Hash a string using SHA-256 for Facebook's user data parameters
 */
export async function hashString(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Send events to Facebook Conversions API
 */
export async function sendFacebookEvents(
  pixelId: string,
  accessToken: string,
  events: FacebookEvent[]
): Promise<{ success: boolean; error?: string }> {
  if (!pixelId || !accessToken) {
    return { success: false, error: 'Missing Pixel ID or Access Token' };
  }

  if (events.length === 0) {
    return { success: true };
  }

  const url = `https://graph.facebook.com/${FB_API_VERSION}/${pixelId}/events?access_token=${accessToken}`;

  const payload: FacebookEventPayload = {
    data: events.map(event => ({
      ...event,
      event_time: event.event_time || Math.floor(Date.now() / 1000),
    })),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Facebook CAPI error:', errorText);
      return { success: false, error: errorText };
    }

    const result = await response.json();
    
    // Check for events_received in response
    if (result.events_received === undefined && result.error) {
      console.error('Facebook CAPI API error:', result.error);
      return { success: false, error: JSON.stringify(result.error) };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Facebook CAPI request failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Build user data from request and user information
 */
export async function buildUserData(
  email: string | null | undefined,
  requestHeaders: Headers,
  cookies: string | null
): Promise<FacebookUserData> {
  const userData: FacebookUserData = {
    client_user_agent: requestHeaders.get('user-agent') || undefined,
    client_ip_address: requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                      requestHeaders.get('x-real-ip') ||
                      undefined,
  };

  // Hash email if provided
  if (email) {
    userData.em = [await hashString(email)];
  }

  // Parse cookies for fbp and fbc
  if (cookies) {
    const fbpMatch = cookies.match(/_fbp=([^;]+)/);
    if (fbpMatch) {
      userData.fbp = fbpMatch[1];
    }

    const fbcMatch = cookies.match(/_fbc=([^;]+)/);
    if (fbcMatch) {
      userData.fbc = fbcMatch[1];
    }
  }

  return userData;
}

/**
 * Generate a unique event ID for deduplication
 */
export function generateEventId(eventName: string, uniqueId?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${eventName}_${uniqueId || ''}_${timestamp}_${random}`;
}
