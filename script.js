'use strict';

const calculatorBox = document.querySelector('.calculator');
const displayPrev = document.querySelector('.display-prev');
const displayCur = document.querySelector('.display-cur');

class Calculator {
  prevValue = 0;
  curValue = 0;
  operationType = '';

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
    this.calculatorBody.addEventListener(
      'click',
      this.chooseOperation.bind(this)
    );
  }

  displayNumber = function (e) {
    const btn = e.target.closest('.num');
    if (!btn) return;
    //GET NUMBER VALUE
    const value = btn.dataset.value;
    // MAX 16 CHARS CHECK
    if (this.curOperation.textContent.length > 16) return;
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
    console.log(this.curValue);
  };

  chooseOperation = function (e) {
    const btn = e.target.closest('.operation');
    if (!btn) return;

    this.operationType = btn.dataset.value;
    console.log(this.operationType);
  };

  deleteNumber = function (e) {
    const btn = e.target.closest('.delete');
    if (!btn) return;
    // NUMBER EXISTS CHECK
    if (!this.curValue) return;
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
    console.log(this.curValue);
  };

  changeNumberSign = function (e) {
    const btn = e.target.closest('.sign');
    if (!btn) return;
    //CHANGE SIGN OF THE NUMBER IN MEMORY
    this.curValue = -this.curValue;
    //DISPLAY THE NUMBER IN TEXT CONTENT
    this.curOperation.textContent = this.curValue.toString();
    console.log(this.curValue);
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
    console.log('prev', this.prevValue);
    console.log('cur', this.curValue);
    console.log('oper', this.curValue);
  };
}

const calculator = new Calculator(calculatorBox, displayPrev, displayCur);
