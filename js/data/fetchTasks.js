// fetches videos from server, catches any network/server errors, returns json list of video details
import PubSub from './pubsub.js';

export default new class FetchData {

  constructor() {
    this.pubsub = PubSub;
    this.fetchData = this.fetchData.bind(this);
    this.pubsub.subscribe('RequestServerData', 'getRequestServerData', null, this.fetchData);
  }

  async fetchData() {
    console.log('fetching data');
    // build GET url
    let url = new URL(`${window.location.origin}/api/getvideofilesinfo`);
    let options = {
      file_location_root: document.getElementById('file_location_root').value,
      delete_on_conversion: document.getElementById('delete_on_conversion').value
    }

    // add options as search params to end of url request
    Object.keys(options).forEach(key => url.searchParams.append(key, options[key]));
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
      console.log(json);
      this.pubsub.publish('Message', json)
    } else {
      this.pubsub.publish('LocalData', json);
    }
  }
}