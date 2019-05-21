import RootElement from './app-rootelement.js';
import AppTask from './app-task.js';
import PubSub from '../pubsub/pubsub.js';

class appTasks extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getTasks',null));
    this.pubsub.subscribe('NewTask', 'getTasks', null, this.renderData);
    this.pubsub.subscribe('DeleteTask', 'getTasks', null, this.renderData);
  }

  // renders all people returned from 'getTasks()'
  renderData(tasks) {
    console.log(tasks);
    this.innerHTML = `
      <h2>Todo list</h2>
      <div id="tasks"></div>
    `;
    // append task elements
    tasks.forEach(task => {
      this.querySelector('#tasks').append(new AppTask(task));
    });
  }
}

export default appTasks;

customElements.define('app-tasks', appTasks);