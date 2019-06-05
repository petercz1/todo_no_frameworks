import RootElement from '../helpers/app-rootelement.js';
import AppTask from './app-task.js';
import PubSub from '../data/pubsub.js';

// ES6 webcomponent <app-tasks>
// container for multiple <app-task> elements
export default class appTasks extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getTasks', null));
    // subscribe to any of these events, get tasks, pass tasks to renderData
    this.pubsub.subscribe('AddTask', 'getTasks', this.renderData);
    this.pubsub.subscribe('DeleteTask', 'getTasks', this.renderData);
    this.pubsub.subscribe('ServerTasks', 'getTasks', this.renderData);
  }

  renderData(clientTasks) {
    this.innerHTML = '';
    // filter for all tasks not deleted and then loop through with a foreach
    clientTasks.filter(task => task.delete != true).forEach(task => {
      this.append(new AppTask(task));
    });
  }
}

customElements.define('app-tasks', appTasks);