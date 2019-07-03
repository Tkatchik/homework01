'use strict';

let money,
    income = "Copyrighting",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Собака, Машина, Путешесвия'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000000,
    period = 10,
    budgetDay,
    budgetMonth,
    addExpenses1,
    addExpenses2;

console.log(addExpenses.split(','));

const start = function() {
    do {
        money = prompt('Ваш месячный доход?', 6000);
    } while (isNaN(money) || money == '' || money == null);
    money = +money;
};
start();

const showTypeof = function(item) {
    console.log(item, typeof item);
};

const getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Собака');
        } else if (i === 1) {
            addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Машина');
        } 

        let counter;
        do {
            counter = prompt('Во сколько это обойдётся?', 300);
        }
        while (isNaN(counter) || counter == '' || counter == null);

        sum += +counter;
    }
    return sum;
};

let getExpensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    let accumulatedMonth = money - getExpensesAmount;
    return accumulatedMonth;
};

let getTargetMonth = function() {
    return Math.ceil(mission / getAccumulatedMonth());
};

const getStatusIncome = function() {
    budgetMonth = Math.floor(money - getExpensesAmount);
    budgetDay = Math.floor(Number(budgetMonth / 30));

    switch (true) {
        case budgetDay >= 800:
            return ('Высокий уровень дохода');
        case budgetDay >= 300 && budgetDay < 800:
            return ('Средний уровень дохода');
        case budgetDay >= 0 && budgetDay < 300:
            return ('Низкий уровень дохода');
        default:
            return ('Что то пошло не так');
    }
};

console.log('Накопления за перид: ' + getAccumulatedMonth() + ' руб.');

console.log((getTargetMonth() <= 0) ?
    'Срок достижения цели: ' + getTargetMonth() + ' мес.' : 'Цель не будет достигнута');

console.log(getStatusIncome());

console.log('Бюджет на месяц составит: ' + budgetMonth);
console.log('Бюджет на день составит: ' + budgetDay);

showTypeof(money);
showTypeof(income);
showTypeof(deposit);