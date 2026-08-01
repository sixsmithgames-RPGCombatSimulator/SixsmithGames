import fs from 'node:fs';
import path from 'node:path';

describe('GameMaster Studio application entry', () => {
  it('uses account-aware labels and one protected application handoff', () => {
    const entrySource = fs.readFileSync(
      path.join(process.cwd(), 'components/StudioEntryLink.tsx'),
      'utf8',
    );
    const navigationSource = fs.readFileSync(
      path.join(process.cwd(), 'components/Navigation.tsx'),
      'utf8',
    );
    const homeSource = fs.readFileSync(
      path.join(process.cwd(), 'app/page.tsx'),
      'utf8',
    );

    expect(entrySource).toContain('Start now');
    expect(entrySource).toContain('Open app');
    expect(entrySource).toContain('href="/app"');
    expect(entrySource).toContain('forceRedirectUrl="/app"');
    expect(navigationSource).toContain('<StudioEntryLink');
    expect(homeSource).toContain('<StudioEntryLink');
    expect(navigationSource).not.toContain('Start free');
    expect(navigationSource).not.toContain('Open Studio');
    expect(homeSource).not.toContain('Start free');
  });

  it('protects the local launch route before redirecting to the deployed app', () => {
    const proxySource = fs.readFileSync(path.join(process.cwd(), 'proxy.ts'), 'utf8');
    const launchSource = fs.readFileSync(
      path.join(process.cwd(), 'app/app/page.tsx'),
      'utf8',
    );
    const studioSource = fs.readFileSync(path.join(process.cwd(), 'lib/studio.ts'), 'utf8');

    expect(proxySource).toContain("'/app(.*)'");
    expect(launchSource).toContain('redirect(STUDIO_APP_URL)');
    expect(studioSource).toContain('https://gamemaster-studio.vercel.app/encounters');
  });
});
