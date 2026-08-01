import fs from 'node:fs';
import path from 'node:path';

describe('Sixsmith Games branded host boundaries', () => {
  it('keeps marketing canonical on www and sends application entry to gmstudio', () => {
    const siteSource = fs.readFileSync(path.join(process.cwd(), 'lib/site.ts'), 'utf8');
    const studioSource = fs.readFileSync(path.join(process.cwd(), 'lib/studio.ts'), 'utf8');

    expect(siteSource).toContain("SITE_URL = 'https://www.sixsmithgames.com'");
    expect(siteSource).toContain("SITE_HOSTNAME = 'www.sixsmithgames.com'");
    expect(studioSource).toContain("STUDIO_APP_URL = 'https://gmstudio.sixsmithgames.com/encounters'");
    expect(`${siteSource}\n${studioSource}`).not.toContain('gamemaster-studio.vercel.app');
  });

  it('redirects only the marketing apex and does not claim the Studio app host', () => {
    const proxySource = fs.readFileSync(path.join(process.cwd(), 'proxy.ts'), 'utf8');

    expect(proxySource).toContain("host === 'sixsmithgames.com'");
    expect(proxySource).not.toContain("host === 'gmstudio.sixsmithgames.com'");
    expect(proxySource).not.toContain('www.${SITE_HOSTNAME}');
  });
});
