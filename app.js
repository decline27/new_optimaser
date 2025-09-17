const Homey = require('homey');

class OptimaserApp extends Homey.App {
  onInit() {
    this.log('Optimaser Peak & Price Orchestrator app is running');
    // Register drivers, flows, and services as per spec
  }
}

module.exports = OptimaserApp;
