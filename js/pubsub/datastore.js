class DataStore {

  constructor() {
    // create datastores
    this.tasks = [];
  }

  // getRequest() and setRequest() are the primary getters/setters
  getRequest(subscriber) {
    return this[subscriber.request](subscriber.parameters);
  }

  // setRequest() works by appending 'set to the 'listener.request' string
  // and then use that as the function name.
  // I added 'listener.data' in case someone wants to extend the idea
  // by passing a variable eg id (not implemented here)
  setRequest(request) {
    // adds 'set' to request eg 'setMessage'
    let req = 'set' + request.newInfo;
    let res = this[req](request.data);
    return res;
  }

  // get data of various types
  getTasks() {
    return this.tasks
  }

  getCheckedTotal() {
    return (this.tasks.filter(task => (task.checked == true)).length);
  }
  getCount() {
    return this.tasks.length;
  }

  // create/change data
  setNewTask(data) {
    // find max id
    let max = Math.max(...this.tasks.map(obj => obj.id), 0);
    // increment it
    data.id = max + 1;
    // add it
    this.tasks.push(data);
    //}
  }
  setDeletetask(data) {
    // filter returns a copy of the array, which then replaces the original
    this.tasks = this.tasks.filter(task => {
      return task.id != data.id;
    })
  }
}

export default new DataStore();