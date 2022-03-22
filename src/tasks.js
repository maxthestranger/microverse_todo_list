// modules
import { tasksList } from './queries.js';
import { appendTask, renderTasks } from './displayTasks.js';

// list object blueprint
class TaskShell {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed || false;
  }
}

// update the UI and LocalStorage
const pushTask = (description, index, completed) => {
  const taskObj = new TaskShell(description, index, completed);
  // get lists from local storage
  const updatedTaskList = tasksList.gettasksList();
  updatedTaskList.push(taskObj);

  tasksList.settasksList(updatedTaskList);
  const ul = document.querySelector('.todo');
  ul.appendChild(appendTask(taskObj));
};

// update the list index after delete
const updateStorage = (target) => {
  const parent = target.parentNode.parentNode;
  parent.remove();

  const ul = document.querySelector('.todo');
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
      pushTask(e.target.value, updatedTaskList.length + 1, false);
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
    updateStorage(target);
  }
};
