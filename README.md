# Optimaser Peak & Price Orchestrator (Homey App)

A Homey app for orchestrating devices to optimize energy usage, perform peak shaving, load shifting, and respond to flex events. Built with TypeScript and fully tested.

## Features
- Peak shaving and load shifting orchestration
- Price and meter adapters
- Virtual device driver for orchestration
- Homey flows integration (triggers, conditions, actions)
- Logging, error handling, and observability
- Fully tested (unit, contract, integration)

## Project Structure
- `src/` — TypeScript source code
- `drivers/` — Homey device drivers
- `assets/` — App icon and assets
- `tests/` — All test suites
- `docs/` — Documentation and adapter matrix
- `specs/` — Project specs and plans

## Getting Started
1. Clone the repository:
   ```sh
   git clone https://github.com/decline27/new_optimaser.git
   cd new_optimaser
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the app:
   ```sh
   npm run build
   ```
4. Run tests:
   ```sh
   npm test
   ```
5. Deploy to Homey:
   ```sh
   homey app run
   ```

## Development
- Main entry: `app.js` (compiled from TypeScript)
- Driver: `drivers/orchestrator/driver.js`
- Manifest: `app.json`
- Icon: `assets/icon.svg` (black, no background)

## License
MIT

---
For more details, see the `specs/` and `docs/` folders.
