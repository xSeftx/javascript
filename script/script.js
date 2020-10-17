'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
    start = function() {
        do {
            money = +prompt('Введите ваш месячный доход?');
        } 
        while(isNaN(parseFloat(money)));
    
        return money;
    };

start();

let appData = {
    income: {},
    addIcome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 10,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let namber = 0;
        let exp = [];
            for (let i = 0; i < 2; i++) {
                exp[i] = prompt('Введите обязательную статью расходов?');

                do {
                    namber = prompt('Во сколко это обойдется:');

                }
                while(!isNumber(namber));
                appData.expenses[exp[i]] = namber;
            } 
    },

    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses){
            sum += +appData.expenses[key];
            
        }
        
        return appData.expensesMonth = sum;
    },

    getBudget: function() {        
        appData.budgetMonth = +appData.budget - +appData.expensesMonth;
        appData.budgetDay =  Math.ceil(+appData.budgetMonth / 30);        
    },

    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },

    targetMonth: function () {
        if (Math.ceil(appData.getTargetMonth()) > 0) {
            return ('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
        } else {
            return ('Цель не будет достигнута!');
        }
    },

    getStatusIncome: function(){
        if (appData.budgetDay >=1200) {
            return ('У вас высокий уровень дохода!');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода!');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего!');
        } else {
            return ('Что-то пошло не так!');
        }
    },


};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.targetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.targetMonth());
console.log(appData.getStatusIncome());

for (let key in appData){
    console.log('Наша программа содержит: ' + 'Ключ ' + key + ' Значение: ' + appData[key]);
};
