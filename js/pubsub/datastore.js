class DataStore {

  constructor() {
    // create datastores
    this.tasks = [];
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
    console.log(this.tasks);
    return this.tasks
  }

  getCheckedTotal() {
    return (this.tasks.filter(task => (task.checked == true)).length);
  }
  getTaskTotal() {
    return this.tasks.length;
  }

  setNewTask(data) {
    console.log(this.tasks);
    // simple id field: find max id and increment it
    let max = Math.max(...this.tasks.map(obj => obj.id), 0);
    data.id = max + 1;

    // add task to tasks
    this.tasks.push(data);
    //}
  }

  setChange
  setDeletetask(data) {
    // filter returns a copy of the array, which then replaces the original
    this.tasks = this.tasks.filter(task => {
      return task.id != data.id;
    })
  }
}

export default new DataStore();