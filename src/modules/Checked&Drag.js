import populateStorage from './PopulateStorage.js';

const checked = (list) => {
  const checked = document.querySelectorAll('.checkBox');
  checked[checked.length - 1].addEventListener('change', (evt) => {
    evt.stopImmediatePropagation();
    if (evt.currentTarget.checked) {
      evt.currentTarget.parentNode.children[1].classList.add('checked');
      list.taskList[`${evt.currentTarget.parentNode.children[1].dataset.value}`].completed = 1;
    } else {
      evt.currentTarget.parentNode.children[1].classList.remove('checked');
      list.taskList[`${evt.currentTarget.parentNode.children[1].dataset.value}`].completed = 0;
    }
    populateStorage(list);
  });
};

export { checked as default };
