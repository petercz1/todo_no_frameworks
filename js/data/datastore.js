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

  // fired when serverdata 

  getTasks() {
    return this.tasks.filter(task => task.deleteTask != true);
  }
  getMeta() {
    return this.meta;
  }
  updateMeta() {
    this.meta.tasksChecked = this.tasks.filter(task => (task.checked == true && task.Task != true)).length;
    this.meta.taskLength = this.tasks.filter(task => task.deleteTask != true).length;
  }

  setNewTask(data) {
    // clear css field from all tasks
    this.tasks.forEach(task => {
      delete task.css;
    });
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
    console.log('getting changed task');
    console.log(this.tasks.filter(task => task.changeTask == true));
    return this.tasks.filter(task => task.changeTask == true);
  }

  // got to here - set delete task, filter?
  setDeleteTask() {
    this.updateMeta();
    console.log('inside datastore...');
    console.log(this.tasks);
  }
  getDeleteTask() {
    // filter returns a copy of the array, which then replaces the original
    let deleted = this.tasks.filter(task => task.deleteTask == true);
    this.tasks = this.tasks.filter(task => task.deleteTask != true);
    this.updateMeta();
    return deleted;
  }

  // clears rolldown css effect after task is added to list
  setDisplayedTask(data) {
    // clear css field from all tasks
    this.tasks.forEach(task => {
      delete task.css;
    });
  }
}

export default new DataStore();