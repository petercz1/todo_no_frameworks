// fetches videos from server, catches any network/server errors, returns json list of video details
import PubSub from './pubsub.js';

export default new class SendData {

  constructor() {
    this.pubsub = PubSub;
    this.sendData = this.sendData.bind(this);
    this.pubsub.subscribe('SendLocalData', 'getLocalData', null, this.sendData);
  }

  sendData(files) {
    console.log('sending data');
    // build POST url
    let url = new URL(`${window.location.origin}/api/processvideofilesinfo`);
    let data = {};
    // filter for process_video == checked and then extract just the path name
    data = files.filter(data => data.process_video == true).map(data => {
      return {
        'filepath': data.filepath,
        'extension': data.extension,
        'mp41': data.mp41,
        'basename': data.basename,
        'dirname': data.dirname,
        'filename': data.filename,
        'videoFormat': data.videoFormat.toLowerCase(),
        'audioFormat': data.audioFormat.toLowerCase(),
        'delete_on_conversion': document.getElementById('delete_on_conversion').checked
      };
    });

    data.forEach(async file => {
      let init = {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(file)
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
      } else {
        this.pubsub.publish('ServerResult', json);
      }
    });
  }
}