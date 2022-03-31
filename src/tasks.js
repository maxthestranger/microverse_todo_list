// modules
import { tasksList } from './queries.js';
import { appendTask, renderTasks } from './displayTasks.js';

// list object blueprint
export class TaskShell {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed || false;
  }
}

// update the UI and LocalStorage
export const pushTask = (description, index, completed, ul) => {
  const taskObj = new TaskShell(description, index, completed);
  // get lists from local storage
  const updatedTaskList = tasksList.gettasksList();
  updatedTaskList.push(taskObj);

  tasksList.settasksList(updatedTaskList);
  ul.appendChild(appendTask(taskObj));
};

// update the list index after delete
export const updateStorage = (target, ul) => {
  const parent = target.parentNode.parentNode;
  parent.remove();
  const updatedTaskList = [];

  Array.from(ul.children).forEach((li, index) => {
    const description = li.querySelector('.text-content span').textContent;
    const completed = li.querySelector('.checkbox').checked;

    const taskObj = new TaskShell(description, index + 1, completed);
    updatedTaskList.push(taskObj);
  });

  tasksList.settasksList(updatedTaskList);

  renderTasks(updatedTaskList);
};

// create a new task
export const createTask = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const error = document.querySelector('.error');
    const updatedTaskList = tasksList.gettasksList();

    if (/^\s*$/.test(e.target.value)) {
      error.innerText = 'Task cannot be empty';
      error.classList.add('p-4');
    } else {
      error.innerText = '';
      const ul = e.target.parentNode.querySelector('.todo');
      pushTask(e.target.value, updatedTaskList.length + 1, false, ul);
      e.target.value = '';
    }
  }
};

// edit tasks
export const editTask = {
  // act on focusin
  focusIn(e) {
    if (e.target.className.includes('text-content')) {
      e.target.parentNode.classList.add('edit');
    }
  },

  //   act on focusout
  focusOut(e) {
    if (e.target.className.includes('text-content')) {
      e.target.parentNode.classList.remove('edit');
      const description = e.target.innerText;
      const { id } = e.target.parentNode.dataset;

      const updatedTaskList = tasksList.gettasksList();

      updatedTaskList.forEach((task) => {
        if (Number(id) === task.index) {
          task.description = description;
        }
      });

      tasksList.settasksList(updatedTaskList);
    }
  },
};

// delete tasks
export const removeTask = (e) => {
  const { target } = e;
  if (target.className.includes('delete')) {
    const ul = document.querySelector('.todo');
    updateStorage(target, ul);
  }
};
