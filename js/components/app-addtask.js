import RootElement from '../helpers/app-rootelement.js';
import GenerateRandomTask from '../helpers/generateRandomTask.js';
import PubSub from '../data/pubsub.js';

class appAddTask extends RootElement {
  constructor() {
    super();
    this.taskGen = GenerateRandomTask;
    this.pubsub = PubSub;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <input type="text" id="taskname" placeholder="your new task"></input>
    <button id="newTask">add task</button>
    `;
    document.querySelector('#newTask').addEventListener('click', this.addtask);
    // clear input
    this.querySelector('#taskname').value = '';
    // generate random new task
    this.taskGen.generate();
  }

  addtask() {
    let task = {
      taskname: document.querySelector('#taskname').value,
      changeTask: false,
      deleteTask: false,
      checked: false,
      css: 'closed'
    };
    this.pubsub.publish('NewTask', task);

    this.querySelector('#taskname').value = '';     // clear input
    this.taskGen.generate();
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;