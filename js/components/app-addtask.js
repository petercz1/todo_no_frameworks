import RootElement from './app-rootelement.js';
import PubSub from '../data/pubsub.js';

class appAddTask extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData();
  }

  renderData() {
	this.innerHTML = `
	<input type="text" id="taskname" placeholder="your new task" value="check for brain"></input>
	<button id="newTask">add task</button>
    `;
    document.querySelector('#newTask').addEventListener('click', this.addtask);
  }

  addtask() {
    let task = {
      taskname: document.querySelector('#taskname').value,
      checked: false,
    };
	this.pubsub.publish('NewTask', task);
	
	 // generate new random task
	 this.generateTask();
  }

  // random task generator for testing, saves having to type a value into the input box
  generateTask() {
	
	let item = tasks[Math.floor(Math.random() * tasks.length)];
	this.querySelector('#taskname').value = item;
	
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;