import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

export default class appConsole extends RootElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData(this.pubsub.getData('getMeta', null));
		this.pubsub.subscribe('NewTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('ChangeTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('ServerMessage', 'getMeta', null, this.renderData);
  }

	// renders all data from 'getPeople()'
	renderData(data){
		this.innerHTML = `
		<div class="console">
			<h3>Console monitoring stuff</h3>
			<p>You have <span class="bold">${data.taskLength}</span> tasks, <span class="bold">${data.tasksChecked}</span> are completed</p>
			<p>(Server data messages: ${data.message.server})</p>
		</div>
		`;
	}
}

customElements.define('app-console', appConsole);
