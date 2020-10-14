'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money
const income = 'подработка'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?'); 
const mission = 200000; 
const period = 10;

let start = function() {
    do {
        money = prompt('Введите ваш месячный доход?');
    } 
    while(isNaN(parseFloat(money)));
    
    return money;
};

start();

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

let expenses1, expenses2;

let getExpensesMonth = function() {
    let sum = 0;
    let namber
    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            expenses1 = prompt('Введите обязательную статью расходов?', 'бензин');            
        } else if (i === 1) {
            expenses2 = prompt('Введите обязательную статью расходов?', 'свет');
        }
        do {
            namber = prompt('Во сколько это обойдется'); 

        }
        while(!isNumber(namber));
        sum += +namber;
              
    }
    
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(task=mission, ability=accumulatedMonth) {
    return task / ability;
};

let targetMonth = function () {
    if (Math.ceil(getTargetMonth()) > 0) {
        return ('Цель будет достигнута за: ' + Math.ceil(getTargetMonth()) + ' месяцев');
    } else {
        return ('Цель не будет достигнута!');
    }
    
};
console.log(targetMonth());
let budgetDay = accumulatedMonth / 30;
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


