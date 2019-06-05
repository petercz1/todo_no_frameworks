// fetches videos from server, catches any network/server errors, returns json list of video details
import PubSub from './pubsub.js';

// async retrieval of tasks from tasks.json on server
export default class FetchTasks {

  constructor() {
    this.pubsub = PubSub;
    this.fetchData = this.fetchData.bind(this);
    this.pubsub.subscribe('AddTask', 'getTasks', this.fetchData);
    this.pubsub.subscribe('ChangeTask', 'getTasks', this.fetchData);
    this.pubsub.subscribe('DeleteTask', 'getTasks', this.fetchData);
    this.pubsub.subscribe('ServerTask', 'getTasks', this.fetchData);
    }

  async fetchData() {
    // build GET url
    let url = new URL(`${window.location.origin}/backend/sendTasks.php`);
   
    // set request as GET (default but making it clear)
    let init = {
      method: 'GET',
    };

    // FETCH it and deal with any network errors
    let response = await fetch(url, init);

    // deal with the response
    if (!response.ok) {
      console.log(`${response.status}: ${response.statusText}`);
      throw new Error('HTTP error, status = ' + response.status);
    }
    let json = await response.json();
    if (json.source == "server error") {
      this.pubsub.publish('ServerError', `{server error: ${response.status}, ${response.statusText}}`);
    } else {
      this.pubsub.publish('ServerTasks', json);
    }
  }
}