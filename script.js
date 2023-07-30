// script.js
class TransactionManager {
  constructor() {
    this.transactions = [];
    this.list = document.getElementById("list");
    this.balanceFigure = document.getElementById("balance");
    this.moneyPlus = document.getElementById("money-plus");
    this.moneyMinus = document.getElementById("money-minus");
    this.form = document.getElementById("form");
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.loadFromLocalStorage(); // Load data from local storage during initialization
    this.init();
  }

  init() {
    this.updateUI();
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = document.getElementById("text").value;
    const amount = document.getElementById("amount").value;
    this.addTransaction(text, amount);
    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
  }

  addTransaction(text, amount) {
    if (!text.trim() || !amount.trim()) {
      alert("Please enter an amount and the expense description");
      return;
    }

    const newTransaction = {
      id: Math.random(),
      text: text,
      amount: +amount,
    };

    this.transactions.push(newTransaction);
    this.updateUI();
    this.saveToLocalStorage(); // Save data to local storage after adding a new transaction
  }

  removeTransaction(id) {
    this.transactions = this.transactions.filter((el) => el.id !== id);
    this.updateUI();
    this.saveToLocalStorage(); // Save data to local storage after removing a transaction
  }

  updateUI() {
    this.list.innerHTML = "";
    this.transactions.forEach((transaction) => this.updateEachEl(transaction));
    this.updateAmounts();
  }

  updateEachEl(transaction) {
    const sign = transaction.amount > 0 ? "+" : "-";
    const className = transaction.amount > 0 ? "plus" : "minus";
    const item = document.createElement("li");
    item.classList.add(className);
    item.innerHTML = `
      ${transaction.text} <span>${sign} $${Math.abs(transaction.amount).toFixed(
      2
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
        X
      </button>`;
    this.list.appendChild(item);
  }

  updateAmounts() {
    const amounts = this.transactions.map((trans) => trans.amount);
    const balance = amounts.reduce((acc, cur) => (acc += cur), 0);
    const income = amounts
      .filter((num) => num >= 0)
      .reduce((acc, cur) => (acc += cur), 0);
    const expense = amounts
      .filter((num) => num < 0)
      .reduce((acc, cur) => (acc += cur), 0);

    this.balanceFigure.textContent = `$${balance.toFixed(2)}`;
    this.moneyPlus.textContent = `+$${income.toFixed(2)}`;
    this.moneyMinus.textContent = `-$${Math.abs(expense).toFixed(2)}`;
  }

  saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  loadFromLocalStorage() {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    }
  }
}

const app = new TransactionManager();

// let transactions = [];

// const removeFunction = function (id) {
//   transactions = transactions.filter((el) => el.id !== id);
//   const app = new App(transactions);
//   app.init();
// };

// class UpdateDom {
//   constructor(balance, income, expense) {
//     this.balance = balance;
//     this.income = income;
//     this.expense = expense;
//     this.balanceFigure = document.getElementById("balance");
//     this.money_plus = document.getElementById("money-plus");
//     this.money_minus = document.getElementById("money-minus");
//   }

//   updateDom() {
//     const toPositive = this.expense * -1;
//     this.balanceFigure.textContent = `$${this.balance}`;
//     this.money_plus.textContent = `$${this.income}`;
//     this.money_minus.textContent = `$${toPositive}`;
//   }
// }

// class UpdateUI {
//   constructor(array) {
//     this.array = array;
//     this.list = document.getElementById("list");
//     this.updateEachEl = this.updateEachEl.bind(this);
//   }

//   updateUI() {
//     this.list.innerHTML = "";
//     this.array.forEach(this.updateEachEl);
//   }

//   updateEachEl(el) {
//     const sign = el.amount > 0 ? "+" : "-";
//     const className = el.amount > 0 ? "plus" : "minus";
//     const item = document.createElement("li");
//     item.classList.add(className);
//     item.innerHTML = `
//       ${el.text} <span>${sign} ${Math.abs(el.amount)}</span>
//       <button class="delete-btn" onclick="removeFunction(${el.id})">
//       X
//       </button>`;
//     this.list.appendChild(item);
//   }
// }

// class UpdateAmounts {
//   constructor(transactionArray) {
//     this.transactionArray = transactionArray;
//   }

//   updateAmount() {
//     const amounts = this.transactionArray.map((trans) => trans.amount);
//     const balance = amounts.reduce((acc, cur) => (acc += cur), 0);
//     const income = amounts
//       .filter((num) => num >= 0)
//       .reduce((acc, cur) => (acc += cur), 0);
//     const expense = amounts
//       .filter((num) => num < 0)
//       .reduce((acc, cur) => (acc += cur), 0);

//     const updateDom = new UpdateDom(balance, income, expense);
//     updateDom.updateDom();
//   }
// }

// class TransactionManager {
//   constructor() {
//     this.transactions = [];
//     this.list = document.getElementById("list");
//   }

//   addTransaction(text, amount) {
//     if (!text.trim() || !amount.trim()) {
//       alert("Please enter an amount and the expense description");
//       return;
//     }

//     const newTransaction = {
//       id: Math.random(),
//       text: text,
//       amount: +amount,
//     };

//     this.transactions.push(newTransaction);
//     this.updateUI();
//   }

//   removeTransaction(id) {
//     this.transactions = this.transactions.filter((el) => el.id !== id);
//     this.updateUI();
//   }

//   updateUI() {
//     this.list.innerHTML = "";
//     this.transactions.forEach((transaction) => this.updateEachEl(transaction));
//     this.updateAmounts();
//   }

//   updateEachEl(el) {
//     const sign = el.amount > 0 ? "+" : "-";
//     const className = el.amount > 0 ? "plus" : "minus";
//     const item = document.createElement("li");
//     item.classList.add(className);
//     item.innerHTML = `
//       ${el.text} <span>${sign} ${Math.abs(el.amount)}</span>
//       <button class="delete-btn" onclick="removeFunction(${el.id})">
//       X
//       </button>`;
//     this.list.appendChild(item);
//   }
//   updateAmounts() {
//     // Same code as before
//   }
// }

// class App {
//   constructor(transactions) {
//     this.transactions = transactions;
//   }

//   init() {
//     const updateAmounts = new UpdateAmounts(this.transactions);
//     updateAmounts.updateAmount();
//     const update = new UpdateUI(this.transactions);
//     update.updateUI();
//   }
// }

// class Add extends App {
//   constructor() {
//     super();
//     this.form = document.getElementById("form");
//     this.text = document.getElementById("text");
//     this.amount = document.getElementById("amount");
//     this.form.addEventListener("submit", this.submit.bind(this));
//   }

//   submit(e) {
//     e.preventDefault();
//     if (!this.text.value.trim() || !this.amount.value.trim()) {
//       alert("please enter an amount and the expense description");
//     } else {
//       const newEl = {
//         id: Math.random(),
//         text: this.text.value,
//         amount: +this.amount.value,
//       };
//       transactions.push(newEl);
//       const app = new App(transactions);
//       app.init();
//       this.text.value = "";
//       this.amount.value = "";
//     }
//   }
// }

// new Add();
