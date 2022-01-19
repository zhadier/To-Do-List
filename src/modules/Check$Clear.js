import populateStorage from './PopulateStorage.js';

// ### list functions
const updateListOnCheck = (list, index, completion) => {
  list.taskList[index].completed = completion;
};

const removeInListOnCLear = (list) => {
  list.taskList = list.taskList.filter((item) => item.completed !== true);
};

const updateListOnCLear = (list, currentIndex) => {
  list.taskList[currentIndex - 1].index = currentIndex;
};

// ### Dom functions
const checkedInDom = (list) => {
  const checked = document.querySelectorAll('.checkBox');
  checked[checked.length - 1].addEventListener('change', (evt) => {
    evt.stopImmediatePropagation();
    if (evt.currentTarget.checked) {
      evt.currentTarget.parentNode.children[1].classList.add('checked');
      updateListOnCheck(list, evt.currentTarget.parentNode.children[1].dataset.value - 1, true);
    } else {
      evt.currentTarget.parentNode.children[1].classList.remove('checked');
      updateListOnCheck(list, evt.currentTarget.parentNode.children[1].dataset.value - 1, false);
    }
    populateStorage(list);
  });
};

const rearrangeIndex = (list) => {
  const boxes = document.querySelectorAll('.inputTasks');
  for (let i = 1; i <= list.taskList.length; i += 1) {
    boxes[i - 1].dataset.value = i;
    updateListOnCLear(list, i);
  }
  list.index = list.taskList.length + 1;
  populateStorage(list);
};

const clearInDom = (list) => {
  const clear = document.querySelector('#clear');
  clear.addEventListener('click', () => {
    const checked = document.querySelectorAll('.checked');
    checked.forEach((item) => {
      item.parentNode.remove();
    });
    removeInListOnCLear(list);
    rearrangeIndex(list);
  });
};

export { checkedInDom, clearInDom, rearrangeIndex };
