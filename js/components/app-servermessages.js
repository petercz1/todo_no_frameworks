import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

export default class appServerMessages extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getMeta'));
    this.pubsub.subscribe('NewTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ChangeTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ServerTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ServerTasks', 'getMeta', this.renderData);
  }

  renderData(metaData) {
    this.innerHTML = `
		<div class="server">
			<h3>Client/Server messages</h3>
			<p class="serverMessage">${metaData.message}</p>
		</div>
		`;
  }
}

customElements.define('app-servermessages', appServerMessages);