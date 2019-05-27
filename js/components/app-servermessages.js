import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

export default class appServerMessages extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getMeta', null));
    this.pubsub.subscribe('ServerMessage', 'getMeta', null, this.renderData);
  }

  renderData(data) {
    this.innerHTML = `
		<div>
			<h3>Server</h3>
			<p>${data.message.server}</p>
		</div class="server closed">
		`;
  }
  // setTimeout needed because connectedCallback doesn't wait for child elements to render
  connectedCallback() {
    setTimeout(() => {
      this.querySelector('div').classList.replace('closed', 'open');
    }, 100);
  }
}

customElements.define('app-servermessages', appServerMessages);