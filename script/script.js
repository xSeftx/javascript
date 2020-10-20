'use strict';

// let isNumber = function (n) {
//     return !isNaN(parseFloat(n)) && isFinite(n)
// };

// let money,
//     start = function() {
//         do {
//             money = +prompt('Введите ваш месячный доход?', 50000);
//         } 
//         while(isNaN(parseFloat(money)));
    
//         return money;
//     };

// start();

// let appData = {
//     income: {},
//     addIcome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 50000,
//     period: 5,
//     budget: money,
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
    
//     asking: function(){

//         if(confirm('Есть ли у вас дополнительный источник заработка?')) {
//             let itemIncome; 
//             do {
//                 itemIncome = prompt('Какой у вас дополнительный заработок?', 'сдаю цвет мет');
//             }
//             while(isNumber(itemIncome) || itemIncome.trim() === ''); 

//             let cashIncome;
//             do {
//                 cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);

//             }
//             while(!isNumber(cashIncome));

//             appData.income[itemIncome] = cashIncome;

//         }

//         let addExpensesFunc = function() {
//             let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ свет вода бензин'); 
//             let addData = addExpenses.trim();
//             let x = '';
//             for (let i = 0; i < addData.length; i++) {
//                 if (addData[i-1] === ' ' || i === 0){
//                     x += addData[i].toUpperCase();
//                 }else{
//                     x += addData[i];
//                 }
//              };
             
//             return x.split(' ').join(', ');
//         }
        
        
//         console.log(addExpensesFunc());
        
//             appData.deposit = confirm('Есть ли у вас депозит в банке?');
//         let namber = 0;
        
//             for (let i = 0; i < 2; i++) {

//                 let exp;
//                 do {
//                     exp= prompt('Введите обязательную статью расходов?');
//                 }
//                 while(isNumber(exp) || exp.trim() === ''); 

//                 do {
//                     namber = prompt('Во сколко это обойдется:');

//                 }
//                 while(!isNumber(namber));

//                 appData.expenses[exp] = namber;
//             } 
//     },

//     getExpensesMonth: function(){
//         let sum = 0;
//         for (let key in appData.expenses){
//             sum += +appData.expenses[key];
            
//         }
        
//         return appData.expensesMonth = sum;
//     },

//     getBudget: function() {        
//         appData.budgetMonth = +appData.budget - +appData.expensesMonth;
//         appData.budgetDay =  Math.ceil(+appData.budgetMonth / 30);        
//     },

//     getTargetMonth: function() {
//         return Math.ceil(appData.mission / appData.budgetMonth);
//     },

//     targetMonth: function () {
//         if (Math.ceil(appData.getTargetMonth()) > 0) {
//             return ('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
//         } else {
//             return ('Цель не будет достигнута!');
//         }
//     },

//     getStatusIncome: function(){
//         if (appData.budgetDay >=1200) {
//             return ('У вас высокий уровень дохода!');
//         } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//             return ('У вас средний уровень дохода!');
//         } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
//             return ('К сожалению у вас уровень дохода ниже среднего!');
//         } else {
//             return ('Что-то пошло не так!');
//         }
//     },

//     getInfoDeposit: function() {
//         if(appData.deposit) {        
             
//             do {
//                 appData.percentDeposit = prompt('Какой годовой процент?', 10);
//             }
//             while(!isNumber(appData.percentDeposit)); 

            
//             do {
//                 appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

//             }
//             while(!isNumber(appData.moneyDeposit));
//         }
//     },

//     calcSavedMoney: function() {
//         return appData.budgetDay * appData.period;
//     }

// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.targetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();

// console.log('Расходы за месяц: ' + appData.expensesMonth);
// console.log(appData.targetMonth());
// console.log(appData.getStatusIncome());

let buttonStart = document.getElementById('start');
console.log(buttonStart);

let btnIncome = document.getElementsByTagName('button')[0];
console.log(btnIncome);

let btnExpenses = document.getElementsByTagName('button')[1];
console.log(btnExpenses);

let checkBox = document.querySelector('#deposit-check');
console.log(checkBox);

let additionalIncomeOne = document.querySelectorAll('.additional_income-item')[0];
console.log(additionalIncomeOne );

let additionalIncomeTwo = document.querySelectorAll('.additional_income-item')[1];
console.log(additionalIncomeTwo);

let budgetMonth = document.getElementsByClassName('budget_month-value'); 
console.log(budgetMonth);

let budgetDay = document.getElementsByClassName('budget_day-value');   
console.log(budgetDay);

let expensesMonth = document.getElementsByClassName('expenses_month-value');  
console.log(expensesMonth);

let additionalIncome = document.getElementsByClassName('additional_income-value'); 
console.log(additionalIncome);

let additionalExpenses = document.getElementsByClassName('additional_expenses-value'); 
console.log(additionalExpenses);

let incomePeriod = document.getElementsByClassName('income_period-value'); 
console.log(incomePeriod);

let targetMonth = document.getElementsByClassName('target_month-value'); 
console.log(targetMonth);

let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

let incomeTitle = document.querySelector('.income-items .income-title');
console.log(incomeTitle);

let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

let expensesTitle = document.querySelector('.expenses-items .expenses-title');
console.log(expensesTitle);

let expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

let periodSelect = document.querySelector('[type=range]');
console.log(periodSelect);



// for (let key in appData){
//     console.log('Наша программа содержит: ' + 'Ключ ' + key + ' Значение: ' + appData[key]);
// };