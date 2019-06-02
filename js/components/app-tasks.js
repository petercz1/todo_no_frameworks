import RootElement from '../helpers/app-rootelement.js';
import AppTask from './app-task.js';
import PubSub from '../data/pubsub.js';

// ES6 webcomponent <app-tasks>
// container for multiple <app-task>
export default class appTasks extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getTasks',null));
    this.pubsub.subscribe('NewTask', 'getTasks', this.renderData);
    this.pubsub.subscribe('DeleteTask', 'getTasks', this.renderData);
    this.pubsub.subscribe('ServerTasks', 'getTasks', this.renderData);
  }

  renderData(clientTasks) {
    this.innerHTML = '';
    clientTasks.filter(task => task.delete != true).forEach(task => {
      this.append(new AppTask(task));
    });
  }
}

customElements.define('app-tasks', appTasks);