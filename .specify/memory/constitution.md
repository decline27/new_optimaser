## Optimaser Constitution: Non-Negotiable Principles

### Purpose
- Local, safe, explainable orchestration to reduce energy cost and peaks

### Tech Stack
- TypeScript only
- Homey SDK 3.0
- All orchestration must run locally
- External calls allowed only for prices/flex; must be cached

### Architecture Rules
- Strict adapters (prices/meters/devices) under `lib/core/adapters`
- Engine isolation
- Peak overrides shift, not shed
- Hysteresis and min on/off enforced
- Release control logic
- Deterministic logs
- Defined offline behavior

### Safety & Comfort
- Enforce min on/off times and comfort bands
- Conservative defaults
- Visible Paused mode
- Never exceed device limits

### Data & Privacy
- Minimal local storage
- No PII stored
- Data export only via explicit user action

### Quality Bar
- ≥80% test coverage for core
- Lint/format checks in CI
- Docs for setup and safety
- Adapter capability matrix maintained

### UX
- Single orchestrator device
- Clear status: power vs limit, next cheap window, active interventions
- Flow cards for user actions
- Visible errors and degraded modes

### Localization
- English first
- Structure for Swedish/Norwegian later

### Versioning & Releases
- Semantic versioning (semver)
- Migration notes for breaking changes
- User-visible notice on updates
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->