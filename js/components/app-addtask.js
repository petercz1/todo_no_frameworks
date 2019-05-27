import RootElement from '../helpers/app-rootelement.js';
import GenerateRandomTask from '../helpers/generateRandomTask.js';
import PubSub from '../data/pubsub.js';

class appAddTask extends RootElement {
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
    document.querySelector('#newTask').addEventListener('click', this.addtask);
   
    this.taskGen.generate(); // generate new random task
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

    this.taskGen.generate(); // generate new random task
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;