'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
    start = function() {
        do {
            money = +prompt('Введите ваш месячный доход?', 50000);
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 5,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    
    asking: function(){

        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome; 
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'сдаю цвет мет');
            }
            while(isNumber(itemIncome) || itemIncome.trim() === ''); 

            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);

            }
            while(!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;

        }

        let addExpensesFunc = function() {
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'газ свет вода бензин'); 
            let addData = addExpenses.trim();
            let x = '';
            for (let i = 0; i < addData.length; i++) {
                if (addData[i-1] === ' ' || i === 0){
                    x += addData[i].toUpperCase();
                }else{
                    x += addData[i];
                }
             };
             
            return x.split(' ').join(', ');
        }
        
        
        console.log(addExpensesFunc());
        
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let namber = 0;
        
            for (let i = 0; i < 2; i++) {

                let exp;
                do {
                    exp= prompt('Введите обязательную статью расходов?');
                }
                while(isNumber(exp) || exp.trim() === ''); 

                do {
                    namber = prompt('Во сколко это обойдется:');

                }
                while(!isNumber(namber));

                appData.expenses[exp] = namber;
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

    getInfoDeposit: function() {
        if(appData.deposit) {        
             
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.percentDeposit)); 

            
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

            }
            while(!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function() {
        return appData.budgetDay * appData.period;
    }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.targetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.targetMonth());
console.log(appData.getStatusIncome());

for (let key in appData){
    console.log('Наша программа содержит: ' + 'Ключ ' + key + ' Значение: ' + appData[key]);
};

