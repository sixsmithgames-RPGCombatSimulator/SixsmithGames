/**
 * Validate the zero-cost GameMaster Studio content kit before publication.
 *
 * The script intentionally checks only deterministic requirements: required
 * tools, required launch sections, hidden-product mentions, and prohibited
 * integration claims. Human voice and design quality still require review.
 */

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const workflowPath = resolve('Docs/game-master-studio-content-workflow.md');
const launchKitPath = resolve('content/game-master-studio/launch-kit.md');

const requiredWorkflowTools = [
  'ChatGPT Work',
  'Codex',
  'Canva Free',
  'VEED Free',
  'OBS Studio',
];

const requiredLaunchSections = [
  '## 90-second OBS recording script',
  '## VEED Free initial edit recipe',
  '## Canva Free thumbnail brief',
  '## Canva Free lead magnet brief',
  '## Founder email',
  '## Social posts',
  '## Article outline for ChatGPT Work',
  '## Repurposing instructions for ChatGPT Work',
];

const forbiddenPublicClaims = [
  /\bSagaCraft\b/i,
  /\bautomatic(?:ally)? sync\b/i,
  /\bseamless integration\b/i,
  /\bfully integrated\b/i,
];

async function validate() {
  const [workflow, launchKit] = await Promise.all([
    readFile(workflowPath, 'utf8'),
    readFile(launchKitPath, 'utf8'),
  ]);
  const errors = [];

  for (const tool of requiredWorkflowTools) {
    if (!workflow.includes(tool)) {
      errors.push(`Workflow is missing the required tool: ${tool}`);
    }
  }

  for (const section of requiredLaunchSections) {
    if (!launchKit.includes(section)) {
      errors.push(`Launch kit is missing the required section: ${section}`);
    }
  }

  /*
   * The launch kit contains an internal prohibited-claims section, so validate
   * only the publishable material after the recording setup begins. Internal
   * guardrail notes are allowed to name the claims they reject.
   */
  const publishableStart = launchKit.indexOf('## 90-second OBS recording script');
  const publishableMaterial =
    publishableStart >= 0 ? launchKit.slice(publishableStart) : launchKit;

  for (const forbiddenClaim of forbiddenPublicClaims) {
    if (forbiddenClaim.test(publishableMaterial)) {
      errors.push(`Launch material contains a prohibited public claim: ${forbiddenClaim}`);
    }
  }

  if (errors.length > 0) {
    console.error('GameMaster Studio content validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('GameMaster Studio content workflow and launch kit are valid.');
}

validate().catch((error) => {
  console.error('Content validation could not run:', error);
  process.exitCode = 1;
});
