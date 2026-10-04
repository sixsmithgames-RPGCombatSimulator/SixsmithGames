# Analytics Reporting View

Last updated: October 4, 2026

## Purpose

This document defines the reporting view needed to monitor organic search traffic, AI referral traffic, landing-page performance, and product conversion paths for `www.sixsmithgames.com`.

## Instrumentation already implemented

Operations now owns the primary website report. GA4 remains an optional,
consent-gated secondary analysis surface.

- First-party `page_view` events with redacted public paths.
- First-party `page_engaged` events with visibility-aware active seconds.
- Allowlisted CTA events before consent without a visitor/session identifier.
- A random session-scoped UUID only after optional analytics consent.
- Coarse country and device category without IP or raw user-agent storage.
- itch.io attribution using `utm_source=itchio`,
  `utm_medium=game_listing`, and `utm_campaign=four_star_general`.

- `traffic_source_context` event on page load with:
  - `traffic_origin_type`
  - `traffic_origin_detail`
  - `landing_page`
  - `utm_source`
- Product CTA events:
  - `product_launch_click`
  - `product_pricing_click`
  - `product_subscribe_click`
  - `product_sign_in_prompt_click`
- CTA events include:
  - `product_slug`
  - `destination_type`
  - `surface` when the placement is known

## Recommended GA4 custom definitions

- Event-scoped dimension: `traffic_origin_type`
- Event-scoped dimension: `traffic_origin_detail`
- Event-scoped dimension: `landing_page`
- Event-scoped dimension: `product_slug`
- Event-scoped dimension: `destination_type`

## Operations reporting view

The owner-only `/analytics` workspace reports:

1. Public page views, conversion clicks, visible active time, consented sessions,
   and all-source customer records.
2. Four Star General/itch.io directional funnel totals.
3. Routes, sources, semantic conversion actions, countries, and devices.
4. Vercel visitors, browser, and operating-system aggregates as a secondary
   cross-check when its reporting API is available.
5. Explicit source errors instead of substituting false zeroes.

Anonymous steps are aggregate period totals, not a person-level path. Customer
records remain all-source context until a consented, reviewed attribution join
is implemented.

## Optional GA4 reporting view

Create a GA4 exploration or Looker Studio report with the following sections:

1. Organic search traffic
   - Filter: `traffic_origin_type = organic_search`
   - Dimensions: `landing_page`, `traffic_origin_detail`
   - Metrics: users, sessions, key events, conversions

2. AI referral traffic
   - Filter: `traffic_origin_type = ai_referral`
   - Dimensions: `landing_page`, `traffic_origin_detail`, `utm_source`
   - Metrics: users, sessions, key events, conversions

3. Top landing pages
   - Filter: include `organic_search`, `ai_referral`, and `direct`
   - Dimensions: `landing_page`, `traffic_origin_type`
   - Metrics: users, sessions, engaged sessions, conversions

4. Conversion path by product
   - Dimensions: `product_slug`, `destination_type`, `traffic_origin_type`
   - Metrics: event count, users, conversions
   - Primary events to chart:
     - `product_launch_click`
     - `product_pricing_click`
     - `product_subscribe_click`
     - `product_sign_in_prompt_click`

## AI referral identifiers to monitor

- `utm_source=chatgpt.com`
- `chat.openai.com`
- `openai`
- `claude.ai`
- `anthropic`
- `perplexity.ai`

## Search Console note

Submit `https://www.sixsmithgames.com/sitemap.xml` to Google Search Console after deployment. That step requires Search Console access and is not completed by local code changes alone.
