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
		this.pubsub.subscribe('ServerMessage', 'getMeta', null, this.renderData);
  }

	renderData(data){
		this.innerHTML = `
		<div class="console">
			<h3>Browser</h3>
			<p>You have <span class="bold">${data.taskLength}</span> tasks, <span class="bold">${data.tasksChecked}</span> are completed</p>
		</div>
		`;
	}
}

customElements.define('app-console', appConsole);