import RootElement from './app-rootelement.js';

import PubSub from '../pubsub/pubsub.js';
import Person from './app-task.js/index.js';

class appTasks extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getTasks',null));
    this.pubsub.subscribe('NewPerson', 'getTasks', null, this.renderData);
    this.pubsub.subscribe('DeletePerson', 'getTasks', null, this.renderData);
  }

  // renders all people returned from 'getTasks()'
  renderData(people) {
    this.innerHTML = `
      <small>&lt;app-people&gt;</small>
      <h2>All people</h2>
      <p> uncheck to deselect</p>
      <div id="people"></div>
    `;
    people.forEach(person => {
      this.querySelector('#people').append(new Person(person));
    });
  }
}

export default appTasks;

customElements.define('app-people', appTasks);