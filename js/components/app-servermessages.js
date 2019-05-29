import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

export default class appServerMessages extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getMeta', null));
    this.pubsub.subscribe('NewTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('ChangeTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('ServerData', 'getMeta', null, this.renderData);
    this.pubsub.subscribe('ServerMessage', 'getMeta', null, this.renderData);
  }

  renderData(data) {
    console.log(data);
    this.innerHTML = `
		<div class="server">
			<h3>Server</h3>
			<p class="serverMessage">${data.message}</p>
		</div>
		`;
  }
}

customElements.define('app-servermessages', appServerMessages);