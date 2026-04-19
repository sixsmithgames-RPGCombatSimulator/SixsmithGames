import type { Metadata } from 'next';

import LegalDocument from '@/components/LegalDocument';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service | Sixsmith Games',
  description: 'Terms for using Sixsmith Games websites, apps, subscriptions, and related services.',
  path: '/terms',
});

const sections = [
  {
    title: '1. Acceptance of these terms',
    paragraphs: [
      '"Use of this software constitues acceptance of terms." If you use the Sixsmith Games website, apps, or related services, you agree to these Terms of Service.',
      'If you do not agree, please do not use the services. If you are using the services for a company, team, or other organization, you confirm that you have authority to accept these terms on its behalf.',
    ],
  },
  {
    title: '2. What these terms cover',
    paragraphs: [
      'These terms apply to Sixsmith Games websites, hosted apps, downloadable software, accounts, subscriptions, comments, content tools, and related support or communications. Some features may have additional rules or notices, and those also apply when relevant.',
    ],
  },
  {
    title: '3. Accounts and access',
    paragraphs: [
      'You may need an account to use some features. Please provide accurate information, keep your login credentials secure, and promptly notify us if you believe your account has been accessed without permission.',
      'You are responsible for activity that happens through your account unless the activity was caused by our own failure to use reasonable security measures.',
    ],
  },
  {
    title: '4. Subscriptions, billing, and cancellation',
    paragraphs: [
      'Some products are free to start and some require a paid subscription. Prices, taxes, billing intervals, and included features are described on the pricing or checkout pages that apply at the time of purchase.',
      'Paid subscriptions are processed through Stripe or another payment provider we choose. By subscribing, you authorize recurring charges until you cancel. Unless the law requires otherwise, fees already paid are non-refundable and cancellation stops future renewals rather than rewinding time already used.',
      'We may change prices or plans prospectively. If we do, we will apply the change to future billing and post or communicate the update before it takes effect when required by law.',
    ],
  },
  {
    title: '5. Limited license',
    paragraphs: [
      'Subject to these terms, Sixsmith Games gives you a limited, non-exclusive, revocable, non-transferable license to access and use the services for their intended purpose.',
      'You may not copy, resell, lease, sublicense, reverse engineer, interfere with, or exploit the services except as expressly permitted by us or by non-waivable law.',
    ],
  },
  {
    title: '6. Ownership, copyright, and trademarks',
    paragraphs: [
      'The services, software, design, text, graphics, audio, logos, source code, and other content provided by Sixsmith Games are owned by Sixsmith Games or its licensors and are protected by copyright, trademark, and other applicable laws.',
      'Sixsmith Games, Virtual Combat Simulator, ContentCraft, MasterTyping, Gravity, and Four Star General, along with related logos, names, and branding, are reserved names and marks of Sixsmith Games. These terms do not give you any ownership rights or permission to use those names or marks except for ordinary referential use that the law allows.',
    ],
  },
  {
    title: '7. Your content and your promises',
    paragraphs: [
      'You may submit content such as comments, text, uploads, prompts, or feedback. You keep ownership of content you created, but you give Sixsmith Games a non-exclusive, worldwide, royalty-free license to host, reproduce, modify as needed for formatting or display, and otherwise use that content to operate, improve, secure, and provide the services.',
      'You represent and warrant that you have the rights needed to submit your content and that your content, prompts, uploads, and use of the services do not infringe or misappropriate anyone else\'s copyright, trademark, privacy, publicity, or other rights.',
    ],
    bullets: [
      'Do not submit content you do not have the right to use.',
      'Do not upload malware, spam, unlawful material, or abusive content.',
      'Do not use the services to violate export laws, privacy laws, or platform rules.',
    ],
  },
  {
    title: '8. Copyright complaints and removals',
    paragraphs: [
      'We may remove or disable access to content that we reasonably believe may violate these terms, the law, or someone else\'s rights. If you believe material on the services infringes your copyright, contact us at info@sixsmithgames.com with enough detail for us to investigate and respond.',
    ],
  },
  {
    title: '9. Suspension and termination',
    paragraphs: [
      'We may suspend, limit, or terminate access if we believe you violated these terms, created risk for the services or other users, failed to pay amounts due, or used the services in a way that is unlawful or harmful.',
      'You may stop using the services at any time. Sections that should logically survive termination, including ownership, payment obligations, disclaimers, limitations of liability, and indemnity, will survive.',
    ],
  },
  {
    title: '10. Disclaimers',
    paragraphs: [
      'The services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Sixsmith Games disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability, and error-free operation.',
      'We do not promise that the services will be compatible with every device, uninterrupted, perfectly secure, or suitable for high-risk, emergency, or mission-critical use.',
    ],
  },
  {
    title: '11. Limitation of liability',
    paragraphs: [
      'To the fullest extent permitted by law, Sixsmith Games and its owners, officers, employees, contractors, licensors, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, loss of goodwill, business interruption, or the cost of substitute services.',
      'To the fullest extent permitted by law, the total aggregate liability of Sixsmith Games for any claim relating to the services will not exceed the greater of the amount you paid to Sixsmith Games for the specific service in the 12 months before the claim arose or $100 USD.',
    ],
  },
  {
    title: '12. Indemnity',
    paragraphs: [
      'You agree to defend, indemnify, and hold harmless Sixsmith Games and its owners, officers, employees, contractors, licensors, and service providers from and against claims, damages, losses, liabilities, costs, and expenses, including reasonable attorneys\' fees, arising out of or related to your use of the services, your content, your violation of these terms, your violation of law, or any claim that your content or conduct infringed, misappropriated, or otherwise violated a third party\'s intellectual property or other rights.',
    ],
  },
  {
    title: '13. Changes to the services or terms',
    paragraphs: [
      'We may update the services and these terms from time to time. When we make material changes, we may post the updated version, update the effective date, or provide additional notice when appropriate. Your continued use after the updated terms take effect means you accept the revised terms.',
    ],
  },
  {
    title: '14. Contact',
    paragraphs: [
      'Questions, notices, and legal requests can be sent to info@sixsmithgames.com.',
    ],
  },
] satisfies Parameters<typeof LegalDocument>[0]['sections'];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Service"
      summary="These terms govern your use of Sixsmith Games services and protect Sixsmith Games, its software, and its product names. They outline the rules, responsibilities, and legal conditions that apply when you use the services."
      effectiveDate="April 14, 2026"
      notice="Please read this page together with the Privacy Policy. The services include websites, hosted apps, and related features across the Sixsmith Games product family."
      sections={sections}
    />
  );
}
