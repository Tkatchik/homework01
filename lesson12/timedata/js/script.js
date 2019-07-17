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

console.log(typeof money, typeof income, typeof deposit);

let addExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    costs1 = +prompt('Во сколько это обойдется?'),
    addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    costs2 = +prompt('Во сколько это обойдется?');

let budgetMonth = (money - (costs1 + costs2)),
    budgetDay = Math.floor(budgetMonth / 30);

console.log('Бюджет на месяц составит: ' + budgetMonth);
console.log('Бюджет на день составит: ' + budgetDay);


switch (true) {
    case (budgetDay > 800):
        console.log('Высокий уровень дохода');
        break;

    case budgetDay > 300 && budgetDay < 800:
        console.log('Средний уровень дохода');
        break;

    case budgetDay > 0 && budgetDay < 300:
        console.log('Низкий уровень дохода');
        break;

    case budgetDay < 0:
        console.log('Что то пошло не так');

}