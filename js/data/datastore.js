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

  // fired when serverdata is returned
  setServerData(tasks) {
    this.tasks = tasks;
    this.updateMeta();
  }

  getMeta() {
    return this.meta;
  }
  updateMeta() {
    this.meta.tasksChecked = this.tasks.filter(task => (task.checked == true)).length;
    this.meta.taskLength = this.tasks.filter(task => task.deleteTask != true).length;
  }

  setNewTask(data) {
    console.log('setNewTask');
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
  getTasks() {
    console.log(this.tasks);
    return this.tasks.filter(task => task.deleteTask != true);
  }

  setChangeTask(data) {
    console.log('setChangeTask()');
    this.updateMeta();
  }
  getChangeTask() {
    console.log('getChangeTask()');
    // Object.assign to pass copy
    let changedTask = Object.assign({},this.tasks.filter(task => task.changeTask == true));
    this.tasks.find(task => task.changeTask == true).changeTask = false;
    this.updateMeta();
    return changedTask;
  }

  setDeleteTask(data) {
    console.log('setDeleteTask()');
    console.log(data);
    this.updateMeta();
  }
  getDeleteTask() {
    console.log('getDeleteTask()');
    // filter returns a copy of the array, which then replaces the original
    let deletedTask = this.tasks.filter(task => task.deleteTask == true);
    this.tasks = this.tasks.filter(task => task.deleteTask != true);
    this.updateMeta();
    return deletedTask;
  }

    // handles returning ServerMessage
    setServerData(data){
      console.log(data);
      this.meta.message = data;
    }
  
  // handles returning ServerData
  setServerData(data){
    console.log(data);
    this.meta.message = data;
  }
  // clears rolldown css effect after task is added to list and displayed
  setDisplayedTask(data) {
    // clear css field from all tasks
    this.tasks.forEach(task => {
      delete task.css;
    });
  }
}

export default new DataStore();