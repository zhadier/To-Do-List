import populateStorage from './PopulateStorage.js';

const dragndrop = (list) => {
  const draggables = document.querySelectorAll('.task');
  const clear = document.querySelector('#clear');
  draggables[draggables.length - 1].addEventListener('dragstart', (evt) => {
    evt.currentTarget.classList.add('dragging');
  });
  draggables[draggables.length - 1].addEventListener('dragend', (evt) => {
    evt.currentTarget.classList.remove('dragging');
  });
  draggables[draggables.length - 1].addEventListener('dragover', (evt) => {
    evt.preventDefault();
  });
  draggables[draggables.length - 1].addEventListener('dragenter', (evt) => {
    evt.preventDefault();
    const container = document.querySelector('.taskList');
    const dragged = document.querySelector('.dragging');
    const dragOverIndex = evt.currentTarget;
    container.insertBefore(dragged, dragOverIndex);
  });
  draggables[draggables.length - 1].addEventListener('drop', () => {
    const boxes = document.querySelectorAll('.inputTasks');
    for (let i = 1; i <= list.taskList.length; i += 1) {
      boxes[i - 1].dataset.value = `${i}`;
      list.taskList.forEach((item) => {
        if (item.desc === boxes[i - 1].value) {
          item.index = i;
        }
      });
    }
    list.tasksList = list.taskList.sort((a, b) => a.index - b.index);
    list.index = list.taskList.length + 1;
    populateStorage(list);
  });
  clear.addEventListener('dragover', () => {
    const container = document.querySelector('.taskList');
    const dragged = document.querySelector('.dragging');
    container.appendChild(dragged);
  });
};

export { dragndrop as default };
