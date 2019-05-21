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
    this.innerHTML = `
    <input type="checkbox" id="${this.task.id}" />
    <label for="${this.task.id}" class="label">${this.task.name}</label>
    <button class="delete">delete ${this.task.name}</button></br>
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

    // generate and publish new message
    let txt = '';
    if (this.task.checked) {
      txt = `${this.task.name} is now selected &#128515;`;
    } else {
      txt = `${this.task.name} is now deselected &#128533;`;
    }
  }

  registerDelete() {
    this.pubsub.publish('Deletetask', this.task);
  }
}

export default appTask;

customElements.define('app-task', appTask);
