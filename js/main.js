// import webcomponents
import './helpers/app-rootelement.js';
import './components/app-tasks.js';
import './components/app-task.js';
import './components/app-addtask.js';
import './components/app-console.js';
import './components/app-servermessages.js';
import './data/sendTask.js';


// load any tasks from server
import fetchTasks from './data/fetchTasks.js';
window.onload = fetchTasks.fetchData();