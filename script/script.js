let money = 15000;
let income = 'подработка'; 
let addExpenses = 'Комуналка, интернет, бензин'; 
let deposit = true; 
let mission = 200000; 
let period = 10;


console.log(typeof money, income, deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать' + ' ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);


