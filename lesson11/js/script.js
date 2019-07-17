'use strict';

const start = document.getElementById('start'), //кнопка "рассчитать

    cancel = document.querySelector('#cancel'), //кнопка "сбросить"

    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0], //добавить статью доходов
    expensesPlus = btnPlus[1], //добавить статью расходов

    //поля вывода
    budgetDayValue = document.querySelectorAll('.budget_day-value')[0],
    budgetMonthValue = document.querySelectorAll('.budget_month-value')[0],
    expensesMonthValue = document.querySelectorAll('.expenses_month-value')[0],
    accumulatedMonthValue = document.querySelectorAll('.accumulated_month-value')[0],
    addIncomeValue = document.querySelectorAll('.additional_income-value')[0],
    addExpensesValue = document.querySelectorAll('.additional_expenses-value')[0],
    incomePeriodValue = document.querySelectorAll('.income_period-value')[0],
    targetMonthValue = document.querySelectorAll('.target_month-value')[0];
/* тут закончились поля, которые по умолчанию - неизменяемы*/

//поля ввода
let salaryAmount = document.querySelector('.salary-amount'), //общий доход
    expensesItems = document.querySelectorAll('.expenses-items'), //обязательные расходы
    addExpensesItem = document.querySelector('.additional_expenses-item'), //возможные расходы
    addIncomeItem = document.querySelectorAll('.additional_income-item'), //возможные доходы
    incomeItems = document.querySelectorAll('.income-items'), //доп. доход
    targetAmount = document.querySelector('.target-amount'), //цель

    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),

    periodSelect = document.querySelector('.period-select'), //накопления за период
    periodAmount = document.querySelector('.period-amount'); //ползунок

class AppData {

    constructor() {

        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    start = () => {
        if (salaryAmount.value === '') {
            return;
        }
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getIncomeMonth();
        this.getExpensesMonth();
        this.getNewAdd();
        this.getInfoDeposit();
        this.getBudget();
        this.blockInput();
        //они идут по порядку исполнения
        this.showResult();
        //он всегда идёт последним
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
    }

    getNewElem(nodeList, btnPlus) {
        let cloneItem = nodeList[0].cloneNode(true);
        nodeList[0].parentNode.insertBefore(cloneItem, btnPlus);

        cloneItem.children[0].addEventListener('input', this.checkContentText);
        cloneItem.children[1].addEventListener('input', this.checkContentNumbers);

        if (nodeList === 2) {
            btnPlus.style.display = 'none';
        }
    }

    getExpenses() {

        const setContext = this;

        expensesItems.forEach(function(item) {

            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                cashExpenses = +cashExpenses;
                setContext.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome() {

        const setContext = this;

        incomeItems.forEach(function(item) {

            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                cashIncome = +cashIncome;
                setContext.income[itemIncome] = cashIncome;
            }
        });
    }

    getNewAdd() {
        let addExpenses = addExpensesItem.value.split(',');
        const setContext = this;
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                setContext.addExpenses.push(item);
            }
        });
        addIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                setContext.addIncome.push(itemValue);
            }
        });
    }

    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        };
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth +
            (this.moneyDeposit * this.percentDeposit) / 12,
            this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        switch (true) {
            case this.budgetDay >= 800:
                return ('Высокий уровень дохода');
            case this.budgetDay >= 300 && this.budgetDay < 800:
                return ('Средний уровень дохода');
            case this.budgetDay >= 0 && this.budgetDay < 300:
                return ('Низкий уровень дохода');
            default:
                return ('Что то пошло не так');
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    getRange() {
        periodAmount.innerText = periodSelect.value;
    }

    blockInput() {
        document.querySelectorAll('.data input[type=text]').forEach(function(item) {
            item.disabled = true;
        });

        start.style.display = 'none';
        cancel.style.display = 'block';
    }

    reset() {
        document.location.reload(true);
    }

    eventsListeners() {


        start.addEventListener('click', this.start);


        expensesPlus.addEventListener('click', () => {
            this.getNewElem(expensesItems, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
        });


        incomePlus.addEventListener('click', () => {
            this.getNewElem(incomeItems, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');


            depositCheck.addEventListener('click', this.checkDeposit);


            periodSelect.addEventListener('input', this.getRange);

            periodSelect.addEventListener('change', () => {
                incomePeriodValue.value = this.calcSavedMoney();
            });


            cancel.addEventListener('click', this.reset);


            depositCheck.addEventListener('change', () => {
                if (depositCheck.checked === true) {
                    depositBank.style.display = 'inline-block';
                    depositAmount.style.display = 'inline-block';
                    this.deposit = true;

                    depositBank.addEventListener('change', function() {
                        let selectIndex = this[this.selectedIndex].value;

                        if (selectIndex === 'other') {
                            depositPercent.style.display = 'inline-block';
                            depositPercent.removeAttribute('disabled');
                            depositPercent.value = '';
                        } else {
                            depositPercent.style.display = 'none';
                            depositPercent.value = selectIndex;
                        }
                    });

                } else {
                    depositBank.style.display = 'none';
                    depositAmount.style.display = 'none';
                    depositAmount.value = '';
                    this.deposit = false;
                }
            }); //depositCheck
        }); //eventListeners
    }; //AppData
}

let ourNewAppData = new AppData();
ourNewAppData.eventsListeners();