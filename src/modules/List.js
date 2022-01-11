export default class LIST {
  constructor(taskList = []) {
    this.taskList = taskList;
    this.index = 0;
  }

  add(data) {
    if (this.taskList.filter((item) => item.desc === data.desc).length > 0) {
      alert('Task Already Exists');
    } else {
      this.index = data.index;
      this.taskList.push(data);
      this.display(data);
      this.checked();
      this.remove();
      this.populateStorage();
      this.index += 1;
    }
  }

  remove() {
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', () => {
      const checked = document.querySelectorAll('.checked');
      checked.forEach((item) => {
        item.parentNode.removeChild(item);
      });
      this.taskList = this.taskList.filter((item) => item.completed !== 1);
      this.populateStorage();
    });
  }

  checked() {
    const checked = document.querySelectorAll('.taskList > input');
    checked[checked.length - 1].addEventListener('change', (evt) => {
      if (evt.target.checked) {
        evt.target.parentNode.classList.add('checked');
        this.taskList[`${evt.target.id}`].completed = 1;
      } else {
        evt.target.parentNode.classList.remove('checked');
        this.taskList[`${evt.target.id}`].completed = 0;
      }
    });
  }

  display(data) {
    if (this) {
      const taskSection = document.querySelector('.taskList');
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = ` <input type="checkbox" id="${data.index}" name="${data.index}" />
      <label for="${data.index}">${data.desc}</label>`;
      if (data.completed === 1) {
        li.firstChild.checked = true;
        li.classList.add('checked');
      }
      taskSection.appendChild(li);
    }
  }

  populateStorage() {
    localStorage.setItem(
      'taskCollection',
      JSON.stringify({
        tasks: this.taskList,
      }),
    );
  }
}
