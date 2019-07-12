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

    periodSelect = document.querySelector('.period-select'), //накопления за период
    periodAmount = document.querySelector('.period-amount'); //ползунок

let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function() {

        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'disabled');
            return;
        }

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        //они идут по порядку исполнения
        this.showResult();
        //он всегда идёт последним
    },

    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        this.blockInput();
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appthisData.calcSavedMoney();
        });

    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    addIncomeBlock: function() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function(item) {

            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                cashExpenses = +cashExpenses;
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function() {
        incomeItems.forEach(function(item) {

            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                cashIncome = +cashIncome;
                this.income[itemIncome] = cashIncome;
            }
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        });
    },

    getAddExpenses: function() {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function() {
        addIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth, //в эту строку нужно будет добавить за Максимом
            this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },

    getStatusIncome: function() {
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
    },

    getInfoDeposit: function() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
        }
    },

    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },

    getRange: function() {
        periodAmount.innerText = periodSelect.value;
    },

    blockInput: function() {
        document.querySelectorAll('.data input[type=text]').forEach(function(item) {
            item.disabled = true;
        });

        start.style.display = 'none';
        cancel.style.display = 'block';
    },

    reset: function() {
        document.location.reload(true);
    }

};

// Запуск программы после нажатия "Рассчитать"
start.addEventListener('click', TouchList.start);

// запуск сброса после нажатия "сбросить"
cancel.addEventListener('click', this.reset);

// Добавить ещё одну статью расходов
expensesPlus.addEventListener('click', this.addExpensesBlock);

// добавить ещё одну статью доходов
incomePlus.addEventListener('click', this.addIncomeBlock);

//ползунок меняет цифру
periodSelect.addEventListener('input', this.getRange);