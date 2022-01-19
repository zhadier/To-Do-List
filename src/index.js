import './style.css';
import LIST from './modules/List.js';
import TASK from './modules/Task.js';
import addToDom from './modules/Add&Remove.js';

const list = new LIST();
if (localStorage.getItem('taskCollection')) {
  const localTasks = JSON.parse(localStorage.getItem('taskCollection'));
  localTasks.tasks.forEach((element) => {
    addToDom(new TASK(element.desc, element.index, element.completed), list);
  });
}

const taskToAdd = document.querySelector('#add');
const addTask = document.querySelector('#addTask');
addTask.addEventListener('click', () => {
  addToDom(new TASK(taskToAdd.value, list.index), list);
  taskToAdd.value = '';
});
taskToAdd.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    addToDom(new TASK(taskToAdd.value, list.index), list);
    evt.currentTarget.value = '';
  }
});
