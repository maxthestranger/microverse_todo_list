import './style.css';

const ul = document.querySelector('.todo');

const tasks = [
  {
    description: 'Work on the music project',
    completed: true,
    index: 0,
  },
  {
    description: 'Go to the gym',
    completed: false,
    index: 1,
  },
  {
    description: 'Teach the kids programming',
    completed: false,
    index: 2,
  },
];

function displayTask() {
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerText = task.description;

    ul.appendChild(li);
  });
}

displayTask();
