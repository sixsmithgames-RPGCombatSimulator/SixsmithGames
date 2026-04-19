import type { Metadata } from 'next';

import LegalDocument from '@/components/LegalDocument';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy | Sixsmith Games',
  description: 'Information about what Sixsmith Games collects, how it is used, and when it is shared.',
  path: '/privacy',
});

const sections = [
  {
    title: '1. What this policy covers',
    paragraphs: [
      'This Privacy Policy explains how Sixsmith Games collects, uses, shares, and protects information when you visit our website, create an account, make a purchase, post a comment, or use our apps and related services.',
      'We collect the information reasonably needed to run the services, support users, process payments, secure accounts, and improve the products.',
    ],
  },
  {
    title: '2. Information you give us',
    paragraphs: [
      'You may give us information directly when you create an account, subscribe, contact us, or post content. Depending on what you do, this may include your name, email address, profile details, comment text, support messages, and other content you choose to submit.',
      'If you post a blog comment or other public content, that content may be visible to other users together with your display name and the date it was posted.',
    ],
  },
  {
    title: '3. Information collected automatically',
    paragraphs: [
      'We and our service providers may automatically collect technical and usage information such as IP address, browser type, device information, pages viewed, referring pages, approximate location derived from IP, timestamps, and interactions with the services.',
      'We also use cookies or similar technologies for authentication, session management, security, performance, and analytics.',
    ],
  },
  {
    title: '4. Payments and subscription data',
    paragraphs: [
      'Payments are processed by Stripe or another payment processor we choose. We may receive subscription and transaction details such as plan name, billing status, renewal dates, and a limited payment record needed to manage access and support your account.',
      'We do not intentionally store your full payment card number on our own servers when Stripe handles the checkout flow.',
    ],
  },
  {
    title: '5. How we use information',
    paragraphs: [
      'We use information to provide and improve the services, create and manage accounts, authenticate users, process subscriptions, respond to support requests, moderate comments, send service messages, prevent abuse, comply with legal obligations, and understand how the site is being used.',
    ],
    bullets: [
      'To sign you in and keep your account secure.',
      'To grant access to subscriptions and purchased features.',
      'To process billing, taxes, and receipts.',
      'To operate comments, support, and product communications.',
      'To analyze traffic and improve performance, content, and features.',
    ],
  },
  {
    title: '6. How we share information',
    paragraphs: [
      'We may share information with service providers that help us run the services. Based on the systems currently used by this site, those providers may include account and authentication providers such as Clerk, payment processors such as Stripe, analytics providers such as Google Analytics, hosting and infrastructure providers, code or content storage providers such as GitHub, and email or notification providers.',
      'We may also share information if required by law, to protect rights and safety, to enforce our terms, or in connection with a merger, acquisition, financing, or sale of assets.',
      'We do not share more information than is reasonably necessary for those purposes.',
    ],
  },
  {
    title: '7. Data retention',
    paragraphs: [
      'We keep information for as long as reasonably needed to provide the services, maintain business and tax records, resolve disputes, enforce agreements, and meet legal requirements. Different data types may be kept for different periods depending on why they were collected.',
    ],
  },
  {
    title: '8. Your choices',
    paragraphs: [
      'You can often access or update account information through your account provider, browser settings, or device settings. You can also contact us if you want to request access, correction, or deletion of personal information, subject to verification and any legal exceptions that apply.',
      'You can control cookies through your browser, but some parts of the services may not work properly if key cookies are disabled.',
    ],
  },
  {
    title: '9. Security',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational measures designed to protect information, but no system is perfectly secure. Please use strong passwords, secure your devices, and avoid sharing account credentials.',
    ],
  },
  {
    title: '10. Children\'s privacy',
    paragraphs: [
      'The services are not directed to children under 13, and we do not knowingly collect personal information from children under 13 without legally valid consent. If you believe a child has provided us personal information inappropriately, please contact us so we can review and delete it when appropriate.',
    ],
  },
  {
    title: '11. Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. If we make a material change, we will update the effective date and may provide additional notice when appropriate. Your continued use of the services after the updated policy takes effect means the new policy applies going forward.',
    ],
  },
  {
    title: '12. Contact',
    paragraphs: [
      'For privacy questions or requests, contact info@sixsmithgames.com.',
    ],
  },
] satisfies Parameters<typeof LegalDocument>[0]['sections'];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      summary="This policy describes what information Sixsmith Games collects, why it is collected, and when it may be shared in connection with the services."
      effectiveDate="April 14, 2026"
      notice="This policy reflects the flows currently present on the site, including account sign-in, subscription checkout, analytics, and blog comments."
      sections={sections}
    />
  );
}
