class UpdateDom {
  constructor(balance, income, expense) {
    this.balance = balance;
    this.income = income;
    this.expense = expense;
    this.balanceFigure = document.getElementById("balance");
    this.money_plus = document.getElementById("money-plus");
    this.money_minus = document.getElementById("money-minus");
  }

  updateDom() {
    const toPositive = this.expense * -1;
    this.balanceFigure.textContent = `$${this.balance}`;
    this.money_plus.textContent = `$${this.income}`;
    this.money_minus.textContent = `$${toPositive}`;
  }
}
class UpdateUI {
  constructor(array) {
    this.array = array;
    this.list = document.getElementById("list");
    this.updateEachEl = this.updateEachEl.bind(this);
  }

  updateUI() {
    this.list.innerHTML = "";
    this.array.forEach(this.updateEachEl);
  }

  updateEachEl(el) {
    const sign = el.amount > 0 ? "+" : "-";
    const className = el.amount > 0 ? "plus" : "minus";
    const item = document.createElement("li");
    item.classList.add(className);
    item.innerHTML = `
      ${el.text} <span>${sign} ${Math.abs(el.amount)}</span>
      <button class="delete-btn" onclick="DeleteClass.removeFunction(${el.id})">
      X
      </button>`;
    this.list.appendChild(item);
  }
}
class UpdateAmounts {
  constructor(transactionArray) {
    this.transactionArray = transactionArray;
  }

  updateAmount() {
    const amounts = this.transactionArray.map((trans) => trans.amount);
    const balance = amounts.reduce((acc, cur) => (acc += cur), 0);
    const income = amounts
      .filter((num) => num >= 0)
      .reduce((acc, cur) => (acc += cur), 0);
    const expense = amounts
      .filter((num) => num < 0)
      .reduce((acc, cur) => (acc += cur), 0);

    const updateDom = new UpdateDom(balance, income, expense);
    updateDom.updateDom();
  }
}
class Add {
  constructor() {
    this.form = document.getElementById("form");
    this.text = document.getElementById("text");
    this.amount = document.getElementById("amount");
    this.list = document.getElementById("list");
    this.form.addEventListener("submit", this.submit.bind(this));
  }

  submit(e) {
    e.preventDefault();
    const transactions = SetToLocalStorage.getFromLocalStorage();
    if (!this.text.value.trim() || !this.amount.value.trim()) {
      alert("please enter an amount and the expense description");
    } else {
      const newEl = {
        id: Math.random(),
        text: this.text.value,
        amount: +this.amount.value,
      };
      transactions.push(newEl);
      SetToLocalStorage.setToLocalStorage(transactions);
      const updateAmounts = new UpdateAmounts(transactions);
      updateAmounts.updateAmount();
      const update = new UpdateUI(transactions);
      update.updateUI();
      this.text.value = "";
      this.amount.value = "";
    }
  }
}
class DeleteClass {
  static removeFunction(id) {
    const saved = localStorage.getItem("transactions");
    const parsed = JSON.parse(saved);
    const filtered = parsed.filter((el) => el.id !== id);
    SetToLocalStorage.setToLocalStorage(filtered);
    const updateAmounts = new UpdateAmounts(filtered);
    updateAmounts.updateAmount();
    const update = new UpdateUI(filtered);
    update.updateUI();
  }
}
class SetToLocalStorage {
  static setToLocalStorage(array) {
    localStorage.setItem("transactions", JSON.stringify(array));
  }

  static getFromLocalStorage() {
    const storedTransactions = localStorage.getItem("transactions")
      ? localStorage.getItem("transactions")
      : [];
    return JSON.parse(storedTransactions);
  }
}
class App {
  init() {
    new Add();
    const transactions = SetToLocalStorage.getFromLocalStorage();
    const updateAmounts = new UpdateAmounts(transactions);
    updateAmounts.updateAmount();
    const update = new UpdateUI(transactions);
    update.updateUI();
  }
}

const app = new App();
app.init();
