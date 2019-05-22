import RootElement from './app-rootelement.js';
import PubSub from '../data/pubsub.js';

class appTask extends RootElement {
  constructor(task) {
    super();
    this.pubsub = PubSub;
    this.task = task;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <div class="${this.task.css}">
      <label for="${this.task.id}" class="label">${this.task.taskname}</label>
      <input type="checkbox" id="${this.task.id}" />
      <span>&#128465;</span>
    </div>
    `;
    this.querySelector('input').checked = this.task.checked;
    this.querySelector('input').addEventListener('change', this.registerChange);
    this.querySelector('span').addEventListener('click', this.registerDelete);
  }

  // setTimeout needed because connectedCallback doesn't wait for child elements to render
  connectedCallback() {
    if (this.task.css) {
      setTimeout(() => {
        this.querySelector('div').classList.replace('closed','open');
      }, 100);
      this.task.displayedTask = true;
      this.pubsub.publish('DisplayedTask', this.task);
    }
  }

  registerChange() {
    // publish change to status of task
    this.task.checked = !this.task.checked;
    this.pubsub.publish('ChangeTask', this.task);
  }

  registerDelete() {
    setTimeout(() => {
      this.querySelector('div').classList.add('closed','open');
    }, 100);
    this.querySelector('div').classList.add('closed');
    this.task.deleted = true;
    this.pubsub.publish('DeleteTask', this.task);
  }
}

export default appTask;

customElements.define('app-task', appTask);