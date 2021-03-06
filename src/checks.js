// modules
import { tasksList } from './queries.js';
import { renderTasks } from './displayTasks.js';

export const checkComplete = (e) => {
  if (e.target.className.includes('checkbox')) {
    const { checked } = e.target;
    const { id } = e.target.parentNode.dataset;
    const text = e.target.parentNode.querySelector('.text-content span');

    if (checked) {
      text.classList.add('line');
    } else {
      text.classList.remove('line');
    }

    const updatedTaskList = tasksList.gettasksList();

    updatedTaskList.forEach((task) => {
      if (task.index === Number(id)) {
        task.completed = checked;
      }
    });

    tasksList.settasksList(updatedTaskList);
  }
};

export const clearComplete = () => {
  let updatedTaskList = tasksList.gettasksList();

  updatedTaskList = updatedTaskList.filter((task) => !task.completed);
  tasksList.settasksList(updatedTaskList);
  renderTasks(updatedTaskList);
};
