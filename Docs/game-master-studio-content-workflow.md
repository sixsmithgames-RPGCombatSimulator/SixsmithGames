# GameMaster Studio zero-cost content workflow

Last updated: July 26, 2026  
Owner: Sixsmith Games  
Cash cost beyond ChatGPT/Codex: $0

## Purpose

This workflow turns one honest GameMaster Studio idea into an article, email,
short video, social posts, a thumbnail, and a useful download without adding a
paid marketing service.

The work should always sound like one game master talking to another. Avoid
product-management language, development language, fake urgency, and claims
that the GMC-to-VCS handoff is automatic.

## The stack and the job each tool owns

### ChatGPT Work

Use ChatGPT Work for:

- campaign angle and audience problem;
- first drafts of articles and emails;
- video scripts and short descriptions;
- repurposing one finished idea for other channels;
- editing for a natural tabletop-GM voice.

Every prompt must include the approved claims from
`C:\SixsmithGames\CLAIMS_REGISTER.md`. Do not ask ChatGPT Work to invent
features, testimonials, customer counts, or performance numbers.

### Codex

Use Codex for:

- publishing approved website and article copy;
- metadata, structured data, sitemap, internal links, and accessibility;
- UTM link generation and analytics event wiring;
- content-file validation and repeatable workflow scripts;
- browser, build, and route verification before preview.

Codex should not publish a draft merely because it exists. The claim check and
human voice check happen first.

### Canva Free

Use Canva Free for:

- 1280 × 720 video thumbnails;
- 1080 × 1080 social graphics;
- printable checklists and lead magnets;
- simple screenshot callouts.

Use only free fonts, free shapes, original screenshots, and the Sixsmith Games
logo. Do not use a Pro template, Pro stock image, paid export, or AI-credit
feature. The first prepared brief is in
`C:\SixsmithGames\sixsmith-games-website\content\game-master-studio\launch-kit.md`.

### VEED Free

Use VEED Free only for the initial edit tests:

- trim the OBS master recording;
- add short captions;
- add the Canva thumbnail;
- export a test at the best resolution available on the free plan.

Do not upgrade, enter payment details, or enable a paid add-on. If the current
free export adds a watermark or resolution limit, record that result in the
handoff and keep the OBS master as the clean source.

### OBS Studio

Use OBS Studio for free screen and camera recording:

- canvas and output: 1920 × 1080;
- frame rate: 30 FPS;
- recording format: MKV for crash-safe capture;
- remux the approved take to MP4 inside OBS;
- separate microphone and desktop-audio tracks when practical;
- record product windows at a readable browser zoom;
- hide customer data, tokens, account details, and browser bookmarks.

The first screen-recording script is included in the launch kit. The screen
capture must show only behavior that is available in the current product.

## Deterministic production loop

1. Pick one real GM problem.
2. Add the verified product facts and prohibited claims.
3. Draft the anchor article in ChatGPT Work.
4. Perform the human voice and claims checks.
5. Publish the approved article with Codex.
6. Record the product demonstration in OBS.
7. Create the thumbnail and checklist in Canva Free.
8. Run the first short edit in VEED Free.
9. Repurpose the approved anchor into email and social posts.
10. Validate content files with `npm run content:validate`.
11. Verify links, mobile layout, metadata, consent, and events.
12. Record results and lessons in the root handoff.

## Required brief fields

Every campaign brief must state:

- the GM problem;
- the one useful promise;
- the exact product evidence;
- the call to action;
- the source page;
- the UTM campaign value;
- the claims that must not appear;
- the owner and status;
- the date reviewed.

## UTM naming

Use lowercase values joined with hyphens.

```text
utm_source=<channel>
utm_medium=<format>
utm_campaign=gamemaster-studio-launch
utm_content=<specific-asset-name>
```

Examples:

```text
https://gmstudio.sixsmithgames.com/?utm_source=youtube&utm_medium=video&utm_campaign=gamemaster-studio-launch&utm_content=90-second-workflow
https://gmstudio.sixsmithgames.com/pricing?utm_source=email&utm_medium=email&utm_campaign=gamemaster-studio-launch&utm_content=founder-note
```

## Release checks

- No public SagaCraft reference or link.
- No “automatic sync,” “seamless integration,” or equivalent claim.
- No invented testimonial, user count, saving estimate, or unsupported result.
- Central pricing mentions only Studio, GameMasterCraft, and VCS.
- Every CTA has a real destination and an analytics event.
- Analytics remains off until the visitor chooses to allow it.
- Canva, VEED, and OBS work adds no cash cost.
- The root handoff records what was produced, verified, rejected, and learned.
