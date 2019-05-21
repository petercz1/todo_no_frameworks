import RootElement from './app-rootelement.js';

import PubSub from '../pubsub/pubsub.js';
import Task from './app-task.js/index.js';

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
    this.innerHTML = `
      <h2>Todo list</h2>
      <p> uncheck to deselect</p>
      <div id="tasks"></div>
    `;
    tasks.forEach(person => {
      this.querySelector('#tasks').append(new Person(person));
    });
  }
}

export default appTasks;

customElements.define('app-tasks', appTasks);