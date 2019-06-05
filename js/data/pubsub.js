import DataStore from './datastore.js';

export default new class PubSub {
  constructor() {
    this.datastore = DataStore
    this.subscribers = [];
  }

  // this adds to the subscribers[] array everyone interested in some info being published
  // here's a subscription from <app-tasks>:
  // "eg this.pubsub.subscribe('AddTask', 'getTasks', this.renderData);"
  // 1) app-tasks is interested in any new tasks being published (newInfo - 'AddTask')
  // 2) if there is a new task, fire 'getTasks()' in the datastore (request - 'getTasks')
  // 3) fire the renderData() method in <app-tasks> component and supply the info from getTasks (callback - 'renderData')
  subscribe(newInfo, request, callback) {
    console.log(newInfo + ' wants ' + request);
    this.subscribers.push({
      newInfo,
      request,
      callback
    });
  }

  unsubscribe(callback) {
    // TODO implement if needed!
  }

  // when anyone publishes something it arrives here,
  // a string of newInfo eg 'AddTask' and an object of data to publish
  publish(newInfo, data) {
console.log('newInfo: ' + newInfo);
console.log(data);
    // publish the new/changed data
    // datastore converts this to a 'set' method and parameter eg setAddTask(data)
    this.datastore.setRequest({
      newInfo,
      data
    });

    // after publishing, alert all susbscribers to new/changed data.
    // first get all subscribers interested in this newInfo, then foreach of them
    // fire the callback method requested.
    this.subscribers.filter(subscriber => (subscriber.newInfo == newInfo)).forEach((subscriber) => {
      subscriber.callback(this.datastore.getRequest(subscriber));
    });
  }

  getData(request) {
    // this handles non-publish/subscribe requests for info such as getting totals 
    return this.datastore.getRequest({
      request
    });
  }
}