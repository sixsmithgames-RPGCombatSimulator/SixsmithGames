import {
  isPublicAnalyticsPath,
  redactAnalyticsUrl,
  sanitizeAnalyticsEventName,
  sanitizeAnalyticsProperties,
} from '../../lib/analytics-policy';
import { inferTrafficContext } from '../../lib/analytics';
import {
  classifyAnalyticsDevice,
  isAnalyticsBot,
  normalizeFirstPartyAnalyticsEvent,
} from '../../lib/first-party-analytics-contract';

describe('analytics privacy policy', () => {
  it('removes every query parameter and fragment from anonymous page views', () => {
    expect(
      redactAnalyticsUrl(
        'https://sixsmithgames.com/checkout?planId=bundle&email=private%40example.com#confirm',
      ),
    ).toBe('https://sixsmithgames.com/checkout');
  });

  it('blocks owner-only product routes from aggregate analytics', () => {
    expect(isPublicAnalyticsPath('/apps/sagacraft')).toBe(false);
    expect(isPublicAnalyticsPath('/apps/contentcraft/projects/secret')).toBe(false);
    expect(redactAnalyticsUrl('https://sixsmithgames.com/apps/sagacraft')).toBeNull();
  });

  it('accepts only stable lowercase snake-case event names', () => {
    expect(sanitizeAnalyticsEventName('product_launch_click')).toBe('product_launch_click');
    expect(sanitizeAnalyticsEventName('Product Launched')).toBeNull();
    expect(sanitizeAnalyticsEventName('product/launched')).toBeNull();
    expect(sanitizeAnalyticsEventName('uncataloged_event')).toBeNull();
  });

  it('removes identifiers and free-form content from event properties', () => {
    expect(
      sanitizeAnalyticsProperties('product_launch_click', {
        product_slug: 'gamemaster-studio',
        destination_type: 'app',
        uncataloged_detail: 'this must not leave the browser',
        email: 'private@example.com',
        clerk_user_id: 'user_secret',
        prompt: 'private campaign text',
      }),
    ).toEqual({
      product_slug: 'gamemaster-studio',
      destination_type: 'app',
    });
  });

  it('blocks events that would reveal an owner-only product', () => {
    expect(sanitizeAnalyticsProperties('product_launch_click', { product_slug: 'sagacraft' })).toBeNull();
    expect(sanitizeAnalyticsProperties('view_item', { content_id: 'contentcraft' })).toBeNull();
    expect(sanitizeAnalyticsProperties('uncataloged_event', { product: 'shirt' })).toBeNull();
  });

  it('does not preserve free-form attribution values', () => {
    expect(
      inferTrafficContext('', '?utm_source=private%40example.com', '/pricing'),
    ).toMatchObject({
      sourceType: 'direct',
      sourceDetail: 'direct',
      utmSource: 'other',
    });

    expect(
      inferTrafficContext('', '?utm_source=chatgpt.com-private%40example.com', '/pricing'),
    ).toMatchObject({
      sourceType: 'direct',
      sourceDetail: 'direct',
      utmSource: 'other',
    });

    expect(inferTrafficContext('not a url', '', '/pricing')).toMatchObject({
      sourceType: 'referral',
      sourceDetail: 'invalid_referrer',
    });
  });

  it('recognizes itch.io as a game marketplace and preserves bounded campaign tags', () => {
    expect(
      inferTrafficContext(
        'https://sixsmithgames.itch.io/four-star-general',
        '?utm_medium=game_listing&utm_campaign=four_star_general',
        '/apps/fourstargeneral',
      ),
    ).toEqual({
      sourceType: 'game_marketplace',
      sourceDetail: 'itch.io',
      landingPath: '/apps/fourstargeneral',
      utmSource: 'itchio',
      utmMedium: 'game_listing',
      utmCampaign: 'four_star_general',
    });
  });

  it('normalizes first-party events without accepting identity or private routes', () => {
    const now = Date.parse('2026-10-04T16:00:00.000Z');
    const normalized = normalizeFirstPartyAnalyticsEvent({
      contract_version: 1,
      event_id: '0199aa11-2222-7333-8444-555566667777',
      event_name: 'product_launch_click',
      occurred_at: '2026-10-04T15:59:30.000Z',
      path: '/apps/fourstargeneral?email=private@example.com',
      source_type: 'game_marketplace',
      source_detail: 'itch.io',
      landing_path: '/apps/fourstargeneral',
      utm_source: 'itchio',
      utm_medium: 'game_listing',
      utm_campaign: 'four_star_general',
      consent_state: 'accepted',
      session_id: '0199bb11-2222-7333-8444-555566667777',
      properties: {
        product_slug: 'fourstargeneral',
        destination_type: 'app',
        email: 'private@example.com',
      },
    }, {
      countryCode: 'us',
      deviceType: 'desktop',
      environment: 'production',
      now,
    });

    expect(normalized).toMatchObject({
      path: '/apps/fourstargeneral',
      country_code: 'US',
      session_id: '0199bb11-2222-7333-8444-555566667777',
      properties: {
        product_slug: 'fourstargeneral',
        destination_type: 'app',
      },
    });
    expect(
      normalizeFirstPartyAnalyticsEvent({
        ...normalized,
        path: '/apps/contentcraft/private-project',
      }, {
        deviceType: 'desktop',
        environment: 'production',
        now,
      }),
    ).toBeNull();
  });

  it('keeps only coarse device evidence and rejects obvious bots', () => {
    expect(classifyAnalyticsDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0)')).toBe('mobile');
    expect(classifyAnalyticsDevice('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('desktop');
    expect(isAnalyticsBot('Googlebot/2.1')).toBe(true);
  });
});
