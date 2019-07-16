'use strict';

let start = document.getElementById('start'), //кнопка "рассчитать

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
    targetMonthValue = document.querySelectorAll('.target_month-value')[0],

    //поля ввода
    salaryAmount = document.querySelector('.salary-amount'), //общий доход
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
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        //они идут по порядку исполнения
        this.showResult();
        //он всегда идёт последним
    }


    showResult = () => {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        this.blockInput();
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    }

    addExpensesBlock = () => {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock = () => {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getExpenses = () => {
        expensesItems.forEach((item) => {

            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                cashExpenses = +cashExpenses;
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome = () => {
        incomeItems.forEach((item) => {

            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                cashIncome = +cashIncome;
                this.income[itemIncome] = cashIncome;
            }
        });
    }

    getIncomeMonth = () => {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        };
    }

    getAddExpenses = () => {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    }

    getAddIncome = () => {
        addIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth = () => {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget = () => {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12,
            this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth = () => {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome = () => {
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

    getInfoDeposit = () => {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcSavedMoney = () => {
        return this.budgetMonth * periodSelect.value;
    }

    getRange = () => {
        periodAmount.innerText = periodSelect.value;
    }

    blockInput = () => {
        document.querySelectorAll('.data input[type=text]').forEach(function(item) {
            item.disabled = true;
        });

        start.style.display = 'none';
        cancel.style.display = 'block';
    }

    reset = () => {
        document.location.reload(true);
    }
    eventsListeners = () => {
        depositCheck.addEventListener('change', function() {
                if (depositCheck.checked) {
                    depositBank.style.display = 'inline-block';
                    depositAmount.style.display = 'inline-block';
                    appData.deposit = 'true';

                    depositBank.addEventListener('change', function() {
                        let selectIndex = this.options[this.selectedIndex].value;
                        if (selectIndex === 'other') {
                            depositPercent.style.display = 'inline-block';
                            depositPercent.value = '';
                        } else {
                            depositPercent.style.display = 'none';
                            depositPercent.removeAttribute('disabled');
                            depositPercent.value = selectIndex;
                        }
                    });
                } else {
                    depositBank.style.display = 'none';
                    depositAmount.style.display = 'none';
                    depositAmount.value = '';
                    appData.deposit = 'false';
                }
            },

            // Запуск программы после нажатия "Рассчитать"
            start.addEventListener('click', this.start.bind(this)),

            // запуск сброса после нажатия "сбросить"
            cancel.addEventListener('click', this.reset),

            // Добавить ещё одну статью расходов
            expensesPlus.addEventListener('click', this.addExpensesBlock),

            // добавить ещё одну статью доходов
            incomePlus.addEventListener('click', this.addIncomeBlock),

            //ползунок меняет цифру
            periodSelect.addEventListener('input', this.getRange));

    }

}