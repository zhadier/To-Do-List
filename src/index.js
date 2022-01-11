import './style.css';
import LIST from './modules/List.js';
import TASK from './modules/Task.js';

const list = new LIST();
if (localStorage.getItem('taskCollection')) {
  const localTasks = JSON.parse(localStorage.getItem('taskCollection'));
  localTasks.tasks.forEach((element) => {
    list.add(new TASK(element.desc, element.index, element.completed));
  });
}

const addTask = document.querySelector('#addTask');
addTask.addEventListener('click', () => {
  const taskToAdd = document.querySelector('#add');
  list.add(new TASK(taskToAdd.value, list.index));
});

list.add(new TASK('Do Your Homework', list.index));
list.add(new TASK('Eat Your Dinner', list.index));
list.add(new TASK('Take a Shower', list.index));
