import {
  isPublicAnalyticsPath,
  redactAnalyticsUrl,
  sanitizeAnalyticsEventName,
  sanitizeAnalyticsProperties,
} from '../../lib/analytics-policy';
import { inferTrafficContext } from '../../lib/analytics';

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
});
