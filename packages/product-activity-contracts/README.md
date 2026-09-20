# Product activity contracts

Neutral, versioned contracts for authoritative Sixsmith Games product activity.
The package is deliberately independent of Operations and of every source app.

It contains only operational activity records: committed domain events, safe
entity summaries, source-health envelopes, and centralized metric semantics.
Optional clicks, screen flows, performance diagnostics, and other experience
telemetry do not belong in this package.

The current contract version is `1`. Source applications must reuse an event ID
when retrying delivery. They must not include email addresses, campaign text,
notes, chat, prompts, character sheets, typed text, keystrokes, map contents, or
unrestricted JSON.
