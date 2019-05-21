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
	let tasks = ['watch GOT', 'check FB', 'wash dishes', 'refine plans for Death Star', 'invent killer app', 'practice sarcasm', 'make fun of hipsters', 'drink more coffee','google "pimp my noodles"',
				'complain more often', 'spike watercooler', 'write "idiot filter" for gmail', 'ignore todo list','beat personal best on snake'];
	let 
    this.querySelector('#taskname').value = tasks[Math.floor(Math.random() * tasks.length)];
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;