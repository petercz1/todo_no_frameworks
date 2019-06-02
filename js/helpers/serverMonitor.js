import PubSub from '../data/pubsub.js';

// monitors when evilBoss adds pointless tasks
// uses server sent events
export default class ServerMonitor {

  constructor() {
    this.pubsub = PubSub;
    this.eventSource = new EventSource('../../backend/evilBoss.php');
    this.monitor = this.monitor.bind(this);
    this.evilBossAddedTask = this.evilBossAddedTask.bind(this);
  }
  
  monitor() {
    this.eventSource.addEventListener("evilBossAddedTask", this.evilBossAddedTask);
  }

  evilBossAddedTask(event) {
    let data = JSON.parse(event.data);
    if (event.data != "{}") {
      this.pubsub.publish('ServerTask', null);
    }
  }
}