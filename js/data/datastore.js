class DataStore {

  constructor() {
    // create datastores
    this.clientTasks = [];
    // could have created this meta on the fly from clientTasks array?
    this.meta = {
      tasksChecked: 0,
      taskLength: 0,
      message: 'server is quiet at the moment...'
    };
  }

  // getRequest() and setRequest() are the primary getters/setters
  getRequest(subscriber) {
    return this[subscriber.request]();
  }

  setRequest(request) {
    let res = this[request.newInfo](request.data);
    return res;
  }

  // internal function for datastore functions to use
  updateMeta() {
    this.meta.tasksChecked = this.clientTasks.filter(task => (task.checked == true)).length;
    this.meta.taskLength = this.clientTasks.filter(task => task.deleteTask != true).length;
  }

  // <------------------ all datastore SUBSCRIBERS get info here --------------------->

  getMeta() {
    return this.meta;
  }

  getTasks() {
    return this.clientTasks.filter(clientTask => clientTask.deleteTask != true);
  }
  getAddTask() {
    // get task if not added to server db
    return this.clientTasks.filter(clientTask => !clientTask.addedToServer)[0];
  }
  getChangeTask() {
    // use the JSON.parse/stringify hack to make a copy of task array
    let changedTask = JSON.parse(JSON.stringify(this.clientTasks.filter(clientTask => clientTask.changeTask == true)));
    this.updateMeta();
    return changedTask[0];
  }
  getDeleteTask() {
    // filter returns a copy of the array, which then replaces the original
    let deletedTask = JSON.parse(JSON.stringify(this.clientTasks.filter(clientTask => clientTask.deleteTask == true)));
    // replace clientTasks with undeleted ie remaining tasks
    this.clientTasks = this.clientTasks.filter(clientTask => clientTask.deleteTask != true);
    this.updateMeta();
    return deletedTask[0];
  }

  // <------------------ all datastore PUBLISHERS publish info here --------------------->

  AddTask(task) {
    // clear css field from all tasks
    this.clientTasks.forEach(clientTask => {
      delete clientTask.css;
    });
    // add task to tasks
    this.clientTasks.unshift(task);
    // update message
    this.meta.message = task.message;
    this.updateMeta();
  }

  ChangeTask(task) {
    this.meta.message = 'client changed task: ' + task.taskname;
    this.updateMeta();
  }

  DeleteTask(task) {
    this.meta.message = 'client deleted: ' + task.taskname;
    this.updateMeta();
  }

  // handles single task from server
  ServerTask(serverTask) {
    if (serverTask) {
      if (serverTask.error) return this.meta.message = 'Server blow-up...'
      this.meta.message = serverTask.message;
      // check task coming from server isn't already in tasks on client
      if (this.clientTasks.filter(clientTask => clientTask.clientId == serverTask.clientId).length == 0) {
        this.clientTasks.unshift(serverTask);
      }
    } else {
      this.meta.message = "No new tasks on server";
    }
    this.updateMeta();
  }

  // handles all tasks from server
  ServerTasks(serverTasks) {
    this.clientTasks = serverTasks;
    this.updateMeta();
  }

  ServerError(error) {
    this.meta.message = error.error;
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