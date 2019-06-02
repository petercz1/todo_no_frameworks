import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

export default class appConsole extends RootElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData(this.pubsub.getData('getMeta', null));
		this.pubsub.subscribe('NewTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ChangeTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ServerTasks', 'getMeta', this.renderData);
  }

	renderData(metaData){
		this.innerHTML = `
		<div class="console">
			<h3>Browser</h3>
			<p>You have <span class="bold">${metaData.taskLength}</span> tasks, <span class="bold">${metaData.tasksChecked}</span> are completed</p>
		</div>
		`;
	}
}

customElements.define('app-console', appConsole);