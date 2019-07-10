'use strict';

console.log(document.getElementById('start'));
let checkbox = document.querySelector('#savings');
let addExpenses = document.querySelectorAll('.additional_income-item');


let money,
    stringArray = [],
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 10000);
        } while (isNaN(money) || money == '' || money == null);
        console.log('Ваш месячный доход: ' + money + ' руб.');
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 10,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {

        if (confirm('Есть ли у Вас дополнительный заработок?')) {

            let itemIncome,
                cashIncome;

            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Копирайтинг');
            }
            while (Number(itemIncome) || itemIncome === '' || itemIncome === null);
            do {
                cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 1000);
            }
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Собака, Машина, Путешесвия');
        appData.addExpenses = addExpenses.toLowerCase().split(',');


        for (let i = 0; i < 2; i++) {

            let itemExpenses,
                cashExpenses;

            do {
                itemExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Собака');
            }
            while (Number(itemExpenses) || itemExpenses === '' || itemExpenses === null);

            do {
                cashExpenses = prompt('Во сколько это обойдется?', 150);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;
        }

        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    },

    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function() {
        appData.budgetMonth = Math.floor(money - appData.expensesMonth);
        appData.budgetDay = Math.floor(Number(appData.budgetMonth / 30));
    },

    getAccumulatedMonth: function() {
        return money - appData.getExpensesMonth;
    },

    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
        return appData.budgetMonth * appData.period;
    },

};

appData.asking();
appData.getTargetMonth();
appData.getExpensesMonth();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth + ' руб.');

console.log((appData.getTargetMonth() <= 0) ?
    'Срок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
console.log(appData.getStatusIncome());

for (let key in appData.income) {
    key = key.charAt(0).toUpperCase() + key.substring(1).toLowerCase();
    stringArray.push(key);
}

for (let key in appData.expenses) {
    key = key.charAt(0).toUpperCase() + key.substring(1).toLowerCase();
    stringArray.push(key);
}
console.log('Возможные доходы и расходы: ' + stringArray.join(', '));

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}