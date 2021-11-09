'use strict';

const calculatorBox = document.querySelector('.calculator');
const displayPrev = document.querySelector('.display-prev');
const displayCur = document.querySelector('.display-cur');

class Calculator {
  prevValue;
  curValue;
  operationType;

  constructor(calculatorBody, prevOperation, curOperation) {
    this.calculatorBody = calculatorBody;
    this.prevOperation = prevOperation;
    this.curOperation = curOperation;

    // INITIAL ALL CLEAR
    this.allClear();
  }

  displayNumber = function (number) {
    // RUN ALL CLEAR IF RESULT IS BEING DISPLAYED
    if (this.prevOperation.textContent.includes('=')) this.allClear();
    // ALLOW MAX 9 NUMBERS AND ONLY ONE '.'
    if (this.curOperation.textContent.includes('.')) {
      if (this.curOperation.textContent.length >= 10 || number === '.') return;
    } else {
      if (this.curOperation.textContent.length >= 9) return;
    }
    //REMOVE ZERO BEFORE INTEGERES
    if (this.curOperation.textContent === '0' && number !== '.')
      this.curOperation.textContent = this.curOperation.textContent.slice(1);
    // DISPLAY THE NUMBER
    this.curOperation.textContent += number;
    // // ADD ZERO BEFORE '.'
    if (this.curOperation.textContent === '.')
      this.curOperation.textContent = '0.';
  };

  deleteNumber = () => {
    // RETURN IF RESULT IS BEING DISPLAYED
    if (this.prevOperation.textContent.includes('=')) return;
    //REMOVE LAST CHARACTER FROM TEXT CONTENT
    this.curOperation.textContent = this.curOperation.textContent.slice(0, -1);
    // PREVENT '-' FROM BEING LEFT ON DISPLAY
    if (this.curOperation.textContent === '-')
      this.curOperation.textContent = '';
  };

  chooseOperation = operation => {
    // SAVE CUR VALUE
    this.curValue = this.curOperation.textContent;
    // IF PREV VALUE EMPTY, OR THE RESULT IS BEING DISPLAYED, SET THE PREV VALUE AND OPERATION TYPE
    if (!this.prevValue || this.prevOperation.textContent.includes('=')) {
      this.prevValue = this.curValue;
      this.operationType = operation;
    }
    // ELSE FIRST DO THE CALCULATION AND THEN SET THE NEW OPERATION TYPE
    else {
      this.prevValue = this.doCalculation();
      this.operationType = operation;
    }
    //DISPLAY PREV VALUE + OPERATION
    this.prevOperation.textContent = `${this.prevValue} ${
      this.operationType === '/' ? '÷' : this.operationType
    }`;
    //EMPTY CUR VALUE
    this.curValue = '';
    this.curOperation.textContent = '';
  };

  doCalculation = function () {
    // IF CUR VALUE EMPTY, RETURN PREV VALUE - ALLOWS TO CHANGE OPERTION SYMBOL
    if (!this.curValue) return this.prevValue;
    if (this.operationType === '+')
      return parseFloat(this.prevValue) + parseFloat(this.curValue);
    if (this.operationType === '-')
      return parseFloat(this.prevValue) - parseFloat(this.curValue);
    if (this.operationType === '*')
      return parseFloat(this.prevValue) * parseFloat(this.curValue);
    if (this.operationType === '/')
      return parseFloat(this.prevValue) / parseFloat(this.curValue);
  };

  displayResult = () => {
    // SAVE CUR VALUE TO MEMORY
    this.curValue = this.curOperation.textContent;
    // CHECK IF OPERATION TYPE  OR CUR VALUE EXISTS
    if (!this.operationType || !this.curValue) return;
    // DISPLAY OPERATION IN PREV OPERATION FIELD
    this.prevOperation.textContent = `${this.prevValue} ${
      this.operationType === '/' ? '÷' : this.operationType
    } ${this.curValue} =`;
    // //DISPLAY RESULT IN CUR OPERATION FIELD
    this.curOperation.textContent = this.doCalculation();
  };

  changeNumberSign = () => {
    // CHANGE SIGN OF THE NUMBER ON DISPLAY
    this.curOperation.textContent = -+this.curOperation.textContent.toString();
  };

  allClear = () => {
    //CLEAR TEXT CONTENT
    this.prevOperation.textContent = '';
    this.curOperation.textContent = '';
    //CLEAR MEMORY
    this.prevValue = '';
    this.curValue = '';
    this.operationType = '';
  };
}

const calculator = new Calculator(calculatorBox, displayPrev, displayCur);

// EVENT HANDLERS

// INPUTING NUMBERS
calculatorBox.addEventListener('click', function (e) {
  const target = e.target.closest('.num');
  if (!target) return;
  const number = target.dataset.value;
  calculator.displayNumber(number);
});

//DELETING NUMBERS
calculatorBox.addEventListener('click', function (e) {
  const target = e.target.closest('.delete');
  if (!target) return;
  calculator.deleteNumber();
});

//OPERATIONS
calculatorBox.addEventListener('click', function (e) {
  const target = e.target.closest('.operation');
  if (!target) return;
  const operation = target.dataset.value;
  calculator.chooseOperation(operation);
});

//DISPLAY RESULT
calculatorBox.addEventListener('click', function (e) {
  const target = e.target.closest('.result');
  if (!target) return;
  calculator.displayResult();
});

//CHANGE NUMBER SIGN
calculatorBox.addEventListener('click', function (e) {
  const target = e.target.closest('.sign');
  if (!target) return;
  calculator.changeNumberSign();
});

//CHANGE NUMBER SIGN
calculatorBox.addEventListener('click', function (e) {
  const target = e.target.closest('.ac');
  if (!target) return;
  calculator.allClear();
});

// KEYBOARD EVENT HANDLERS
document.addEventListener('keydown', function (e) {
  e.preventDefault();
  const pressKey = e.key;
  // INPUTING NUBMERS
  if (!isNaN(parseFloat(pressKey)) || pressKey === '.')
    calculator.displayNumber(pressKey);
  //DELETING NUMBERS
  if (pressKey === 'Backspace') calculator.deleteNumber();
  //OPERATIONS
  if (pressKey === '+') calculator.chooseOperation('+');
  if (pressKey === '-') calculator.chooseOperation('-');
  if (pressKey === '*') calculator.chooseOperation('*');
  if (pressKey === '/') calculator.chooseOperation('/');
  //DISPLAYING RESULT
  if (pressKey === 'Enter') calculator.displayResult();
  //ALL CLEAR
  if (pressKey === 'Escape') calculator.allClear();
});
