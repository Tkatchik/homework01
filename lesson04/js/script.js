'use strict';

let money = +prompt('Ваш месячный доход?'),
    income = "Copyrighting",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000000,
    period = 10;

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
    costs1 = +prompt('Во сколько это обойдется?'),
    addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    costs2 = +prompt('Во сколько это обойдется?');

let budgetMonth = (money - (costs1 + costs2)),
    budgetDay = Math.floor(budgetMonth / 30);

function getExpensesMonth() {
    return costs1 + costs2;
}
console.log('getExpensesMonth ', getExpensesMonth());

let accumulatedMonth = function(getAccumulatedMonth) {
    return mission / budgetMonth;
};
console.log('accumulatedMonth(): ', accumulatedMonth());

function getTargetMonth() {
    return (money - (costs1 + costs2));
};
console.log('getTargetMonth(): ', getTargetMonth());


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