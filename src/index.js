// styles
import 'boxicons/css/boxicons.min.css';
import './style.css';

// modules
import {
  tasksList, input, ul, btn,
} from './queries.js';
import { renderTasks } from './displayTasks.js';
import { createTask, editTask, removeTask } from './tasks.js';
import { checkComplete, clearComplete } from './checks.js';
import handleDragDrop from './dragDrop.js';

window.addEventListener('DOMContentLoaded', () => {
  // render initial listing
  renderTasks(tasksList.gettasksList());

  // create a new list
  input.addEventListener('keyup', (e) => createTask(e));

  // edits tasks
  // on focusin
  ul.addEventListener('focusin', (e) => editTask.focusIn(e));

  // and save on focusout
  ul.addEventListener('focusout', (e) => editTask.focusOut(e));

  // delete tasks
  ul.addEventListener('click', (e) => removeTask(e));

  // mark complete tasks
  ul.addEventListener('change', (e) => checkComplete(e));

  // clear complete tasks
  btn.addEventListener('click', () => clearComplete());

  // drag and drop
  handleDragDrop(ul);
});
