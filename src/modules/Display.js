const display = (data) => {
  const taskSection = document.querySelector('.taskList');
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = ` <input type="checkbox" class="checkBox">
  <input class = "inputTasks" type="text" data-value="${data.index}">
      <i class="fas fa-ellipsis-v draggable" draggable ="true"></i>
      <button type="button" class="removeButton toggle" data-value = 1><i class="fas fa-trash"></i></button>`;
  if (data.completed === true) {
    li.firstElementChild.setAttribute('checked', 'true');
    li.children[1].classList.add('checked');
  }
  taskSection.appendChild(li);
  const newInput = document.querySelectorAll('.inputTasks');
  newInput[newInput.length - 1].value = data.desc;
};

export { display as default };
