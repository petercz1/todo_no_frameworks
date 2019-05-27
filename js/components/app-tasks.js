import RootElement from '../helpers/app-rootelement.js';
import AppTask from './app-task.js';
import PubSub from '../data/pubsub.js';

export default class appTasks extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getTasks',null));
    this.pubsub.subscribe('NewTask', 'getTasks', null, this.renderData);
    this.pubsub.subscribe('DeleteTask', 'getTasks', null, this.renderData);
    this.pubsub.subscribe('ServerData', 'getTasks', null, this.renderData);
  }

  // renders all people returned from 'getTasks()'
  renderData(tasks) {
    this.innerHTML = '';
    tasks.filter(task => task.delete != true).forEach(task => {
      this.append(new AppTask(task));
    });
  }
}

export default appTasks;

customElements.define('app-tasks', appTasks);