class DataStore {

  constructor() {
    // create datastores
    this.Tasks = [];
  }

  // getRequest() and setRequest() are the primary getters/setters
  // they work by appending 'get' or 'set to the 'listener.request' string
  // and then use that as the function name.
  // I added 'listener.data' in case someone wants to extend the idea
  // by passing a variable eg id (not implemented here)
  getRequest(subscriber) {
    console.log(this.tasks);
    return this[subscriber.request](subscriber.parameters);
  }

  setRequest(request) {
    // adds 'set' to request eg 'setMessage'
    let req = 'set' + request.newInfo;
    let res = this[req](request.data);
    return res;
  }

  // get data of various types
  getTasks() {
    return this.Tasks
  }

  getChosenTasks() {
    return (this.Tasks.filter(task => (task.checked == true)));
  }

  getCheckedTotal() {
    return (this.Tasks.filter(task => (task.checked == true)).length);
  }
  getCount() {
    return this.Tasks.length;
  }

  // get and set messages
  getMessage() {
    return this.message;
  }
  setMessage(data) {
    this.message = data;
  }

  // create/change data

  setNewTask(data) {
    // find max id
    let max = Math.max(...this.Tasks.map(obj => obj.id), 0);
    // increment it
    data.id = max + 1;
    // add it
    this.Tasks.push(data);
    //}
  }
  setChangetask(data) {
    this.getTasks().filter(task => (task.id == data.id)).checked = data.checked;
  }
  setDeletetask(data) {
    // filter returns a copy of the array, which then replaces the original
    this.Tasks = this.Tasks.filter(task => {
      return task.id != data.id;
    })
  }
}

export default new DataStore();