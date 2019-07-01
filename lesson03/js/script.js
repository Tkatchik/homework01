'use strict';

let money = prompt('Ваш месячный доход?'),
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
    costs1 = prompt('Во сколько это обойдется?'),
    addExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    costs2 = prompt('Во сколько это обойдется?');

console.log(addExpenses1, costs1, addExpenses2, costs2);

let budgetMonth = (money - costs1 - costs2);
console.log(budgetMonth, Math.floor(mission / budgetMonth));


let budgetDay = budgetMonth / 30;
console.log(Math.round(budgetDay));


switch (true) {
    case (budgetDay > 800):
        console.log('Высокий уровень дохода');
        break;

    case budgetDay > 300 < 800:
        console.log('Средний уровень дохода');
        break;

    case budgetDay > 0 < 300:
        console.log('Низкий уровень дохода');
        break;

    case budgetDay < 0:
        console.log('Что то пошло не так');

}