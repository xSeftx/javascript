'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncome = document.getElementsByTagName('button')[0],
    btnExpenses = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
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
    inputOff = document.querySelectorAll('.data input[type=text]');

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

    addExpensesBlock() {        
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-amount').value=''; 
            cloneExpensesItem.querySelector('.expenses-title').value=''; 
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
            expensesItems = document.querySelectorAll('.expenses-items');        
            if(expensesItems.length === 3){
                btnExpenses.style.display = 'none';
            }
    }

    getExpenses(){            
            expensesItems.forEach((item) => {        
                const itemExpenses = item.querySelector('.expenses-title').value;
                const cashExpenses = item.querySelector('.expenses-amount').value;            
                if(itemExpenses !== '' && cashExpenses !== ''){                
                    this.expenses[itemExpenses] = cashExpenses;
        
                }
            });
    }

    addIncomeBlock(){            
            const cloneIncomeItem = incomeItem[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-title').value=''; 
            cloneIncomeItem.querySelector('.income-amount').value='';                         
            incomeItem[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
            incomeItem = document.querySelectorAll('.income-items');               
            if(incomeItem.length === 3){
                btnIncome.style.display = 'none';
            }        
            
                    
    }

    getIncome(){            
            incomeItem.forEach((item) => {
                const itemIncome = item.querySelector('.income-title').value;
                const cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== ''){                
                    this.income[itemIncome] = cashIncome;                
                    
                }
                
            }) ;  
            for (let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        
    }

    getAddExpenses(){            
            const addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if (item !== ''){
                    this.addExpenses.push(item);
                }
            });
    }
    
    getAddIncome(){            
            additionalIncomeItem.forEach((item) => {
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
    }
    
    getExpensesMonth(){        
            for (let key in this.expenses){
                this.expensesMonth += +this.expenses[key];
                
            }    
          
    }

    getBudget() {        
            this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth;
            this.budgetDay =  Math.ceil(this.budgetMonth / 30);        
    }

    getTargetMonth() {
            return targetAmount.value / this.budgetMonth;
        
    }

    calcPeriod() {
    return this.budgetMonth * periodSelect.value;
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
            btnExpenses.addEventListener('click', this.addExpensesBlock);
            btnIncome.addEventListener('click', this.addIncomeBlock);
            cancel.addEventListener('click', this.reboot.bind(appData));
            periodSelect.addEventListener('click', (e) => {
            titlePeriodAmount.innerHTML = periodSelect.value;
        });
        } 
}

const appData = new AppData();

const addEvent = new AddEvent();

addEvent.addEventListeners();




