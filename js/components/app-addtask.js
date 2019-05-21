import RootElement from './app-rootelement.js';
import PubSub from '../pubsub/pubsub.js';

class appAddTask extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
      <input type="text" id="task" placeholder="add task"></input>
      <button id="newTask">add task</button>
    `;
    document.querySelector('#newTask').addEventListener('click', this.addtask);
  }

  addtask() {
    let task = {
      task: document.querySelector('#task').value,
      checked: true,
    };
    this.pubsub.publish('NewTask', task);
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;