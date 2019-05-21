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
      <input type="text" id="task" placeholder="your new task" value=""></input>
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
	
	 // generate new random task
	 this.generateName();
  }

  // random name generator for testing, saves having to type a value into the input box
  generateName() {
    let names = ['bill', 'bob', 'brenda', 'bert', 'barry', 'brian', 'boomer', 'butch', 'beau', 'benny', 'bessie', 'bonza', 'bunty', 'boris', 'broderick', 'byron'];
    this.querySelector('#name').value = names[Math.floor(Math.random() * names.length)];
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;