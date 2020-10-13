'use strict';

let money = +prompt('Ваш месячный доход?', 30000);
const income = 'подработка'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?'); 
const mission = 200000; 
const period = 10;
let firstExpenses = prompt('Введите обязательную статью расходов?', 'бензин');
let firstPrice = +prompt('Во сколько это обойдется?', 3000);
let secondExpenses = prompt('Введите обязательную статью расходов?', 'свет');
let secondPrice = +prompt('Во сколько это обойдется?', 1600);
let budgetDay = accumulatedMonth / 30;
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function(a=firstPrice, b=secondPrice) {
    return a + b;
};

console.log(addExpenses.toLowerCase().split(', '));

let getAccumulatedMonth = function(profit=money, expense=getExpensesMonth()) {
    return profit - expense;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(task=mission, ability=accumulatedMonth) {
    return task / ability;
};

console.log('Цель будет достигнута за: ' + Math.ceil(getTargetMonth()) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));

let getStatusIncome = function(){
    if (budgetDay >=1200) {
        return ('У вас высокий уровень дохода!');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода!');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего!');
    } else {
        return ('Что-то пошло не так!');
    }
};


console.log(getStatusIncome());



