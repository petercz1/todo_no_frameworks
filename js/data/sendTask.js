// fetches videos from server, catches any network/server errors, returns json list of video details
import PubSub from './pubsub.js';

// async sending of new/changed/deleted task to server
export default new class SendTask {

  constructor() {
    this.pubsub = PubSub;
    this.sendData = this.sendData.bind(this);
    // listen for any of these
    this.pubsub.subscribe('AddTask', 'getAddTask', this.sendData);
    this.pubsub.subscribe('ChangeTask', 'getChangeTask', this.sendData);
    this.pubsub.subscribe('DeleteTask', 'getDeleteTask', this.sendData);
  }

  async sendData(task) {
    // build POST url
    let url = new URL(`${window.location.origin}/backend/receiveTask.php`);
    let init = {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(task)
    };

    // FETCH it and deal with any network errors
    let response = await fetch(url, init);

    // deal with the response
    if (!response.ok) {
      console.log(`${response.status}: ${response.statusText}`);
      this.pubsub.publish('ServerError', `{server error: ${response.status}, ${response.statusText}}`);
    }
    let json = await response.json();
    if (json.source == "server error") {
      console.log('blow up');
    }
    this.pubsub.publish('ServerTask', json);
  }
}