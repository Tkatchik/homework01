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
    addExpenses: ['Собака, Машина, Путешесвия'],
    deposit: false,
    mission: 1000000000,
    period: 10,
    budgetDay: 0,
    budgetMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Собака, Машина, Путешесвия');
        appData.addExpenses = addExpenses.split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
        let getExpensesAmount = appData.getExpensesMonth();
        let getExpensesMonth;
        let sum = 0;
        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                appData.addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Собака');
            } else if (i === 1) {
                appData.addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Машина');
            } 
            let counter;
            do {
                counter = prompt('Во сколько это обойдётся?', 300);
            }
            while (isNaN(counter) || counter == '' || counter == null);

            sum += +counter;
        }
        return sum;
        const getAccumulatedMonth = function() {
            let accumulatedMonth = money - getExpensesAmount;
            return accumulatedMonth;
        };
        let getTargetMonth = function() {
            return Math.ceil(appData.mission / getAccumulatedMonth());
        };
        const getStatusIncome = function() {
            appData.budgetMonth = Math.floor(money - getExpensesAmount);
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
        };
    }
};


const showTypeof = function(item) {
    console.log(item, typeof item);
};



// console.log('Накопления за перид: ' + appData.getAccumulatedMonth() + ' руб.');

// console.log((appData.getTargetMonth() <= 0) ?
//   'Срок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');

//console.log(appData.getStatusIncome());

console.log('Бюджет на месяц составит: ' + appData.budgetMonth);
console.log('Бюджет на день составит: ' + appData.budgetDay);

showTypeof(money);
showTypeof(appData.income);
showTypeof(appData.deposit);