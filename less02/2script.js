let money = 60000,
    income = "Copyrighting",
    addExpenses = "Dog, Car, Traveling",
    deposit = true,
    mission = 1000000000,
    period = 20,
    budgetDay = money / 30;

console.log("Цель заработать " + mission + " Dollar", "Период " + period + " месяцев",
    typeof money, typeof income, typeof deposit, typeof budgetDay, budgetDay,
    income.length, addExpenses.toLowerCase(), addExpenses.split(','), money % 30);