let money = 60000,
    income = "Copyrighting",
    addExpenses = "Dog, Car, Traveling",
    deposit = true,
    mission = 1000000000,
    period = 10,
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit, typeof budgetDay, budgetDay,
    income.length, money % 30);

console.log(addExpenses.toLowerCase().split(','));

console.log("Цель заработать " + mission + " Dollar");

console.log("Период " + period + " месяцев");