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
    <input type="text" id="taskname" placeholder="your new task"></input>
    <button id="newTask">add task</button>
    `;
    document.querySelector('#newTask').addEventListener('click', this.addtask);
    // generate random new task
    this.generateNewTask();
  }

  addtask() {
    let task = {
      taskname: document.querySelector('#taskname').value,
      checked: false,
      css: 'closed'
    };
    // generate new random task
    this.pubsub.publish('NewTask', task);
    this.generateNewTask();
  }

  // random task generator for testing, saves having to make up a task and type it into the input box
  generateNewTask() {
    this.querySelector('#taskname').value = '';
    // list of tasks
    let tasks = ['watch GOT', 'check FB', 'wash dishes', 'refine plans for Death Star', 'invent killer app', 'practice sarcasm', 'make fun of hipsters', 'drink more coffee', 'google "pimp my noodles"', 'complain more often', 'spike watercooler', 'write "idiot filter" for gmail', 'ignore todo list', 'beat personal best on snake'];
    // randomly select a task
    let item = tasks[Math.floor(Math.random() * tasks.length)];
    let counter = 0;
    let timer = setInterval(function () {
      document.getElementById("taskname").value += item[counter];
      counter++;
      if (counter > item.length - 1) {
        clearInterval(timer)
      }
    }, 50)
    //this.querySelector('#taskname').value = item;

    // remove item from random tasklist
    tasks = tasks.filter(task => {
      return task != item
    })
  }
}

customElements.define('app-addtask', appAddTask);

export default appAddTask;