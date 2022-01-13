import display from './Display.js';
import populateStorage from './PopulateStorage.js';
import { checked, clear, rearrangeIndex } from './Check$Clear.js';

const remove = (list) => {
  const tasks = document.querySelector('.taskList');
  const re = document.querySelectorAll('.removeButton');
  re[re.length - 1].addEventListener('click', (evt) => {
    list.taskList = list.taskList.filter(
      (item) => item.index !== Number(evt.currentTarget.parentNode.children[1].dataset.value),
    );
    tasks.removeChild(evt.currentTarget.parentNode);
    rearrangeIndex(list);
  });
};

const modify = (list) => {
  const taskList = document.querySelector('.taskList');
  const tasks = document.querySelectorAll('.inputTasks');
  const initial = tasks.length;
  tasks[tasks.length - 1].addEventListener('focusin', (evt) => {
    evt.currentTarget.parentNode.classList.add('focused');
    evt.currentTarget.parentNode.children[3].classList.remove('toggle');
    evt.currentTarget.parentNode.children[2].classList.add('toggle');
  });
  tasks[tasks.length - 1].addEventListener('focusout', (evt) => {
    evt.currentTarget.parentNode.classList.remove('focused');
    const block2 = evt.currentTarget.parentNode.children[2];
    const block = evt.currentTarget.parentNode.children[3];
    setTimeout(() => {
      if (initial === tasks.length) {
        block.classList.add('toggle');
        block2.classList.remove('toggle');
      }
    }, 90);
  });

  tasks[tasks.length - 1].addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
      if (evt.currentTarget.value === '') {
        list.taskList = list.taskList.filter(
          (item) => item.index !== Number(evt.currentTarget.dataset.value),
        );
        taskList.removeChild(evt.currentTarget.parentNode);
        rearrangeIndex(list);
      } else {
        list.taskList[`${evt.currentTarget.dataset.value - 1}`].desc = evt.currentTarget.value;
        populateStorage(list);
      }
      evt.currentTarget.blur();
    }
  });
};

const add = (data, list) => {
  if (data.desc === '') {
    return;
  }
  if (list.taskList.filter((item) => item.desc === data.desc).length > 0) {
    return;
  }
  list.index = data.index;
  list.taskList.push(data);
  display(data, list);
  checked(list);
  remove(list);
  modify(list);
  clear(list);
  populateStorage(list);
  list.index += 1;
};

export { add as default };
