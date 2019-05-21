import RootElement from './app-rootelement.js';

import PubSub from '../data/pubsub.js';

class appTask extends RootElement {
  constructor(task) {
    super();
    this.pubsub = PubSub;
    this.task = task;
    this.registerChange = this.registerChange.bind(this);
    this.registerDelete = this.registerDelete.bind(this);
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <input type="checkbox" id="${this.task.id}" />
    <label for="${this.task.id}" class="label">${this.task.taskname}</label>
    <button class="delete">&#128465;</button></br>
    `;
    this.querySelector('input').addEventListener('change', this.registerChange);
    this.querySelector('button').addEventListener('click', this.registerDelete);
  }

  registerChange() {
    // publish change to status of task
    this.task.checked = !this.task.checked;
    this.pubsub.publish('ChangeTask', this.task);
  }

  registerDelete() {
    this.pubsub.publish('DeleteTask', this.task);
  }
}

export default appTask;

customElements.define('app-task', appTask);
