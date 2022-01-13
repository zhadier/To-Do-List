import populateStorage from './PopulateStorage.js';

const checked = (list) => {
  const checked = document.querySelectorAll('.checkBox');
  checked[checked.length - 1].addEventListener('change', (evt) => {
    evt.stopImmediatePropagation();
    if (evt.currentTarget.checked) {
      evt.currentTarget.parentNode.children[1].classList.add('checked');
      list.taskList[
        `${evt.currentTarget.parentNode.children[1].dataset.value - 1}`
      ].completed = true;
    } else {
      evt.currentTarget.parentNode.children[1].classList.remove('checked');
      list.taskList[
        `${evt.currentTarget.parentNode.children[1].dataset.value - 1}`
      ].completed = false;
    }
    populateStorage(list);
  });
};

const rearrangeIndex = (list) => {
  const boxes = document.querySelectorAll('.inputTasks');
  for (let i = 1; i <= list.taskList.length; i += 1) {
    list.taskList[i - 1].index = i;
    boxes[i - 1].dataset.value = `${i}`;
  }
  list.index = list.taskList.length + 1;
  populateStorage(list);
};

const clear = (list) => {
  const clear = document.querySelector('#clear');
  clear.addEventListener('click', () => {
    const checked = document.querySelectorAll('.checked');
    checked.forEach((item) => {
      item.parentNode.parentNode.removeChild(item.parentNode);
    });
    list.taskList = list.taskList.filter((item) => item.completed !== true);
    rearrangeIndex(list);
  });
};

export { checked, clear, rearrangeIndex };
