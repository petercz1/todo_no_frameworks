import RootElement from './app-rootelement.js';
import PubSub from '../data/pubsub.js';

class appConsole extends RootElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData(this.pubsub.getData('getMeta', null));
		this.pubsub.subscribe('NewTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('ChangeTask', 'getMeta', null, this.renderData);
		this.pubsub.subscribe('DeleteTask', 'getMeta', null, this.renderData);
  }

	// renders all data from 'getPeople()'
	renderData(data){
		console.log(data);
		this.innerHTML = `	
		<h3>Console monitoring stuff</h3>
		<p>You have <span class="bold">${data.taskLength}</span> tasks, <span class="bold">
		${dat.tasksChecked}</span> are completed</p>
		`;
	}
}

customElements.define('app-console', appConsole);

export default appConsole;