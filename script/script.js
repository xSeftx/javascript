'use strict';

let money = +prompt('Ваш месячный доход?');
const income = 'подработка'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?'); 
const mission = 200000; 
const period = 10;
let firstExpenses = prompt('Введите обязательную статью расходов?');
let firstPrice = +prompt('Во сколько это обойдется?');
let secondExpenses = prompt('Введите обязательную статью расходов?');
let secondPrice = +prompt('Во сколько это обойдется?');
let budgetMonth = money - (firstPrice + secondPrice);  //тут идет подсчет 'Буджет на месяц'.
let missionMonth = mission / budgetMonth;   //создал дополнительную переменную чтобы результат вычеслений можно было округлить.
let budgetDay = budgetMonth / 30;

console.log(typeof money, income, deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать' + ' ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Буджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(missionMonth) + ' месяцев');
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay >=1200) {
    console.log('У вас высокий уровень дохода!');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода!');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего!');
} else {
    console.log('Что-то пошло не так!');
}



