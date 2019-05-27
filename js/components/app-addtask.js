import RootElement from './app-rootelement.js';
import GenerateRandomTask from './generateRandomTask.js';
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
    // clear input
    this.querySelector('#taskname').value = '';
    // generate new random task
    this.taskGen.generate();
  }

  // random task generator for testing, saves having to make up a task and type it into the input box
  // generateNewTask() {
  //   this.querySelector('#taskname').value = '';

  //   // randomly select a task
  //   let item = this.tasks[Math.floor(Math.random() * this.tasks.length)];

  //   // remove item from random tasklist
  //   this.tasks = this.tasks.filter(task => {
  //     return task != item;
  //   })

  //   // act like a typewriter, because I was bored
  //   let counter = 0;
  //   let typewriter = setInterval(function () {
  //     document.getElementById("taskname").value += item[counter];
  //     counter++;
  //     if (counter > item.length - 1) {
  //       clearInterval(typewriter)
  //     }
  //   }, 50)
  // }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;