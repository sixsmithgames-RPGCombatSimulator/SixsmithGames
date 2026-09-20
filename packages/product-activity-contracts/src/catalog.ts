export const PRODUCT_SLUGS = [
  "virtual-combat-simulator",
  "gamemastercraft",
  "contentcraft",
  "sagacraft",
  "four-star-general",
  "gravity",
  "mastertyping",
  "gamemaster-studio",
  "game-master-assistant",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export type SessionContribution = "none" | "started" | "completed";

export interface ActivityEventDefinition {
  eventType: string;
  productSlugs: readonly ProductSlug[];
  allowedDimensions: readonly string[];
  meaningful: boolean;
  completion: boolean;
  sessionContribution: SessionContribution;
}

const VCS: readonly ProductSlug[] = ["virtual-combat-simulator"];
const GMC: readonly ProductSlug[] = ["gamemastercraft"];
const CONTENT: readonly ProductSlug[] = ["contentcraft", "sagacraft"];
const FSG: readonly ProductSlug[] = ["four-star-general"];
const GRAVITY: readonly ProductSlug[] = ["gravity"];
const TYPING: readonly ProductSlug[] = ["mastertyping"];
const STUDIO: readonly ProductSlug[] = [
  "gamemaster-studio",
  "game-master-assistant",
];

/**
 * Purpose: Defines the first-release domain vocabulary and its metric contribution.
 * Safety: Dimension keys are an allowlist; source apps cannot add arbitrary payload fields.
 */
export const PRODUCT_ACTIVITY_EVENT_CATALOG: readonly ActivityEventDefinition[] = [
  { eventType: "battle_room_created", productSlugs: VCS, allowedDimensions: ["ruleset"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "battle_room_archived", productSlugs: VCS, allowedDimensions: [], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "battle_room_restored", productSlugs: VCS, allowedDimensions: [], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "participant_joined", productSlugs: VCS, allowedDimensions: ["participant_role", "participant_count"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "encounter_started", productSlugs: VCS, allowedDimensions: ["participant_count"], meaningful: true, completion: false, sessionContribution: "started" },
  { eventType: "encounter_completed", productSlugs: VCS, allowedDimensions: ["round_count", "action_count", "active_seconds"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "initiative_started", productSlugs: VCS, allowedDimensions: ["participant_count"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "rest_completed", productSlugs: VCS, allowedDimensions: ["rest_type"], meaningful: true, completion: true, sessionContribution: "none" },

  { eventType: "project_created", productSlugs: [...GMC, ...CONTENT], allowedDimensions: ["project_kind"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "campaign_created", productSlugs: GMC, allowedDimensions: ["ruleset"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "session_record_created", productSlugs: GMC, allowedDimensions: [], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "entity_created", productSlugs: GMC, allowedDimensions: ["entity_type"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "encounter_prepared", productSlugs: GMC, allowedDimensions: ["ruleset"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "encounter_sent_to_vcs", productSlugs: GMC, allowedDimensions: [], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "canon_update_confirmed", productSlugs: GMC, allowedDimensions: ["entity_type"], meaningful: true, completion: true, sessionContribution: "none" },

  { eventType: "content_block_created", productSlugs: CONTENT, allowedDimensions: ["block_type"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "generation_completed", productSlugs: CONTENT, allowedDimensions: ["generation_type", "latency_ms"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "generation_saved", productSlugs: CONTENT, allowedDimensions: ["generation_type"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "generation_discarded", productSlugs: CONTENT, allowedDimensions: ["generation_type"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "fact_check_completed", productSlugs: CONTENT, allowedDimensions: ["result"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "import_completed", productSlugs: CONTENT, allowedDimensions: ["import_type", "item_count"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "export_completed", productSlugs: CONTENT, allowedDimensions: ["export_type", "item_count"], meaningful: true, completion: true, sessionContribution: "none" },

  { eventType: "general_commissioned", productSlugs: FSG, allowedDimensions: ["rank"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "general_retired", productSlugs: FSG, allowedDimensions: ["rank", "service_record_count"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "standalone_mission_started", productSlugs: FSG, allowedDimensions: ["difficulty"], meaningful: true, completion: false, sessionContribution: "started" },
  { eventType: "standalone_mission_completed", productSlugs: FSG, allowedDimensions: ["difficulty", "outcome_grade", "active_seconds"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "standalone_mission_abandoned", productSlugs: FSG, allowedDimensions: ["difficulty", "active_seconds"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "campaign_started", productSlugs: FSG, allowedDimensions: ["difficulty"], meaningful: true, completion: false, sessionContribution: "started" },
  { eventType: "campaign_resumed", productSlugs: FSG, allowedDimensions: [], meaningful: true, completion: false, sessionContribution: "started" },
  { eventType: "campaign_completed", productSlugs: FSG, allowedDimensions: ["mission_count", "active_seconds"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "campaign_abandoned", productSlugs: FSG, allowedDimensions: ["mission_count", "active_seconds"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "campaign_mission_completed", productSlugs: FSG, allowedDimensions: ["mission_number", "outcome_grade"], meaningful: true, completion: true, sessionContribution: "none" },

  { eventType: "game_session_created", productSlugs: GRAVITY, allowedDimensions: ["player_count"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "game_session_joined", productSlugs: GRAVITY, allowedDimensions: ["player_role", "player_count"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "game_started", productSlugs: GRAVITY, allowedDimensions: ["player_count"], meaningful: true, completion: false, sessionContribution: "started" },
  { eventType: "game_ended", productSlugs: GRAVITY, allowedDimensions: ["turn_count", "player_count", "active_seconds"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "game_abandoned", productSlugs: GRAVITY, allowedDimensions: ["turn_count", "active_seconds"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "turn_committed", productSlugs: GRAVITY, allowedDimensions: ["turn_number"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "player_escaped", productSlugs: GRAVITY, allowedDimensions: ["turn_number"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "player_wrecked", productSlugs: GRAVITY, allowedDimensions: ["turn_number"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "player_eliminated", productSlugs: GRAVITY, allowedDimensions: ["turn_number"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "mission_completed", productSlugs: GRAVITY, allowedDimensions: ["mission_type", "outcome_grade"], meaningful: true, completion: true, sessionContribution: "none" },

  { eventType: "typing_session_completed", productSlugs: TYPING, allowedDimensions: ["active_seconds", "wpm", "accuracy", "exercise_type"], meaningful: true, completion: true, sessionContribution: "completed" },
  { eventType: "assessment_completed", productSlugs: TYPING, allowedDimensions: ["active_seconds", "wpm", "accuracy", "assessment_type"], meaningful: true, completion: true, sessionContribution: "completed" },
  { eventType: "typing_game_run_completed", productSlugs: TYPING, allowedDimensions: ["active_seconds", "wpm", "accuracy", "game_type", "score"], meaningful: true, completion: true, sessionContribution: "completed" },
  { eventType: "tutorial_completed", productSlugs: TYPING, allowedDimensions: ["tutorial_id", "active_seconds"], meaningful: true, completion: true, sessionContribution: "completed" },
  { eventType: "champion_unlocked", productSlugs: TYPING, allowedDimensions: ["champion_id"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "mastery_updated", productSlugs: TYPING, allowedDimensions: ["mastery_level", "wpm", "accuracy"], meaningful: true, completion: false, sessionContribution: "none" },

  { eventType: "handoff_started", productSlugs: STUDIO, allowedDimensions: ["workflow_type"], meaningful: true, completion: false, sessionContribution: "started" },
  { eventType: "handoff_completed", productSlugs: STUDIO, allowedDimensions: ["workflow_type", "latency_ms"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "handoff_failed", productSlugs: STUDIO, allowedDimensions: ["workflow_type", "failure_code", "latency_ms"], meaningful: true, completion: false, sessionContribution: "none" },
  { eventType: "result_returned", productSlugs: STUDIO, allowedDimensions: ["workflow_type", "latency_ms"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "assistant_operation_completed", productSlugs: STUDIO, allowedDimensions: ["operation_type", "latency_ms", "cost_micros"], meaningful: true, completion: true, sessionContribution: "completed" },
  { eventType: "assistant_operation_failed", productSlugs: STUDIO, allowedDimensions: ["operation_type", "failure_code", "latency_ms", "cost_micros"], meaningful: true, completion: false, sessionContribution: "completed" },
  { eventType: "proposal_confirmed", productSlugs: STUDIO, allowedDimensions: ["proposal_type"], meaningful: true, completion: true, sessionContribution: "none" },
  { eventType: "proposal_rejected", productSlugs: STUDIO, allowedDimensions: ["proposal_type"], meaningful: true, completion: false, sessionContribution: "none" },

  { eventType: "account_deletion_confirmed", productSlugs: PRODUCT_SLUGS, allowedDimensions: [], meaningful: false, completion: false, sessionContribution: "none" },
  { eventType: "entity_deletion_confirmed", productSlugs: PRODUCT_SLUGS, allowedDimensions: ["entity_type"], meaningful: false, completion: false, sessionContribution: "none" },
] as const;

const EVENT_DEFINITIONS = new Map(
  PRODUCT_ACTIVITY_EVENT_CATALOG.map((definition) => [
    definition.eventType,
    definition,
  ]),
);

/**
 * Purpose: Resolves centralized metric and dimension semantics for one event name.
 * Returns: The registered definition, or undefined when the event is unsupported.
 */
export function getActivityEventDefinition(
  eventType: string,
): ActivityEventDefinition | undefined {
  return EVENT_DEFINITIONS.get(eventType);
}

export const PRODUCT_ENTITY_CATALOG = [
  { aggregateType: "battle_room", productSlugs: VCS, allowedCounters: ["participant_count", "encounter_count", "round_count", "action_count"] },
  { aggregateType: "campaign", productSlugs: [...GMC, ...FSG], allowedCounters: ["session_count", "entity_count", "encounter_count", "mission_count", "completion_count"] },
  { aggregateType: "project", productSlugs: [...GMC, ...CONTENT], allowedCounters: ["block_count", "session_count", "entity_count", "encounter_count", "generation_count"] },
  { aggregateType: "general", productSlugs: FSG, allowedCounters: ["service_record_count", "mission_count", "win_count"] },
  { aggregateType: "game_session", productSlugs: GRAVITY, allowedCounters: ["player_count", "turn_count", "mission_count", "win_count"] },
  { aggregateType: "typing_profile", productSlugs: TYPING, allowedCounters: ["practice_session_count", "game_run_count", "assessment_count", "active_seconds", "champion_count"] },
  { aggregateType: "studio_workflow", productSlugs: STUDIO, allowedCounters: ["handoff_count", "completion_count", "failure_count", "latency_ms", "cost_micros"] },
] as const;

export type ProductEntityDefinition = (typeof PRODUCT_ENTITY_CATALOG)[number];

/**
 * Purpose: Resolves the safe summary contract for a product-owned aggregate.
 * Returns: The catalog entry matching both aggregate type and product.
 */
export function getProductEntityDefinition(
  aggregateType: string,
  productSlug: string,
): ProductEntityDefinition | undefined {
  return PRODUCT_ENTITY_CATALOG.find(
    (definition) =>
      definition.aggregateType === aggregateType &&
      definition.productSlugs.some((slug) => slug === productSlug),
  );
}
