const screen = document.querySelector('.screen');
let buffer = '0';
let runningTotal = 0;
let previousOperator = null;

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  render();
}

function handleMath(value) {
  if (buffer === '0') {
    // do nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    operation(intBuffer);
  }
  buffer = '0';
}

function operation(intBuffer) {
  if (previousOperator === '＋') {
    runningTotal += intBuffer;
  } else if (previousOperator === '－') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '✖') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '＝':
      if (previousOperator === null) {
        // do nothing
        return;
      }
      operation(parseInt(buffer));
      buffer = '' + runningTotal;
      runningTotal = 0;
      break;
    case '＋':
    case '－':
    case '✖':
    case '÷':
      previousOperator = symbol;
      handleMath(symbol);
      break;
  }
}

function handleNumber(number) {
  if (buffer === '0') {
    buffer = number;
  } else {
    buffer += number;
  }
}

function init() {
  document
    .querySelector('.button-container')
    .addEventListener('click', function (event) {
      buttonClick(event.target.innerText);
    });
}

init();

function render() {
  screen.innerText = buffer;
}
