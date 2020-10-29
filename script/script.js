'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let start = document.getElementById('start');
let cancel = document.getElementById('cancel');
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
let inputOff = document.querySelectorAll('.data input[type=text]');

const AppData = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;    
    this.period = 5;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;  

};

AppData.prototype.start = function() {         
    if(salaryAmount.value !== ''){
        inputOff.forEach(function (item) {
            item.setAttribute('disabled', 'true');
        });
    }else{
        return;
    }
    btnExpenses.setAttribute('disabled', 'true');
    btnIncome.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';
    btnIncome.style.cursor = 'none';   

    this.budget = +salaryAmount.value;
    
    this.getExpenses();   
    this.getIncome();       
    this.getExpensesMonth();                
    this.getAddExpenses();
    this.getAddIncome();        
    this.getBudget();    
    this.calcPeriod();
    this.showResult(); 

};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');        
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function() {
        incomePeriodValue.value = _this.calcPeriod();
    }); 
        

}; 

AppData.prototype.addExpensesBlock = function() {        
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-amount').value=''; 
    cloneExpensesItem.querySelector('.expenses-title').value=''; 
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');        
    if(expensesItems.length === 3){
        btnExpenses.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){        
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;            
        if(itemExpenses !== '' && cashExpenses !== ''){                
            _this.expenses[itemExpenses] = cashExpenses;

        }
    });
};

AppData.prototype.addIncomeBlock = function(){            
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value=''; 
    cloneIncomeItem.querySelector('.income-amount').value='';                         
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
    incomeItem = document.querySelectorAll('.income-items');               
    if(incomeItem.length === 3){
        btnIncome.style.display = 'none';
    }        
    
          
};


AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItem.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){                
            _this.income[itemIncome] = cashIncome;                
            
        }
        
    }) ;  
    for (let key in this.income){
        this.incomeMonth += +this.income[key];
    }

};        


AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};       

AppData.prototype.getExpensesMonth = function(){        
    for (let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
        
    }    
  
};

AppData.prototype.getBudget = function() {        
    this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth;
    this.budgetDay =  Math.ceil(this.budgetMonth / 30);        
};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;

};   

AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay >=1200) {
        return ('У вас высокий уровень дохода!');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода!');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего!');
    } else {
        return ('Что-то пошло не так!');
    }
};

AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {        
         
        do {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
        }
        while(!isNumber(this.percentDeposit)); 

        
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);

        }
        while(!isNumber(this.moneyDeposit));
    }
}; 

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reboot = function(){

    let inputAll = document.querySelectorAll('input');
    inputAll.forEach(function(item){
        item.value = '';
        item.removeAttribute('disabled');
        periodSelect.value = '0';           
        titlePeriodAmount.textContent = periodSelect.value;
    });

    for (let i = 1; i<expensesItems.length; i++){
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        
        }

    for (let i = 1; i<incomeItem.length; i++){
        incomeItem[i].parentNode.removeChild(incomeItem[i]);            
    }
    btnExpenses.style.display = 'block';    
    btnIncome.style.display = 'block';



    btnExpenses.removeAttribute('disabled');
    btnIncome.removeAttribute('disabled');
    start.style.display = 'block';
    cancel.style.display = 'none';
            
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;    
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

};



const appData = new AppData();



start.addEventListener('click', appData.start.bind(appData));
btnExpenses.addEventListener('click', appData.addExpensesBlock);
btnIncome.addEventListener('click', appData.addIncomeBlock);
cancel.addEventListener('click', appData.reboot.bind(appData));
periodSelect.addEventListener('click', function(){
    titlePeriodAmount.innerHTML = periodSelect.value;
});





