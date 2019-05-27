// fetches videos from server, catches any network/server errors, returns json list of video details
import PubSub from './pubsub.js';

export default new class FetchTasks {

  constructor() {
    this.pubsub = PubSub;
    this.fetchData = this.fetchData.bind(this);
    //this.pubsub.subscribe('RequestServerData', 'getRequestServerData', null, this.fetchData);
  }

  async fetchData() {
    console.log('fetching data');
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
    console.log(json);
    if (json.source == "server error") {
      console.log(json);
    } else {
      this.pubsub.publish('AppIInit', json);
    }
  }
}