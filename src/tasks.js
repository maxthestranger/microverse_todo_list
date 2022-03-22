const input = document.querySelector('.input');
const ul = document.querySelector('.todo');
const err = document.querySelector('.error');

class TaskShell {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed || false;
  }
}

let taskList = JSON.parse(localStorage.getItem('task_list')) || [];

const setLocalStorage = (tasks) => {
  localStorage.setItem('task_list', JSON.stringify(tasks));
};

const appendTask = ({ description, index }) => {
  const li = document.createElement('li');
  li.setAttribute('data-id', index);
  li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <div class="text-content" contenteditable="true">
      <span>${description}</span>
     <span class="delete" contenteditable="false">
      <i class='bx bx-trash'></i>
    </span>
    </div>
    <span class="drag">
      <i class='bx bx-dots-vertical-rounded'></i>
    </span>
    `;
  ul.appendChild(li);
};

const pushTask = (description, index, completed) => {
  const taskObj = new TaskShell(description, index, completed);
  taskList.push(taskObj);

  setLocalStorage(taskList);
  appendTask(taskObj);
};

const updateStorage = () => {
  const newUl = document.querySelector('.todo');
  taskList = [];

  Array.from(newUl.children).forEach((li, index) => {
    const desc = li.querySelector('.text-content span').textContent;
    const taskObj = new TaskShell(desc, index + 1, false);
    taskList.push(taskObj);
  });

  setLocalStorage(taskList);
};

export const addTask = () => {
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      if (/^\s*$/.test(e.target.value)) {
        err.innerText = 'Task cannot be empty';
        err.classList.add('p-4');
      } else {
        err.innerText = '';
        pushTask(e.target.value, taskList.length + 1, false);
        e.target.value = '';
      }
    }
  });
};

export const removeTask = () => {
  ul.addEventListener('click', (e) => {
    const { target } = e;
    if (target.className.includes('delete')) {
      const parent = target.parentNode.parentNode;
      parent.remove();
      updateStorage();
    }
  });
};

export const editTask = () => {
  ul.addEventListener('focusin', (e) => {
    if (e.target.className.includes('text-content')) {
      e.target.parentNode.classList.add('edit');
    }
  });

  ul.addEventListener('focusout', (e) => {
    e.target.parentNode.classList.remove('edit');
    const newText = e.target.innerText;
    const { id } = e.target.parentNode.dataset;

    taskList.forEach((task) => {
      if (Number(id) === task.index) {
        task.description = newText;
      }
    });

    setLocalStorage(taskList);
  });
};
