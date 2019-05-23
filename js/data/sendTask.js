// fetches videos from server, catches any network/server errors, returns json list of video details
import PubSub from './pubsub.js';

export default new class SendData {

  constructor() {
    this.pubsub = PubSub;
    this.sendData = this.sendData.bind(this);
    this.pubsub.subscribe('NewTask', 'getNewTask', null, this.sendData);
    this.pubsub.subscribe('ChangeTask', 'getChangeTask', null, this.sendData);
    this.pubsub.subscribe('DeleteTask', 'getDeleteTasks', null, this.sendData);
  }

  async sendData(tasks) {
    console.log('sending data');
    // build POST url
    let url = new URL(`${window.location.origin}/backend/addTask.php`);
    let init = {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(tasks)
    };

    // FETCH it and deal with any network errors
    let response = await fetch(url, init);

    // deal with the response
    if (!response.ok) {
      console.log(`${response.status}: ${response.statusText}`);
      throw new Error('HTTP error, status = ' + response.status);
    }
    let json = await response.json();
    console.log(json);
    // if (json.source == "server error") {
    //   console.log('blow up');
    // } else {
    //   this.pubsub.publish('ServerResult', json);
    // }
  }
}