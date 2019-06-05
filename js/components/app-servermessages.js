import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

// ES6 webcomponent <app-servermessages>
export default class appServerMessages extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getMeta'));

    // subscribe to any of these events, get metadata, pass data to renderData
    this.pubsub.subscribe('AddTask', 'getMeta', this.renderData);
    this.pubsub.subscribe('ChangeTask', 'getMeta', this.renderData);
    this.pubsub.subscribe('DeleteTask', 'getMeta', this.renderData);
    this.pubsub.subscribe('ServerTask', 'getMeta', this.renderData);
    this.pubsub.subscribe('ServerError', 'getMeta', this.renderData);
  }

  renderData(metaData) {
    console.log(metaData);
    // build html
    this.innerHTML = `
		<div class="server">
			<h3>Client/Server messages</h3>
			<p class="serverMessage">${metaData.message}</p>
		</div>
		`;
  }
}

customElements.define('app-servermessages', appServerMessages);