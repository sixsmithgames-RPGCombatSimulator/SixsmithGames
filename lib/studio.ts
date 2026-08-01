/**
 * Authoritative public launch destination for the currently deployed Studio app.
 *
 * Marketing links use the protected local `/app` route instead of exposing this
 * deployment URL throughout the site. That keeps one controlled handoff point
 * if the application later moves to its own permanent app hostname.
 */
export const STUDIO_APP_URL = 'https://gamemaster-studio.vercel.app/encounters';
