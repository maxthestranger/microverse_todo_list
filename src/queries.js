export const ul = document.querySelector('.todo');
export const input = document.querySelector('.input');
export const btn = document.querySelector('.btn');

export const tasksList = {
  settasksList(tasks) {
    localStorage.setItem('task_list', JSON.stringify(tasks));
  },
  gettasksList() {
    return JSON.parse(localStorage.getItem('task_list')) || [];
  },
};
