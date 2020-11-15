'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncome = document.getElementsByTagName('button')[0],
    btnExpenses = document.getElementsByTagName('button')[1],
    checkBox = document.getElementById('deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],  
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0], 
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0], 
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0], 
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], 
    targetMonthValue = document.getElementsByClassName('target_month-value')[0], 
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),    
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),    
    titlePeriodAmount = document.querySelector('.period-amount'),
    inputOff = document.querySelectorAll('.data input[type=text]'),
    depositBank =document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');    
    

let incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');


class AppData {

    constructor(){
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
    }

    start() {   
        if(!isNumber(depositPercent.value) || depositPercent.value.length > 10 && depositPercent.value.length < 0) {
            alert('Введите число в диапозоне от 1-100');
            depositPercent.value = 0;
            return;
        }
        
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
        
        this.getExpInc();           
        this.getExpensesMonth();                      
        this.getAddExpInc();
        this.getInfoDeposit();       
        this.getBudget();    
        this.calcPeriod();
        this.showResult();             
        
    }

    showResult(){
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
                
        
    }    

    addExpIncBlock() {
        const startStr = this.className.split(' ')[1].split('_')[0];
        let items = document.querySelectorAll(`.${startStr}-items`);
        const button = document.querySelector(`.${startStr}_add`);

        const clone = items[0].cloneNode(true);
        clone.querySelector(`.${startStr}-title`).value = '';
        clone.querySelector(`.${startStr}-amount`).value = '';

        items[0].parentNode.insertBefore(clone, button);
        items = document.querySelectorAll(`.${startStr}-items`);

        if (items.length === 3) {
            button.style.display = 'none';
        }
    }
    

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0],            
                itemTitle = item.querySelector(`.${startStr}-title`).value,
                itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== ''){                
                this[startStr][itemTitle] = itemAmount;                
                            
            }
        }

        incomeItem.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }   
    

    getAddExpInc() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    }
    
    getExpensesMonth(){        
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
            
        }    
          
    }

    getBudget() {     
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);    
        this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay =  Math.ceil(this.budgetMonth / 30);        
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
        
    }

    calcPeriod() {
    return this.budgetMonth * periodSelect.value;    
    } 

    getInfoDeposit() {
        if (addEvent.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
            
        }
        
    }

    changePercent() {
        const valueSelect = this.value;           
        if (valueSelect === 'other') { 
            depositPercent.value = '';  
            depositPercent.style.display = 'inline-block'; 
            
        } else {
            depositPercent.value = valueSelect;            
            depositPercent.style.display = 'none';
            
        }
        
    }    

    reboot(){

        const inputAll = document.querySelectorAll('input');
        inputAll.forEach( (item) => {
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
        depositBank.style.display = 'none';
        depositBank.value = '';
        depositAmount.style.display = 'none'; 
        depositPercent.style.display = 'none';
        checkBox.checked = false;
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
        
    }    

    

}

class AddEvent extends AppData{
    addEventListeners() {
        start.addEventListener('click', this.start.bind(appData));
        btnExpenses.addEventListener('click', this.addExpIncBlock);
        btnIncome.addEventListener('click', this.addExpIncBlock);            
        cancel.addEventListener('click', this.reboot.bind(appData));  
        checkBox.addEventListener('change', this.depositHandler.bind(this));           
        periodSelect.addEventListener('click', (e) => {
        titlePeriodAmount.innerHTML = periodSelect.value;       
        });       
            
        inputOff.forEach((elem) => {
            elem.addEventListener('keyup', (event) => {
                let target = event.target;
                if(target.matches('.income-title, .additional_income-item, .expenses-title, .additional_expenses-item')) {
                   elem.value = elem.value.replace(/[^а-яА-Я , . ; ' \: ]/g, '');
                }else{
                    elem.value = elem.value.replace(/[^0-9]/g, '');
                }
            });
            
        });

    } 

    depositHandler() {
        if (checkBox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';                       
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } 
        else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none'; 
            depositPercent.style.display = 'none';            
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    } 

}

const appData = new AppData();

const addEvent = new AddEvent();

addEvent.addEventListeners();



// salaryAmount.addEventListener('keyup', function(){
//     this.value = this.value.replace(/[^\d]/g, '');[0-9]/g, ''
// });/[^а-яА-Я , . ; ' \: ]/g, ''








