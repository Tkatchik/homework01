'use strict';


let money,
    income = "Copyrighting",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000000,
    period = 10;

const start = function() {
    do {
        money = prompt('Ваш месячный доход?', '6000');
    } while (isNaN(money) || money === '' || money === null || money === 0);
    money = +money;
}
start();


console.log("Цель заработать " + mission + " Dollar");
console.log("Период " + period + " месяцев");
console.log(deposit, money, addExpenses.split(','));

let showTypeof = function(item) {
    console.log(item, typeof item);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        sum += +prompt('Во сколько это обойдется?', 300);
    }
    return (sum);
}
getExpensesMonth();

let budgetMonth = (money - (getExpensesMonth)),
    budgetDay = Math.floor(budgetMonth / 30);

for (let budgetDay = Math.floor(budgetMonth / 30); budgetDay < 0; budgetDay = 'Что то пошло не так') {
    console.log(budgetDay);
};
console.log(budgetMonth);

let accumulatedMonth = function(getAccumulatedMonth) {
    return mission / budgetMonth;
    console.log('accumulatedMonth(): ', accumulatedMonth());
};
accumulatedMonth();

function getTargetMonth() {
    return (money - (getExpensesMonth));
};
console.log(getTargetMonth);

for (getTargetMonth = (money - (getExpensesMonth)); getTargetMonth < 0; getTargetMonth = 'Что то пошло не так') {
    console.log(getTargetMonth);
};


console.log('Бюджет на месяц составит: ' + budgetMonth);
console.log('Бюджет на день составит: ' + budgetDay);

function getStatusIncome() {
    if (budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay < 800) {
        return ('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 300) {
        return ('Низкий уровень дохода');
    } else(budgetDay < 0); {
        return ('Что то пошло не так');
    }
}
console.log('getStatusIncome(): ', getStatusIncome());