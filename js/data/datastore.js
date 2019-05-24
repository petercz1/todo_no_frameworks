class DataStore {

  constructor() {
    // create datastores
    this.tasks = [];
    this.meta = {
      tasksChecked: 0,
      taskLength: 0
    };
  }

  // getRequest() and setRequest() are the primary getters/setters
  getRequest(subscriber) {
    return this[subscriber.request](subscriber.parameters);
  }

  // setRequest() works by appending 'set to the 'request.newInfo' string
  // and then uses that as the function name
  // eg 'NewTask' becomes 'setNewTask'
  // I added 'request.data' in case someone wants to extend the idea
  // by passing a variable eg id (not implemented here)
  setRequest(request) {
    let req = 'set' + request.newInfo;
    let res = this[req](request.data);
    return res;
  }

  getTasks() {
    return this.tasks
  }
  getMeta() {
    return this.meta;
  }
  updateMeta() {
    this.meta.tasksChecked = this.tasks.filter(task => (task.checked == true)).length;
    this.meta.taskLength = this.tasks.length;
    console.log(this.tasks);
  }

  setNewTask(data) {
    // clear css field from all tasks
    this.tasks.forEach(task => {
      delete task.css;
    });
    data.css = 'closed';
    // simple id field: find max id and increment it
    let max = Math.max(...this.tasks.map(obj => obj.id), 0);
    data.id = max + 1;

    // add task to tasks
    this.tasks.unshift(data);
    this.updateMeta();
  }
  getNewTask() {
    return this.tasks.reduce((prev, current) => (prev.id > current.id) ? prev : current);
  }

  setChangeTask(data) {
    this.updateMeta();
  }
  getChangeTask() {
    // stubbed out - handled asynchronously in sendData()
    return this.tasks.filter(task => task.status == 'update');
  }

  setDeleteTask(data) {
    // console.log(this.tasks);
    // let taskIndex = this.tasks.findIndex(task => task.id == data.id);
    // this.tasks[taskIndex].status == 'delete';
    // console.log(this.tasks);
    this.updateMeta();
  }
  getDeleteTask() {
    // filter returns a copy of the array, which then replaces the original
    r
  }

  setDisplayedTask(data) {
    // clear css field from all tasks
    this.tasks.forEach(task => {
      delete task.css;
    });
  }
}

export default new DataStore();