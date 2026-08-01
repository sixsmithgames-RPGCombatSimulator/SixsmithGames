import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { render, screen } from '@testing-library/react';

const mockUseUser = jest.fn();

jest.mock('@clerk/nextjs', () => ({
  SignUpButton: ({ children }: { children: React.ReactNode }) => children,
  useUser: () => mockUseUser(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const React = jest.requireActual<typeof import('react')>('react');
    return React.createElement('a', { href, ...props }, children);
  },
}));

import StudioEntryLink from '../../components/StudioEntryLink';

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
    expect(studioSource).toContain('https://gmstudio.sixsmithgames.com/encounters');
    expect(studioSource).not.toContain('vercel.app');
  });
});

describe('StudioEntryLink account states', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows a disabled Start now control while the account is loading', () => {
    mockUseUser.mockReturnValue({ isLoaded: false, isSignedIn: undefined });

    render(React.createElement(StudioEntryLink, { placement: 'test' }));

    expect(screen.getByRole('button', { name: 'Checking your account' })).toBeDisabled();
    expect(screen.getByText('Start now')).toBeInTheDocument();
  });

  it('shows Start now to a signed-out visitor', () => {
    mockUseUser.mockReturnValue({ isLoaded: true, isSignedIn: false });

    render(React.createElement(StudioEntryLink, { placement: 'test' }));

    expect(screen.getByRole('button', { name: 'Start now' })).toBeEnabled();
    expect(screen.queryByRole('link', { name: 'Open app' })).not.toBeInTheDocument();
  });

  it('shows Open app to a signed-in visitor', () => {
    mockUseUser.mockReturnValue({ isLoaded: true, isSignedIn: true });

    render(React.createElement(StudioEntryLink, { placement: 'test' }));

    expect(screen.getByRole('link', { name: 'Open app' })).toHaveAttribute('href', '/app');
    expect(screen.queryByRole('button', { name: 'Start now' })).not.toBeInTheDocument();
  });
});
