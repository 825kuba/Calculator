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
    this.init();

    //EVENT HANDLERS
    this.calculatorBody.addEventListener(
      'click',
      this.displayNumber.bind(this)
    );
    this.calculatorBody.addEventListener('click', this.deleteNumber.bind(this));
    this.calculatorBody.addEventListener(
      'click',
      this.changeNumberSign.bind(this)
    );
    this.calculatorBody.addEventListener('click', this.allClear.bind(this));
    this.calculatorBody.addEventListener('click', this.doOperation.bind(this));
    this.calculatorBody.addEventListener(
      'click',
      this.displayResult.bind(this)
    );
  }

  displayNumber = function (e) {
    const btn = e.target.closest('.num');
    if (!btn) return;
    //GET NUMBER VALUE
    const value = btn.dataset.value;
    // MAX 16 CHARS CHECK
    if (this.curOperation.textContent.length >= 16) return;
    //ONLY 1 COMMA CHECK
    if (value === '.' && this.curOperation.textContent.includes('.')) return;
    //ONLY 1 ZERO IN THE BEGINNING CHECK
    if (value === '0' && this.curOperation.textContent === '0') return;
    // DISPLAY NUMBER
    this.curOperation.textContent += value;
    //REMOVE THE ZERO IN THE BEGINNING
    if (
      this.curOperation.textContent[0] === '0' &&
      this.curOperation.textContent[1] !== '.'
    )
      this.curOperation.textContent = this.curOperation.textContent.slice(1);
    //ADD NUMBER TO MEMORY
    this.curValue = +this.curOperation.textContent;
  };

  doOperation = function (e) {
    const btn = e.target.closest('.operation');
    if (!btn) return;
    // CHECK IF ANY NUMBERS EXIST
    if (!this.curValue) return;

    //IF PREV VALUE IS EMPTY SET IT AND DISPLAY THE OPERATION TYPE
    if (!this.prevValue) {
      this.prevValue = this.curValue;
      this.operationType = btn.dataset.value;
    }

    //ELSE IF THE PREV VALUE ALREADY EXISTS, FIRST DO THE CALCULATION AND THEN SET THE NEW OPERATION TYPE
    else if (this.prevValue && !this.prevOperation.textContent.includes('=')) {
      this.prevValue = this.doCalculation();
      this.operationType = btn.dataset.value;
      //ELSE IF THE RESULT IS BEING DISPLAYED, DISPLAY THE RESULT AND THE NEW OPERATION SYMBOL IN PREV OPERARION
    } else {
      this.operationType = btn.dataset.value;
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

  displayResult = function (e) {
    const btn = e.target.closest('.result');
    if (!btn) return;
    // CHECK IF NUMBERS EXIST
    if (!this.operationType) return;
    // DO CALCULATION AND DISPLAY IT
    this.prevOperation.textContent = `${this.prevValue} ${
      this.operationType === '/' ? '÷' : this.operationType
    } ${this.curValue} =`;
    this.prevValue = this.doCalculation();
    this.curOperation.textContent = this.prevValue;
    // // SET LOWER FONT SIZE IF NUMBER TOO LONG
    // if (this.curOperation.textContent.length >= 16)
    //   displayCur.style.fontSize = '1.5rem';
  };

  deleteNumber = function (e) {
    const btn = e.target.closest('.delete');
    if (!btn) return;
    // NUMBER EXISTS CHECK
    if (!this.curValue) return;
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

  changeNumberSign = function (e) {
    const btn = e.target.closest('.sign');
    if (!btn) return;
    //CHANGE SIGN OF THE NUMBER IN MEMORY
    this.curValue = -this.curValue;
    //DISPLAY THE NUMBER IN TEXT CONTENT
    this.curOperation.textContent = this.curValue.toString();
  };

  allClear = function (e) {
    const btn = e.target.closest('.ac');
    if (!btn) return;
    this.init();
  };

  init = function () {
    //CLEAR TEXT CONTENT, LEAVE ZERO IN CUR OPERATION
    this.prevOperation.textContent = '';
    this.curOperation.textContent = '0';
    //CLEAR MEMORY
    this.prevValue = 0;
    this.curValue = 0;
    this.operationType = '';
    // // SET ORIGINAL FONT SIZE
    // displayCur.style.fontSize = '1.8rem';
  };
}

const calculator = new Calculator(calculatorBox, displayPrev, displayCur);
