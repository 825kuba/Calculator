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
    //RUN ALL CLEAR IF RESULT IS BEING DISPLAYED
    if (this.prevOperation.textContent.includes('=')) this.allClear();
    // MAX 16 NUMBERS (17 chars with '.')
    if (this.curOperation.textContent.includes('.')) {
      if (this.curOperation.textContent.length >= 17) return;
    } else {
      if (this.curOperation.textContent.length >= 16) return;
    }
    //ONLY 1 COMMA
    if (number === '.' && this.curOperation.textContent.includes('.')) return;
    //ONLY 1 ZERO IN THE BEGINNING
    if (number === '0' && this.curOperation.textContent === '0') return;
    // DISPLAY NUMBER
    this.curOperation.textContent += number;
    //REMOVE THE ZERO IN THE BEGINNING
    if (
      this.curOperation.textContent[0] === '0' &&
      this.curOperation.textContent[1] !== '.'
    )
      this.curOperation.textContent = this.curOperation.textContent.slice(1);
    //ADD NUMBER TO MEMORY
    this.curValue = +this.curOperation.textContent;
    // //CHECK AND POSSIBLY ADJUST FONT SIZE
    // this.adjustFontSize(this.curOperation);
    // CONVERT TO LOCALE
    // this.displayLocale(this.curValue, this.curOperation);
  };

  // adjustFontSize = display => {
  //   // if (display.clientWidth < this.calculatorBody.clientWidth)
  //   //   console.log('overflow');
  //   console.log(this.calculatorBody.clientWidth);
  //   console.log(this.curOperation.clientWidth);
  // };

  displayLocale = (number, display) => {
    display.textContent = parseFloat(number).toLocaleString('en');
  };

  doOperation = operation => {
    // CHECK IF ANY NUMBERS EXIST
    if (!this.curValue) return;
    //IF PREV VALUE IS EMPTY SET IT AND DISPLAY THE OPERATION TYPE
    if (!this.prevValue) {
      this.prevValue = this.curValue;
      this.operationType = operation;
    }
    //ELSE IF THE PREV VALUE ALREADY EXISTS, FIRST DO THE CALCULATION AND THEN SET THE NEW OPERATION TYPE
    else if (this.prevValue && !this.prevOperation.textContent.includes('=')) {
      this.prevValue = this.doCalculation();
      this.operationType = operation;
      //ELSE IF THE RESULT IS BEING DISPLAYED, DISPLAY THE RESULT AND THE NEW OPERATION SYMBOL IN PREV OPERARION
    } else {
      this.operationType = operation;
      this.prevOperation.textContent = `${this.prevValue} ${
        this.operationType === '/' ? '÷' : this.operationType
      }`;
      this.curOperation.textContent = '0';
      this.curValue = 0;
    }
    this.prevOperation.textContent = `${this.prevValue} ${
      this.operationType === '/' ? '÷' : this.operationType
    }`;
    this.curOperation.textContent = '0';
    this.curValue = 0;
  };

  doCalculation = function () {
    if (this.operationType === '+') return this.prevValue + this.curValue;
    if (this.operationType === '-') return this.prevValue - this.curValue;
    if (this.operationType === '*') return this.prevValue * this.curValue;
    if (this.operationType === '/') return this.prevValue / this.curValue;
  };

  deleteNumber = () => {
    // CHECK IF RESULT IS BEING DISPLAYED
    if (this.prevOperation.textContent.includes('=')) return;
    //REMOVE LAST CHARACTER FROM TEXT CONTENT
    this.curOperation.textContent = this.curOperation.textContent.slice(0, -1);
    // DISPLAY ZERO WHEN EVERYTHING WAS DELETED
    if (
      this.curOperation.textContent === '-' ||
      this.curOperation.textContent === ''
    )
      this.curOperation.textContent = '0';
    //ADD NUMBER TO MEMORY
    this.curValue = +this.curOperation.textContent;
  };

  displayResult = function (e) {
    // CHECK IF NUMBERS EXIST
    if (!this.operationType) return;
    // DO CALCULATION AND DISPLAY IT
    this.prevOperation.textContent = `${this.prevValue} ${
      this.operationType === '/' ? '÷' : this.operationType
    } ${this.curValue} =`;
    this.prevValue = this.doCalculation();
    this.curOperation.textContent = this.prevValue;
  };

  changeNumberSign = function (e) {
    //CHECK IF RESULT IS BEING DISPLAYED
    if (this.prevOperation.textContent.includes('=')) return;
    //CHANGE SIGN OF THE NUMBER IN MEMORY
    this.curValue = -this.curValue;
    //DISPLAY THE NUMBER IN TEXT CONTENT
    this.curOperation.textContent = this.curValue.toString();
  };

  allClear = function () {
    //CLEAR TEXT CONTENT, LEAVE ZERO IN CUR OPERATION
    this.prevOperation.textContent = '';
    this.curOperation.textContent = '0';
    //CLEAR MEMORY
    this.prevValue = 0;
    this.curValue = 0;
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
  calculator.doOperation(operation);
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
  if (pressKey === '+') calculator.doOperation('+');
  if (pressKey === '-') calculator.doOperation('-');
  if (pressKey === '*') calculator.doOperation('*');
  if (pressKey === '/') calculator.doOperation('/');
  //DISPLAYING RESULT
  if (pressKey === 'Enter') calculator.displayResult();
  //ALL CLEAR
  if (pressKey === 'Escape') calculator.allClear();
});
