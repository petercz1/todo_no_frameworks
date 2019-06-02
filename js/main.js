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
  
  // load any tasks from server
  let fetchTasks = new FetchTasks();
  fetchTasks.fetchData();

  // watch server for new messages
  let serverMonitor = new ServerMonitor();
  serverMonitor.monitor();
}