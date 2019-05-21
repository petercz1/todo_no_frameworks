import RootElement from './app-rootelement.js';

import PubSub from '../pubsub/pubsub.js';

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
    console.log(this.task);
    this.innerHTML = `
    <input type="checkbox" id="${this.task.id}" />
    <label for="${this.task.id}" class="label">${this.task.taskname}</label>
    <button >&#8999;</button></br>
    `;
    if (this.task.checked) {
      this.querySelector('input').setAttribute('checked', true);
    }
    this.querySelector('input').addEventListener('change', this.registerChange);
    this.querySelector('button').addEventListener('click', this.registerDelete);
  }

  registerChange() {
    // publish change to status of task
    this.task.checked = !this.task.checked;
    this.pubsub.publish('Changetask', this.task);
  }

  registerDelete() {
    this.pubsub.publish('Deletetask', this.task);
  }
}

export default appTask;

customElements.define('app-task', appTask);
