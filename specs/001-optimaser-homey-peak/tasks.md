# Tasks: Optimaser – Homey Peak & Price Orchestrator

**Input**: Design documents from `/specs/001-optimaser-homey-peak/`
**Prerequisites**: plan.md (required)

## Phase 3.1: Setup
- [x] T001 Create project structure per implementation plan (src/, tests/, adapters, Homey manifest)
	- [x] T002 Initialize TypeScript project with Homey SDK 3.0 dependencies
	- [x] T003 [P] Configure linting and formatting tools (e.g., ESLint, Prettier)

## Phase 3.2: Tests First (TDD)
	- [x] T004 [P] Write contract test for PriceAdapter in tests/contract/price-adapter.test.ts
	- [x] T005 [P] Write contract test for MeterAdapter in tests/contract/meter-adapter.test.ts
	- [x] T006 [P] Write contract test for DeviceAdapter in tests/contract/device-adapter.test.ts
	- [x] T007 [P] Write integration test for peak shaving scenario in tests/integration/peak-shaving.test.ts
	- [x] T008 [P] Write integration test for load shifting scenario in tests/integration/load-shifting.test.ts
	- [x] T009 [P] Write integration test for flex event handling in tests/integration/flex-event.test.ts

## Phase 3.3: Core Implementation
	- [x] T010 [P] Implement DeviceState model in src/models/device-state.ts
	- [x] T011 [P] Implement Policy model in src/models/policy.ts
	- [x] T012 [P] Implement Intervention model in src/models/intervention.ts
	- [x] T013 [P] Implement Schedule model in src/models/schedule.ts
	- [x] T014 Implement PriceAdapter in src/lib/core/adapters/price-adapter.ts
	- [x] T015 Implement MeterAdapter in src/lib/core/adapters/meter-adapter.ts
	- [x] T016 Implement DeviceAdapter(s) in src/lib/core/adapters/device-adapter.ts
	- [x] T017 Implement Orchestration Engine in src/services/orchestration-engine.ts
	- [x] T018 Implement logging/observability in src/services/logging.ts
	- [x] T019 Implement error handling and fail-safe logic in src/services/error-handling.ts

## Phase 3.4: Homey Integration
	- [x] T020 Implement Homey app manifest (app.json) in src/homey/app.json
	- [x] T021 Implement orchestrator virtual device driver in src/homey/devices/orchestrator/driver.ts
	- [x] T022 Implement Flow cards (triggers, conditions, actions) in src/flows/
	- [x] T023 Implement UI dashboard and per-device settings in src/ui/

## Phase 3.5: Polish
	- [x] T024 [P] Write unit tests for all models and services in tests/unit/
	- [x] T025 [P] Write performance tests for orchestration in tests/unit/performance.test.ts
	- [x] T026 [P] Update documentation and adapter capability matrix in docs/
- [ ] T027 [P] Manual test: run quickstart scenarios and validate acceptance criteria

## Dependencies
- T001–T003 before all other tasks
- T004–T009 (tests) before T010–T023 (implementation)
- T010–T013 (models) before T014–T017 (services/adapters)
- T014–T019 before T020–T023 (Homey integration)
- T024–T027 (polish) after all implementation

## Parallel Example
```
# Launch T004–T009 together:
Task: "Write contract test for PriceAdapter in tests/contract/price-adapter.test.ts"
Task: "Write contract test for MeterAdapter in tests/contract/meter-adapter.test.ts"
Task: "Write contract test for DeviceAdapter in tests/contract/device-adapter.test.ts"
Task: "Write integration test for peak shaving scenario in tests/integration/peak-shaving.test.ts"
Task: "Write integration test for load shifting scenario in tests/integration/load-shifting.test.ts"
Task: "Write integration test for flex event handling in tests/integration/flex-event.test.ts"
```

## Validation Checklist
- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
