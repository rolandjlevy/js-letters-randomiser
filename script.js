const $ = (selector) => document.querySelector(selector);
const maxHex = parseInt('ffffff', 16);

const abcArr = () => {
  return Array(26).fill().map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
}

const abcUC = abcArr().map(n => n.toUpperCase());
const abc = [...abcArr(), ...abcUC, ...'   '];

const randomHex = () => {
  const num = Math.floor(Math.random() * Math.floor(maxHex));
  return num.toString(16);
}

const randomChar = () => {
  const randomNum = Math.floor(Math.random() * (abc.length - 1));
  return abc[randomNum];
}

$('button[name=randomise]').addEventListener('click', (e) => {
  const inputText = $('input[name=words]').value.trim();
  shuffle(inputText);
});

function shuffle(inputText) {
  const destination = Array.from(inputText);
  const current = Array(destination.length).fill('').map(item => {
    return { letter:item, colour:`#${randomHex()}` }
  });
  const timerId = setInterval(() => {
    $('.display').innerHTML = current.map((item, index) => {      
      if (item.letter !== destination[index]) {
        item.letter = randomChar();
        item.colour = randomHex();
      }
      return `<span style="color:#${item.colour}">${item.letter}</span>`;
    }).join('');
    if (current.map(item => item.letter).join('') == destination.join('')) {
      clearInterval(timerId);
    }
  }, 5);
}