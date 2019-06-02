// import webcomponents
import './helpers/app-rootelement.js';
import './components/app-tasks.js';
import './components/app-task.js';
import './components/app-addtask.js';
import './components/app-console.js';
import './components/app-servermessages.js';
import './data/sendTask.js';

// import helpers
import FetchTasks from './data/fetchTasks.js';
import ServerMonitor from './helpers/serverMonitor.js';

window.onload = start();

function start() {
  let fetchTasks = new FetchTasks();
  fetchTasks.fetchData(); // load any tasks from server
  let servermon = new serverMonitor();
  servermon.monitor(); // watch server for new messages
}