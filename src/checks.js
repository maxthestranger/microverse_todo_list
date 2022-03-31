// modules
import { tasksList } from './queries.js';
import { renderTasks } from './displayTasks.js';

export const checkComplete = (target) => {
  if (target.className.includes('checkbox')) {
    const { checked } = target;
    const { id } = target.parentNode.dataset;
    const text = target.parentNode.querySelector('.text-content span');

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
