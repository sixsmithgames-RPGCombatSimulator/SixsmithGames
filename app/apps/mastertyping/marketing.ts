import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const masterTypingProductDefinition: ProductDefinition = {
  slug: 'mastertyping',
  name: 'MasterTyping',
  descriptor: 'Typing practice game with progression and skill building',
  h1: 'MasterTyping for typing improvement through game-like progression',
  title: 'MasterTyping | Typing Practice Game for Skill Building and Progression',
  metaDescription:
    'MasterTyping combines typing practice, assessments, drills, and game-like progression to help adults and students improve speed and accuracy.',
  heroEyebrow: 'Typing Practice and Skill Building',
  heroValue:
    'Improve typing speed, accuracy, and consistency with a tool that combines assessment, drills, and game mode instead of relying on dead repetition.',
  heroSummary:
    'MasterTyping is a browser-based typing practice app that uses assessment, targeted exercises, and game-like progression to keep training useful and repeatable.',
  oneSentence:
    'MasterTyping is a browser-based typing practice app that combines skill building with game-like progression.',
  category: 'Typing practice game and skill-building trainer',
  primaryAudience: 'People who want typing improvement without a childish or lifeless practice loop',
  platform: 'Browser-based web app',
  pricingModel: 'Free core typing practice with an optional $1.99/month premium layer',
  availability: 'Free browser-based access to the core app, with an optional premium layer',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web browser',
  offerPrice: 1.99,
  officialPath: '/apps/mastertyping',
  pricingPath: '/pricing#mastertyping',
  helpPath: '/help/mastertyping',
  supportPath: '/support',
  appUrl: APP_URLS.mastertyping,
  relatedProducts: [],
  supportingArticleSlugs: [
    'what-is-mastertyping',
    'game-systems-improve-typing-practice-consistency',
    'typing-practice-for-adults-does-not-feel-childish',
  ],
  theme: {
    gradient: 'linear-gradient(135deg, #5b3a00 0%, #a16207 50%, #f59e0b 100%)',
    accent: '#d97706',
    tint: '#fffbeb',
    dark: '#78350f',
    lightBorder: '#fcd34d',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Open app',
    appSlug: 'mastertyping',
  },
  secondaryCta: {
    kind: 'link',
    label: 'See pricing',
    href: '/pricing#mastertyping',
  },
  whatItIs: [
    'MasterTyping is a typing practice app built for people who want real typing improvement but do not want practice to feel lifeless. MasterTyping combines assessments, drills, focused exercises, and a game mode so you can build skill through repetition without turning the experience into a worksheet.',
    'MasterTyping is not a novelty typing toy, and it is not a generic educational suite. MasterTyping is a skill-building typing trainer that uses game-like progression, characters, and modes to make practice more sustainable.',
    'That makes the audience broader than one age bracket but narrower than "everyone who uses a computer." MasterTyping is best for people who want typing practice that feels structured, useful, and engaging enough to stick with.',
  ],
  whoItIsFor: [
    'MasterTyping is for adults, students, writers, developers, gamers, and other keyboard-heavy users who want typing improvement that feels practical rather than childish.',
    'MasterTyping is for people who benefit from a clear improvement loop: assess the weak spots, practice the right drills, and return to a game mode or challenge mode that keeps repetition from going stale.',
    'MasterTyping is for anyone who wants a typing practice game that still takes skill building seriously.',
  ],
  problemItSolves: [
    'Many typing tools fail in one of two ways: they are so dry that people stop practicing, or they are so novelty-driven that the actual skill-building loop gets buried. MasterTyping aims at the middle ground where the practice is real and the experience still feels motivating.',
    'Typing improvement also stalls when you do not know what to fix. MasterTyping solves that by pairing assessments and targeted exercises with multiple modes, so you have a clearer path from weak spot to better habit.',
  ],
  howItWorks: [
    'Start with an assessment or jump into a mode that matches how directly you want to train.',
    'Use the assessment flow to identify weak fingers, patterns, speed issues, or accuracy gaps that need work.',
    'Move into drills, exercises, or Pro mode so the practice session targets a real skill instead of random repetition.',
    'Use game mode and progression to keep the practice loop sustainable enough to repeat over time.',
  ],
  keyFeatures: [
    {
      title: 'Assessment mode',
      description:
        'Use a structured assessment flow to identify weak spots instead of guessing what kind of practice should come next.',
    },
    {
      title: 'Exercise mode',
      description:
        'Run targeted exercises that focus on the exact patterns or skill gaps surfaced by the assessment results.',
    },
    {
      title: 'Pro mode',
      description:
        'Practice with a stricter, skill-focused mode when you want a more direct speed-and-accuracy training loop.',
    },
    {
      title: 'Game mode',
      description:
        'Use characters, themed prompts, light progression, and game-like rewards to make repeated practice easier to sustain.',
    },
    {
      title: 'Progress tracking',
      description:
        'Review recent performance and mode-level progress so typing practice feels cumulative instead of disposable.',
    },
    {
      title: 'Low-friction premium layer',
      description:
        'Keep the core practice loop accessible while reserving the premium layer for deeper tracking and extended history.',
    },
  ],
  pricingAndAccess: [
    'MasterTyping is a free core training product with an optional $1.99 per month premium layer. You get assessments, drills, practice, and game mode up front. The paid tier comes later, if you want it.',
    'The premium layer is about retained history and deeper tracking, not locking the basic practice loop. Build skill first, decide later whether the premium layer is worth it for you.',
  ],
  faq: [
    {
      question: 'What is MasterTyping?',
      answer:
        'MasterTyping is a typing practice app that combines assessments, drills, exercises, and game-like progression. MasterTyping is built to improve speed, accuracy, and consistency without making practice feel dead.',
    },
    {
      question: 'Who is MasterTyping for?',
      answer:
        'MasterTyping is for people who want typing improvement through a useful practice loop. That includes adults, students, writers, developers, gamers, and other users who spend real time on a keyboard and want a more engaging way to build skill.',
    },
    {
      question: 'Is MasterTyping for adults, kids, or both?',
      answer:
        'MasterTyping works for both, but it is not a kids-only typing toy. MasterTyping is built for adults and older students who want practical typing improvement, while still being approachable enough for younger users who like a game-supported format.',
    },
    {
      question: 'How does MasterTyping help typing improvement?',
      answer:
        'MasterTyping pairs assessment with targeted practice. Instead of repeating random drills, you identify weak patterns, move into focused exercises or Pro mode, and then keep the repetition sustainable through game mode and progression.',
    },
    {
      question: 'What does the premium layer add?',
      answer:
        'The premium layer adds retained history and deeper tracking rather than locking the core practice loop. The benefit is better progress visibility and long-term review.',
    },
    {
      question: 'Why does MasterTyping use game mode at all?',
      answer:
        'MasterTyping uses game mode because sustained practice matters. The game layer gives you a reason to keep typing, while the assessment and exercise modes make sure the underlying work still supports real skill building.',
    },
  ],
  gettingStarted: [
    'Open the app and decide whether you want a direct assessment first or a lighter practice-first entry point.',
    'Use assessment mode early so you know where your weak spots are instead of practicing blindly.',
    'Move into exercises or Pro mode when you want targeted skill work, then use game mode to keep repetition sustainable.',
    'Review the pricing page if you want more history retention or deeper tracking over time.',
  ],
  commonUseCases: [
    'Daily typing practice for adults who want improvement without childish presentation.',
    'Skill building for students, writers, developers, or gamers who spend real time on a keyboard.',
    'Alternating between structured drills and game-like progression to make practice consistent enough to last.',
    'Using assessments to find weak patterns before deciding what typing work to do next.',
  ],
  scopeNotes: [
    'MasterTyping is a typing practice game and skill-building trainer, not a toy.',
    'MasterTyping is strongest when you want a practice loop that combines assessment, drills, and progression instead of plain repetition.',
    'MasterTyping is about typing improvement, practice consistency, and skill building, not generic ed-tech.',
  ],
};
