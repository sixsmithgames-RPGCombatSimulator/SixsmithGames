/**
 * Authoritative public launch destination for the currently deployed Studio app.
 *
 * Marketing links use the protected local `/app` route instead of exposing this
 * application URL throughout the site. This keeps one authenticated handoff
 * point while ensuring customers remain on the branded Studio hostname.
 */
export const STUDIO_APP_URL = 'https://gmstudio.sixsmithgames.com/encounters';
