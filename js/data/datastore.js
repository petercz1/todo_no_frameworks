class DataStore {

  constructor() {
    // create datastores
    this.data = [];
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
  getCheckedTotal() {
    return (this.tasks.filter(task => (task.checked == true)).length);
  }
  getTaskTotal() {
    return this.data.tasks.length;
  }

  setNewTask(data) {
    // simple id field: find max id and increment it
    let max = Math.max(...this.tasks.map(obj => obj.id), 0);
    data.id = max + 1;

    // add task to tasks
    this.data.tasks.push(data);
    //}
  }
  setChangeTask(data) {
    console.log(data);
  }
  setDeleteTask(data) {
    // filter returns a copy of the array, which then replaces the original
    this.data.tasks = this.data.tasks.filter(task => {
      return task.id != data.id;
    })
  }
}

export default new DataStore();