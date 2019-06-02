import RootElement from '../helpers/app-rootelement.js';
import GenerateRandomTask from '../helpers/generateRandomTask.js';
import PubSub from '../data/pubsub.js';

// ES6 webcomponent <app-addtask>
export default class appAddTask extends RootElement {
  constructor() {
    super();
    this.generateRandomTask = GenerateRandomTask;
    this.pubsub = PubSub;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <input type="text" id="taskname" placeholder="your new task"></input>
    <button id="newTask">add task</button>
    `;
    // add click listener for adding a task
    document.querySelector('#newTask').addEventListener('click', this.addtask);
   
    
    this.generateRandomTask.generate();
  }

  addtask() {
    let task = {
      taskname: document.querySelector('#taskname').value,
      message: 'client added ' + document.querySelector('#taskname').value,
      changeTask: false,
      deleteTask: false,
      checked: false,
      css: 'closed'
    };
    this.pubsub.publish('NewTask', task);

    this.generateRandomTask.generate(); // generate new random task
  }
}

customElements.define('app-addtask', appAddTask);

