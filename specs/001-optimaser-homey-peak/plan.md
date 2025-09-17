## Adapter Contracts
- **PriceAdapter**: getPrices(zone): Promise<Price[]>
- **MeterAdapter**: getPower(): Promise<number>
- **DeviceAdapter** (OnOff, ThermostatSetpoint, EVChargerAmps):
   - on(), off(), setSetpoint(temp), setAmps(amps), getState()

## Homey App Manifest (app.json) Key Fields
- id, name, description, version, permissions (devices, flows, storage)
- Capabilities: measure_power, set_limit, mode, next_cheap_window, interventions
- Permissions: read/write devices, flows, storage

## Orchestrator Virtual Device
- Capabilities: total power, user limit, mode (auto/paused), next cheap window, active interventions

## Flow Cards
- **Triggers**: peak entered/exited, flex start/end
- **Conditions**: under limit?, cheap hour?
- **Actions**: boost, pause, resume, set limit

## Algorithms
- **PeakController**: rolling average + instantaneous guard, hysteresis, priority-ordered shed/restore, min on/off enforcement
- **ShiftScheduler**: build 24h plan from day-ahead prices; windows/durations; comfort bands; conflict resolution (peak overrides)

## Error Handling & Fail-safe
- Release control, backoff on repeated failures, degraded modes

## Logging/Observability
- Structured logs with decision reasons; CSV/JSON export

## Testing Strategy
- Vitest unit tests (engines/adapters), integration sims with mock adapters

## Milestones M0–M7 with Acceptance Tests
- **M0**: Project scaffolding, CI, lint, test infra
- **M1**: Data models, state machines, adapter interfaces
- **M2**: Price/Meter/Device adapters, contract tests
- **M3**: Orchestration engine (peak/shift), core logic, logs
- **M4**: Homey app manifest, orchestrator device, Flow cards
- **M5**: UI: dashboard, per-device settings, error states
- **M6**: Integration tests, fail-safe, degraded modes
- **M7**: Docs, adapter matrix, release notes, acceptance tests


# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)


## Summary
Optimaser is a Homey app for local, safe, and explainable orchestration of flexible household loads to reduce electricity costs and grid peaks. It uses day-ahead spot prices and real-time power data to optimize device usage, with a focus on user comfort, safety, and transparency. The system is strictly local, deterministic, and modular, with adapters for prices, meters, and device brands.

## Technical Context
**Language/Version**: TypeScript (strict), Homey SDK 3.0  
**Primary Dependencies**: Homey SDK, Node.js, Vitest (testing)  
**Storage**: Local Homey storage (minimal, no PII), in-memory state, cached price data  
**Testing**: Vitest (unit, integration, contract)  
**Target Platform**: Homey Pro (local, no cloud dependency)  
**Project Type**: Single Homey app (monorepo structure)  
**Performance Goals**: Deterministic, sub-second orchestration, no blocking I/O  
**Constraints**: Local-only, deterministic, no cloud, no PII, min on/off, comfort bands, fail-safe, human-readable logs  
**Scale/Scope**: Single household, 1–20 devices, 1 orchestrator per Homey

└── unit/
```

## ASCII Architecture Diagram
```
+-------------------+
## Constitution Check
+-------------------+
- All orchestration is local, deterministic, and explainable
- TypeScript only, Homey SDK 3.0
+-------------------+
- Modular adapters for prices/meters/devices under `lib/core/adapters`
+-------------------+
- Engine isolation, peak overrides shift, hysteresis, min on/off, release control
- Deterministic logs, defined offline behavior
+-------------------+
- Safety rails: min on/off, comfort bands, device limits, visible Paused mode
- Minimal local storage, no PII, explicit export only
+-------------------+
- ≥80% test coverage for core, lint/format in CI, docs for setup/safety, adapter matrix
- Single orchestrator device, clear status, Flow cards, visible errors/degraded modes
- English first, structure for SV/NO later
- Semver, migration notes, user-visible notice

**Initial Constitution Check: PASS**

## Project Structure

+-------------------+
### Documentation (this feature)
+-------------------+
```
specs/001-optimaser-homey-peak/
+-------------------+
├── plan.md              # This file (/plan command output)
+-------------------+
```

## Data Models & State Machines
- **DeviceState**: { id, type, currentState, minOnUntil, minOffUntil, comfortBand, priority, lastChanged, error }
- **Policy**: { id, type (peak/shift/flex), params, active, schedule }
- **Intervention**: { id, deviceId, type (pause/boost/restore), reason, start, end }
- **Schedule**: { deviceId, plannedWindows: [start, end], constraints }

State machines:
- Device: { Off → On (minOn), On → Off (minOff), Paused, Error }
- Policy: { Idle, Active, Overridden, Released }
- Intervention: { Pending, Active, Completed, Failed }

## Phase 0: Outline & Research
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/
├── models/              # Data models, state machines
├── services/            # Orchestration engines, scheduling, logging
├── lib/
│   └── core/
│       └── adapters/    # PriceAdapter, MeterAdapter, DeviceAdapters
├── homey/
│   ├── app.json         # Homey app manifest
│   └── devices/
│       └── orchestrator/
│           └── driver.ts
├── flows/               # Flow card definitions
└── ui/                  # Simple dashboard, per-device settings


├── contract/
├── integration/
└── unit/
```

## Phase 0: Outline & Research
- Research Homey SDK 3.0 best practices for adapters, device drivers, Flow cards
- Research deterministic scheduling and state machines in TypeScript
- Research structured logging and local storage on Homey
- Research test strategies for Homey apps (Vitest, integration sims)

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
- Extract entities from feature spec → data-model.md
- Generate adapter contracts (PriceAdapter, MeterAdapter, DeviceAdapters) → contracts/
- Generate contract tests for adapters
- Extract test scenarios from user stories → quickstart.md

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md

## Phase 2: Task Planning Approach
- TDD order: Tests before implementation
- Dependency order: Models → services → UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25–30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*No constitution violations or complexity deviations at this stage.*

## Progress Tracking
**Phase Status**:
- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
