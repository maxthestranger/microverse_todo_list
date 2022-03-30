/**
 * @jest-environment jsdom
 */
import { createTask, pushTask } from '../tasks.js';
// import { tasksList } from './queries.js';

// const updatedTaskList = tasksList.gettasksList();
describe('AddingDescriptions', () => {
  test('list length to be 1', () => {
    document.body.innerHTML = `
    <div>
        <input type="text" class="input" value="task 1" />
        <ul class="todo"></ul>
    </div>
    `;

    // const input = document.querySelector('.input');
    // input.addEventListener('keyup', (e) => createTask(e));
    const ul = document.querySelector('.todo');
    const tasks = ['task 1', 'task 2', 'task 3', 'task 4'];
    for (let i = 0; i < tasks.length; i += 1) {
      pushTask(tasks[i], i, false, ul);
    }
    const list = document.querySelectorAll('.todo li');
    expect(list).toHaveLength(tasks.length);
  });

  //   let tasks = [];
  //   for (let i = 0; i < 4; i++) {
  //     tasks = pushTask('Wash dish', updatedTaskList.length + 1, false);
  //   }
});
