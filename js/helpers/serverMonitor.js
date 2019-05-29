import PubSub from '../data/pubsub.js';

export default new class ServerMonitor {

  constructor() {
    this.pubsub = PubSub;
    this.eventSource = new EventSource('../../backend/evilBoss.php');
    this.monitor = this.monitor.bind(this);
    this.evilBossAddedTask = this.evilBossAddedTask.bind(this);
    this.blow_up = this.blow_up.bind(this);
  }

  monitor() {
    this.eventSource.addEventListener("evilBossAddedTask", this.evilBossAddedTask);
    this.eventSource.addEventListener("error", this.blow_up);
  }

  evilBossAddedTask(event) {
	let data = JSON.parse(event.data);
	console.log(data);
    if (event.data != "{}") {
    this.pubsub.publish('ServerMessage', data);
    this.pubsub.publish('NewTask', null); // HERE IS THE PROBLEM...
	  //this.pubsub.publish('NewServerInfo', data.evilTask);
    }
  }

  blow_up(err) {
    if (this.eventSource.CLOSED) {
     console.log("server closed connection");
    };
  }
}