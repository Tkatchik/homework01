'use strict';

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 6000);
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
    mission: 1000000000,
    period: 10,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Собака, Машина, Путешесвия');
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        for (let i = 0; i < 2; i++) {

            let validPrice = function() {
                let count;
                do {
                    count = prompt('Во сколько это обойдется?', 150);
                }
                while (isNaN(count) || count == '' || count == null);
                return count;
            };

            if (i === 0) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Собака')] = validPrice();

            } else if (i === 1) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Машина')] = validPrice();
            } 
        }
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

};

appData.asking();
appData.getTargetMonth();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth + ' руб.');

console.log((appData.getTargetMonth() <= 0) ?
    'Срок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);

}