'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};


let start = document.getElementById('start');
let btnIncome = document.getElementsByTagName('button')[0];
let btnExpenses = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];  
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; 
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; 
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; 
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; 
let targetMonthValue = document.getElementsByClassName('target_month-value')[0]; 
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-items .expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let titlePeriodAmount = document.querySelector('.period-amount');


let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,    
    period: 5,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,    
    start: function() {         

        appData.budget = +salaryAmount.value;

        appData.getExpenses();   
        appData.getIncome();       
        appData.getExpensesMonth();                
        appData.getAddExpenses();
        appData.getAddIncome();        
        appData.getBudget();
        
        appData.getPeriod();
        
        
        
        
         
        appData.showResult(); 
        // appData.getTargetMonth();
        // appData.targetMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit();
    },

    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.addEventListener('change', appData.getPeriod);        

    },

    getPeriod: function() {
        let period = periodSelect.value;
        titlePeriodAmount.textContent = +period;  
        incomePeriodValue.value = period * appData.budgetMonth;        
        
    },   

    addExpensesBlock: function() {        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            btnExpenses.style.display = 'none';
        }
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            btnIncome.style.display = 'none';
        }
    },


    getIncome: function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        }) ;  
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        };

    },        
    

    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },       

    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses){
            sum += +appData.expenses[key];
            
        }
        
        return appData.expensesMonth = sum;
    },

    getBudget: function() {        
        appData.budgetMonth = +appData.budget + appData.incomeMonth - +appData.expensesMonth;
        appData.budgetDay =  Math.ceil(+appData.budgetMonth / 30);        
    },

    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
    
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

};







let startOn = function(){
    start.addEventListener('click', appData.start);
    if (salaryAmount !== '' || salaryAmount.value !== ''){
        return
    } else{
    start.disabled = true;
}
};

startOn();
btnExpenses.addEventListener('click', appData.addExpensesBlock);
btnIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('click', appData.getPeriod);









