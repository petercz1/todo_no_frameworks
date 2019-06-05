import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

// ES6 webcomponent <app-task>
export default class appTask extends RootElement {
  constructor(task) {
    super();
    this.pubsub = PubSub;
    this.task = task;
    this.renderData();
  }

  renderData() {
    // build html
    this.innerHTML = `
    <div class="${this.task.css}">
      <label for="${this.task.id}" class="label">${this.task.taskname}</label>
      <input type="checkbox" id="${this.task.id}" />
      <span>&#128465;</span>
    </div>
    `;
    // set html checkbox to task.checked value
    this.querySelector('input').checked = this.task.checked;
    // add css .checked if checked
    if (this.task.checked) {
      this.querySelector('label').classList.add('checked');
    }

    // wire up event listeners
    this.querySelector('input').addEventListener('change', this.registerChange);
    this.querySelector('span').addEventListener('click', this.registerDelete);
  }

  // run after webcomponent is rendered
  connectedCallback() {
    if (this.task.css) {
      // setTimeout needed because connectedCallback doesn't wait for child elements to render
      setTimeout(() => {
        // css to do roll-down effect
        this.querySelector('div').classList.replace('closed', 'open');
      }, 100);
      // tells pubsub to clear rolldown css effect after task is added
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
    // publish delete if task is deleted
    this.task.checked = false;
    this.task.deleteTask = true;
    this.pubsub.publish('DeleteTask', this.task);
    this.renderData();
  }
}

customElements.define('app-task', appTask);