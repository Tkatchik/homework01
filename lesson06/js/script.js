'use strict';

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 6000);
        } while (isNaN(money) || money == '' || money == null);
        money = +money;
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
        appData.addExpenses = addExpenses.split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Собака')] =
                    prompt('Во сколько это обойдется?', '150');
            } else if (i === 1) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Машина')] =
                    prompt('Во сколько это обойдется?', '500');
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
        let accumulatedMonth = money - appData.getExpensesMonth;
        return accumulatedMonth;
    },

    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.getAccumulatedMonth());
    },

    getStatusIncome: function() {
        appData.budgetMonth = Math.floor(money - appData.getAccumulatedMonth);
        appData.budgetDay = Math.floor(Number(appData.budgetMonth / 30));

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

appData.asking(appData.addExpenses);
appData.getTargetMonth();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.getExpensesMonth() + ' руб.' + [appData.key]);
console.log((appData.getTargetMonth() <= 0) ?
    'Срок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
console.log(appData.getStatusIncome());

appData: function() {
        for (let key in appData)
            console.log('Наша программа включает в себя данные: '
            };