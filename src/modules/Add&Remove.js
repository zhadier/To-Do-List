import displayInDom from './Display.js';
import populateStorage from './PopulateStorage.js';
import { checkedInDom, clearInDom, rearrangeIndex } from './Check$Clear.js';
import DragDrop from './Drag&Drop.js';

// ### List functions ###
const removeViaIndex = (list, dataIndex) => {
  list.taskList = list.taskList.filter((item) => item.index !== dataIndex);
};

const updateListDesc = (list, index, desc) => {
  list.taskList[index].desc = desc;
};

const validateInput = (data, list) => {
  if (data.desc === '') {
    return 0;
  }
  if (list.taskList.filter((item) => item.desc === data.desc).length > 0) {
    return 0;
  }
  return 1;
};

const addToList = (data, list) => {
  list.index = data.index;
  list.taskList.push(data);
};

// ### Dom Functions ###
const removeFromDom = (list) => {
  const re = document.querySelectorAll('.removeButton');
  re[re.length - 1].addEventListener('click', (evt) => {
    removeViaIndex(list, Number(evt.currentTarget.parentNode.children[1].dataset.value));
    evt.currentTarget.parentNode.remove();
    rearrangeIndex(list);
  });
};

const modifyInDom = (list) => {
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
    }, 110);
  });
  tasks[tasks.length - 1].addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
      if (evt.currentTarget.value === '') {
        removeViaIndex(list, Number(evt.currentTarget.dataset.value));
        evt.currentTarget.parentNode.remove();
        rearrangeIndex(list);
      } else {
        updateListDesc(list, evt.currentTarget.dataset.value - 1, evt.currentTarget.value);
        populateStorage(list);
      }
      evt.currentTarget.blur();
    }
  });
};

const addToDom = (data, list) => {
  if (!validateInput(data, list)) {
    return;
  }
  addToList(data, list);
  displayInDom(data, list);
  checkedInDom(list);
  removeFromDom(list);
  modifyInDom(list);
  clearInDom(list);
  DragDrop(list);
  populateStorage(list);
  list.index += 1;
};

export { addToDom as default };
