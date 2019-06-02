import DataStore from './datastore.js';

export default new class PubSub {
  constructor() {
    this.datastore = DataStore
    this.subscribers = [];
  }

  // this adds to an array everyone interested in some info being published
  // here's a subscription from <app-tasks>:
  // "this.pubsub.subscribe('NewTask', 'getTasks', this.renderData);"
  // app-tasks is interested in any new tasks being published (newInfo - 'NewTask')
  // if there is a new task, fire 'getTasks()' in the datastore (request - 'getTasks')
  // finally fire the renderData() method in app-tasks and supply the info from getTasks (callback - 'renderData')
  subscribe(newInfo, request, callback) {
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
  // a string of newInfo eg 'NewTask' and an object of data to publish
  publish(newInfo, data) {

    // publish the new/changed data
    // datastore converts this to a 'set' method and parameter eg setNewTask(data)
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