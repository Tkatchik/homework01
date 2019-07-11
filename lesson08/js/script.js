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

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getBudget();
        //они идут по порядку исполнения

        appData.showResult();
        //он всегда идёт последним
    },

    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.floor(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        appData.blockInput();
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
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
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function() {
        incomeItems.forEach(function(item) {

            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                cashIncome = +cashIncome;
                appData.income[itemIncome] = cashIncome;
            }
            for (let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }
        });
    },

    getAddExpenses: function() {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function() {
        addIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth, //в эту строку нужно будет добавить за Максимом
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },

    getStatusIncome: function() {
        switch (true) {
            case appData.budgetDay >= 800:
                return ('Высокий уровень дохода');
            case appData.budgetDay >= 300 && appData.budgetDay < 800:
                return ('Средний уровень дохода');
            case appData.budgetDay >= 0 && appData.budgetDay < 300:
                return ('Низкий уровень дохода');
            default:
                return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
        }
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
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
    }

};

// Запуск программы после нажатия "Рассчитать"
start.addEventListener('click', appData.start);

// Добавить ещё одну статью расходов
expensesPlus.addEventListener('click', appData.addExpensesBlock);

// добавить ещё одну статью доходов
incomePlus.addEventListener('click', appData.addIncomeBlock);

//ползунок меняет цифру
periodSelect.addEventListener('input', appData.getRange);