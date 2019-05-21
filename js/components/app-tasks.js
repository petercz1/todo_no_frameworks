import RootElement from './app-rootelement.js';
import AppTask from './app-task.js';
import PubSub from '../data/pubsub.js';

class appTasks extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getTasks',null));
    this.pubsub.subscribe('NewTask', 'getTasks', null, this.renderData);
    this.pubsub.subscribe('DeleteTask', 'getTasks', null, this.renderData);
    this.apptask = new AppTask;
  }

  // renders all people returned from 'getTasks()'
  renderData(tasks) {
    this.setAttribute('id', 'tasks');
    // this.innerHTML = `
    //   <div id="tasks"></div>
    // `;
    // append task elements
    tasks.forEach(task => {
      // this.querySelector('#tasks').append(new AppTask(task));
      singleTask=new AppTask(task);
      this.append(singleTask);
    });
  }
}

export default appTasks;

customElements.define('app-tasks', appTasks);