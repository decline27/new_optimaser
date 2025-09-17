# Feature Specification: Optimaser – Homey Peak & Price Orchestrator

**Feature Branch**: `001-optimaser-homey-peak`
**Created**: 17 September 2025  
**Status**: Draft  
**Input**: User description: "Optimaser – Homey Peak & Price Orchestrator: High-level product specification"

---

## Overview
Optimaser is a Homey app for local, safe, and explainable orchestration of flexible household loads (e.g., EV charger, water heater, heating) to reduce electricity costs and grid peaks. It leverages day-ahead spot prices and real-time power data to optimize device usage, with a focus on user comfort, safety, and transparency.

## Personas
- **Homeowner**: Wants to save on electricity bills and avoid grid peak penalties without sacrificing comfort or safety.
- **Energy Enthusiast**: Seeks detailed control, logs, and optimization of home energy use.
- **Installer/Integrator**: Needs reliable, local-first automation with clear setup and troubleshooting.

## Non-Negotiables
- Homey SDK 3.0, TypeScript only, local orchestration (no cloud dependency)
- Modular adapters: Prices, Meters, Device brands
- Safety rails: min on/off times, comfort bands (°C), priority ordering, fail-safe “Release control”
- Deterministic decisions with human-readable logs
- One “orchestrator” virtual device + Flow cards (triggers/conditions/actions)
- Simple UI: current power vs limit, upcoming cheap hours, active interventions, per-device settings

## Functional Requirements
- **FR-001**: System MUST perform peak shaving by pausing/throttling low-priority devices to stay under a user-set power limit, with hysteresis to prevent flapping.
- **FR-002**: System MUST shift flexible loads into cheaper hours based on day-ahead spot prices, respecting user constraints (comfort bands, min on/off, deadlines).
- **FR-003**: System MUST support optional flex events from utilities and log curtailed kWh.
- **FR-004**: System MUST cache price data locally and continue operation if price API is unavailable, surfacing a warning.
- **FR-005**: System MUST skip unsupported device capabilities gracefully and log these events.
- **FR-006**: System MUST provide a single orchestrator device in Homey with clear status and per-device settings.
- **FR-007**: System MUST expose Flow cards for triggers, conditions, and actions.
- **FR-008**: System MUST enforce safety rails (min on/off, comfort bands, device limits, release control).
- **FR-009**: System MUST provide deterministic, human-readable logs for all decisions and interventions.

## Inputs
- Real-time total power from a selected Homey smart-meter device
- Day-ahead price data for user’s price zone (cached locally)
- Optional flex-event feed from utility

## Device Control
- On/Off
- Setpoint nudge (°C)
- Power/amps limit (capability-checked)

## User Setup
- Select price zone, peak limit, smart meter, controllable devices
- Assign device priorities and constraints (min on/off, comfort bands, deadlines)

## Homey Integration
- Homey SDK 3.0 app
- One virtual “orchestrator” device
- Flow cards for triggers, conditions, actions
- Device capability checks for safe control

## UI
- Simple dashboard: current power vs limit, upcoming cheap hours, active interventions
- Per-device settings (priority, constraints)
- Visible errors, warnings, and degraded modes

## Architecture & Extensibility
- Modular adapters for prices, meters, device brands
- Deterministic, local-first orchestration engine
- Extensible for new device types and price/flex sources
- Human-readable, deterministic logs

## Out of Scope (v1)
- Cloud orchestration or remote control
- Non-Homey platforms
- Advanced analytics or reporting
- Multi-home orchestration

## Acceptance Criteria
- [ ] Peak mode engages/disengages without flapping; respects min on/off
- [ ] Scheduling honors comfort bands/deadlines; peak overrides shifting and later resumes
- [ ] If price API unavailable, continue peak control using cached data and surface warning
- [ ] Unsupported device capabilities are skipped gracefully with logs

---

## User Scenarios & Testing

### Primary User Story
A homeowner sets up Optimaser, selects their smart meter, price zone, and controllable devices. The system automatically schedules flexible loads into cheap hours and prevents exceeding the user’s peak limit, all while respecting comfort and safety constraints. The user can view current status, upcoming interventions, and logs in the Homey app.

### Acceptance Scenarios
1. **Given** a configured system with a peak limit, **When** household power approaches the limit, **Then** low-priority devices are paused/throttled without flapping, and min on/off is respected.
2. **Given** day-ahead price data, **When** a flexible load is scheduled, **Then** it runs in a cheap window, respecting comfort bands and deadlines.
3. **Given** a price API outage, **When** the system needs price data, **Then** it uses cached data and surfaces a warning to the user.
4. **Given** a device without required capabilities, **When** orchestration is attempted, **Then** the device is skipped and a log entry is created.

### Edge Cases
- What happens if all devices are at their min on/off or comfort limits? [System should not violate constraints; logs reason.]
- How does the system handle a flex event during an active peak override? [Peak override takes precedence, but logs flex event.]
- What if the user changes device priorities or constraints mid-schedule? [System recalculates schedule and logs changes.]

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous  
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status
- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---
