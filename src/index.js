import './style.css';
import _, { map } from 'lodash';

const newArr = _.map(['6', '8', '10', '11'], parseInt);
console.log(newArr);

newArr.forEach((el) => {
  const p = document.createElement('p');
  p.classList.add('p');
  p.innerText = `[${el}]`;
  document.body.lastElementChild.appendChild(p);
});
