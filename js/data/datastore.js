class DataStore {

  constructor() {
    // create datastores
    this.clientTasks = [];
    this.meta = {
      tasksChecked: 0,
      taskLength: 0,
      message: 'server is quiet at the moment...'
    };
  }

  // getRequest() and setRequest() are the primary getters/setters
  getRequest(subscriber) {
    return this[subscriber.request](subscriber.parameters);
  }

  setRequest(request) {
    let res = this[request.newInfo](request.data);
    return res;
  }

  getMeta() {
    return this.meta;
  }
  updateMeta() {
    this.meta.tasksChecked = this.clientTasks.filter(task => (task.checked == true)).length;
    this.meta.taskLength = this.clientTasks.filter(task => task.deleteTask != true).length;

  }

  NewTask(task) {
    // clear css field from all tasks
    this.clientTasks.forEach(clientTask => {
      delete clientTask.css;
    });
    // simple id field: find max id and increment it
    let max = Math.max(...this.clientTasks.map(obj => obj.id), 0);
    task.id = max + 1;
    // add task to tasks
    this.clientTasks.unshift(task);
    // update message
    this.meta.message = task.message;
    this.updateMeta();
  }
  getNewTask() {
    return this.clientTasks.reduce((prev, current) => (prev.id > current.id) ? prev : current);
  }
  getTasks() {
    return this.clientTasks.filter(clientTask => clientTask.deleteTask != true);
  }

  ChangeTask(task) {
    this.meta.message = 'client changed task: ' + task.taskname;
    this.updateMeta();
  }
  getChangeTask() {
    // use the JSON.parse/stringify hack to make a copy of task array
    let changedTask = JSON.parse(JSON.stringify(this.clientTasks.filter(clientTask => clientTask.changeTask == true)));
    this.updateMeta();
    return changedTask[0];
  }

  DeleteTask(task) {
    this.meta.message = 'client deleted: ' + task.taskname;
    this.updateMeta();
  }
  getDeleteTask() {
    // filter returns a copy of the array, which then replaces the original
    let deletedTask = this.clientTasks.filter(clientTask => clientTask.deleteTask == true);
    this.clientTasks = this.clientTasks.filter(clientTask => clientTask.deleteTask != true);
    this.updateMeta();

    return deletedTask[0];
  }

  // handles single task from server
  ServerTask(serverTask) {
    if (serverTask) {
      this.meta.message = serverTask.message;
      this.clientTasks.unshift(serverTask);
    }else{
      this.meta.message = "No new tasks on server";
    }
    this.updateMeta();
  }

  // handles all tasks from server
  ServerTasks(serverTasks){
    this.clientTasks = serverTasks;
    this.updateMeta();
  }

  // clears rolldown css effect after task is added to list and displayed
  DisplayedTask(data) {
    // clear css field from all tasks
    this.clientTasks.forEach(clientTask => {
      delete clientTask.css;
    });
  }
}

export default new DataStore();