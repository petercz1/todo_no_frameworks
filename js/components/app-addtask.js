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
    // build html
    this.innerHTML = `
    <input type="text" id="taskname" placeholder="your new task"></input>
    <button id="newTask">add task</button>
    `;
    // add click listener for adding a task
    document.querySelector('#newTask').addEventListener('click', this.addtask);
   
    // generate new random task - debugging purposes
    this.generateRandomTask.generate();
  }

  addtask() {
    // build task
    let task = {
      taskname: document.querySelector('#taskname').value,
      message: 'client added ' + document.querySelector('#taskname').value,
      clientId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      changeTask: false,
      deleteTask: false,
      checked: false,
      addedToServer: false,
      css: 'closed'
    };
    // now publish it to anyone who's interested
    this.pubsub.publish('AddTask', task);

    this.generateRandomTask.generate(); // generate new random task
  }
}

customElements.define('app-addtask', appAddTask);

