export default class LIST {
  constructor(taskList = []) {
    this.taskList = taskList;
    this.index = 0;
  }

  add(data) {
    if (data.desc === '') {
      console.log('Please Enter Text');
    } else if (this.taskList.filter((item) => item.desc === data.desc).length > 0) {
      console.log('task already exists');
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
      this.rearrangeIndex();
      this.populateStorage();
      console.log(this.taskList);
    });
  }

  rearrangeIndex() {
    const boxes = document.querySelectorAll('li > input');
    for (let i = 0; i < this.taskList.length; i += 1) {
      this.taskList[i].index = i;
      boxes[i].id = `${i}`;
      boxes[i].name = `${i}`;
      boxes[i].parentNode.children[1].setAttribute('for', `${i}`);
    }
    this.index = this.taskList.length;
  }

  checked() {
    const checked = document.querySelectorAll('li > input');
    checked[checked.length - 1].addEventListener('change', (evt) => {
      if (evt.target.checked) {
        evt.target.parentNode.classList.add('checked');
        this.taskList[`${evt.target.id}`].completed = 1;
      } else {
        evt.target.parentNode.classList.remove('checked');
        this.taskList[`${evt.target.id}`].completed = 0;
      }
      this.populateStorage();
    });
  }

  display(data) {
    if (this) {
      const taskSection = document.querySelector('.taskList');
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = ` <input type="checkbox" id="${data.index}" name="${data.index}" />
      <label for="${data.index}">${data.desc}</label>
      <i class="fas fa-ellipsis-v"></i>`;
      if (data.completed === 1) {
        li.firstElementChild.setAttribute('checked', 'true');
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
