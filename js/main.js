// import webcomponents
import './helpers/app-rootelement.js';
import './components/app-tasks.js';
import './components/app-task.js';
import './components/app-addtask.js';
import './components/app-console.js';
import './components/app-servermessages.js';
import './data/sendTask.js';

// import helpers
import fetchTasks from './data/fetchTasks.js';
import serverMonitor from './helpers/serverMonitor.js';

window.onload = start();

function start() {
  fetchTasks.fetchData(); // load any tasks from server
  let servermon = new serverMonitor();
  servermon.monitor(); // watch server for new messages
}