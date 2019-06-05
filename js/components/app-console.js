import RootElement from '../helpers/app-rootelement.js';
import PubSub from '../data/pubsub.js';

// ES6 webcomponent <app-console>
export default class appConsole extends RootElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		// initial render with metadata
		this.renderData(this.pubsub.getData('getMeta', null));

		// subscribe to any of these events, get metadata, pass data to renderData
		this.pubsub.subscribe('AddTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ChangeTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ServerTask', 'getMeta', this.renderData);
		this.pubsub.subscribe('ServerTasks', 'getMeta', this.renderData);
  }

	renderData(metaData){
		// build html
		this.innerHTML = `
		<div class="console">
			<h3>Browser</h3>
			<p>You have <span class="bold">${metaData.taskLength}</span> tasks, <span class="bold">${metaData.tasksChecked}</span> are completed</p>
		</div>
		`;
	}
}

customElements.define('app-console', appConsole);