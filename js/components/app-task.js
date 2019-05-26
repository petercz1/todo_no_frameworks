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
    if(this.task.checked){
      this.querySelector('label').classList.add('checked');
    }
    this.querySelector('input').addEventListener('change', this.registerChange);
    this.querySelector('span').addEventListener('click', this.registerDelete);
  }

  // setTimeout needed because connectedCallback doesn't wait for child elements to render
  connectedCallback() {
    if (this.task.css) {
      setTimeout(() => {
        this.querySelector('div').classList.replace('closed', 'open');
      }, 100);
      
      this.pubsub.publish('DisplayedTask', this.task);
    }
  }

  registerChange() {
    // publish change if task is checked
    this.task.checked = !this.task.checked;
    this.task.changeTask = true;
    this.pubsub.publish('ChangeTask', this.task);
    this.renderData();
  }

  registerDelete() {
    this.task.deleteTask = true;
    this.pubsub.publish('DeleteTask', this.task);
    this.renderData();
  }
}

export default appTask;

customElements.define('app-task', appTask);