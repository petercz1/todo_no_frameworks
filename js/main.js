// import webcomponents
import './helpers/app-rootelement.js';
import './components/app-tasks.js';
import './components/app-task.js';
import './components/app-addtask.js';
import './components/app-console.js';
import './components/app-console.js';
import './data/sendTask.js';
import fetchTasks from './data/fetchTasks.js';

// load any tasks from server
window.onload = fetchTasks.fetchData();