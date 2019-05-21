import RootElement from './app-rootelement.js';
import PubSub from '../data/pubsub.js';

class appConsole extends RootElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData(this.pubsub.getData('getPeople', null));
		this.pubsub.subscribe('ChangeTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', null, this.renderData);
  }

	// renders all data from 'getPeople()'
	renderData(data){
		this.innerHTML = `	
		<h3>Console monitoring stuff</h3>
		<p>You have <span class="bold">${data.tasksLength}</span> tasks, <span class="bold">
		${this.tasksChecked}</span> are completed</p>
		`;
	}
}

customElements.define('app-console', appConsole);