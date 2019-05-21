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
      <h2>Enter a task</h2>
      <input type="text" id="task" '></input>
      <button id="newPerson">add person</button>
    `;
    document.querySelector('#newPerson').addEventListener('click', this.addtask);
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