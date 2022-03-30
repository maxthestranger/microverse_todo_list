/**
 * @jest-environment jsdom
 */
import { pushTask } from '../tasks.js';

describe('AddingDescriptions', () => {
  test('list length to be 1', () => {
    document.body.innerHTML = `
    <div>
        <input type="text" class="input" value="task 1" />
        <ul class="todo"></ul>
    </div>
    `;

    const ul = document.querySelector('.todo');
    const tasks = ['task 1', 'task 2', 'task 3', 'task 4'];
    for (let i = 0; i < tasks.length; i += 1) {
      pushTask(tasks[i], i, false, ul);
    }
    const list = document.querySelectorAll('.todo li');
    expect(list).toHaveLength(tasks.length);
  });
});
