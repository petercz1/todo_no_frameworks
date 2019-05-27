import DataStore from './datastore.js';

class PubSub {
  constructor() {
    this.datastore = DataStore
    this.subscribers = [];
  }

  // this adds to an array everyone interested in some info being published
  // here's a subscription from <app-tasks>:
  // "this.pubsub.subscribe('NewTask', 'getTasks', null, this.renderData);"
  // app-tasks is interested in any new tasks being published (newInfo - 'NewTask')
  // if there is a new task, fire 'getTasks()' in the datastore (request - 'getTasks')
  // it could also send a parameter if implemented eg getTasks(6) (parameters - null)
  // finally fire the renderData() method in app-tasks and supply the info from getTasks (callback - 'renderData')
  subscribe(newInfo, request, parameters, callback) {
    this.subscribers.push({
      newInfo,
      request,
      parameters,
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
    // datastore converts this to eg setNewTask(data)
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

  getData(request, data) {
    // I decided to have the PubSub class act as the interface to
    // all transactions between modules and datastore, hence this handles 
    // non-publish/subscribe requests for info such as getting totals 
    // before publishing a new record eg 'getCheckedTotal()'
    // I added 'data' as part of the request if a parameter needed to be passed in
    // such as specific id (not implemented here)
    return this.datastore.getRequest({
      request,
      data
    });
  }
}

export default new PubSub();