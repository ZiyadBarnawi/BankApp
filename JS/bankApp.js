"use strict";

//******************************users******************************


let user1 = {
  username: "Ziad",
  password: 1234,

  transactions: [
    [100, "2/7/2024"],
    [-500, "3/7/2024"],
    [200, "3/7/2024"],
    [-600, "5/7/2024"],
    [300, "5/7/2024"],
    [1000, "5/7/2024"]
  ],

  getBalance: function () {
    return this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0);
  }
};
let user2 = {
  username: "Said",
  password: 1234,
  transactions: [
    [800, "7/7/2024"],
    [900, "9/7/2024"],
    [-250, "10/7/2024"],
    [-200, "10/7/2024"],
    [900, "11/7/2024"]
  ],
  getBalance: function () {
    return this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0);
  }
};

let user3 = {
  username: "Hussam",
  password: 1234,
  transactions: [
    [-750, "1/7/2024"],
    [200, "3/7/2024"],
    [3000, "8/7/2024"],
    [200, "10/7/2024"],
  ],
  getBalance: function () {
    return this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0);
  }
};

let user4 = {
  username: "Hassan",
  password: 1234,
  transactions: [
    [900, "5/7/2024"],
    [2500, "2/7/2024"],
    [100, "7/7/2024"],
    [-490, "10 /7/2024"],
  ],
  getBalance: function () {
    return this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0);
  }
};

//******************************Global variables******************************
let users = [user1, user2, user3, user4];
let currUser = [];
let date = new Date();

//******************************inputs******************************
let accName = document.querySelector(".account-name");
let accPassword = document.querySelector(".password");
let loanInput = document.querySelector(".loan-amount");
let transferInput = document.querySelector(".transfer-amount");
let to = document.querySelector(".to");

//******************************buttons******************************
let transferBtn = document.querySelector(".transfer-btn");
let loanBtn = document.querySelector(".loan-btn");
let closeAccountBtn = document.querySelector(".aclose-account-btn");

//******************************divs and the like******************************
let transactionsDiv = document.querySelector(".transactions");
let summaryIn = document.querySelector(".summary-in");
let summaryout = document.querySelector(".summary-out");
let summaryInterest = document.querySelector(".summary-interest");
let welcomeMessage = document.querySelector(".welcome");
let todayDate = document.querySelector(".date");

//******************************functions******************************

const displayTransaction = function (user) {
  transactionsDiv.innerHTML = "";
  for (let transaction of user.transactions) {
    if (transaction[2] == "in-transfer") {
      let html = `
                    <div class="transaction in-transfer">
                    <div class="type-and-date-div">
                    <div class="transaction-type">Transfer</div>
                    <div class="transaction-date">${transaction[1]}</div>
                    </div>

                    <div class="transaction-amount">${
                      transaction[0] + "$"
                    }</div>
                    </div>`;

      transactionsDiv.insertAdjacentHTML("afterbegin", html);
    } else if (transaction[2] == "out-transfer") {
      let html = `
                    <div class="transaction out-transfer">
                    <div class="type-and-date-div">
                    <div class="transaction-type">Transfer</div>
                    <div class="transaction-date">${transaction[1]}</div>
                    </div>

                    <div class="transaction-amount">${
                      transaction[0] + "$"
                    }</div>
                    </div>`;

      transactionsDiv.insertAdjacentHTML("afterbegin", html);
    } else if (transaction[0] > 0) {
      let html = `
                    <div class="transaction deposite">
                    <div class="type-and-date-div">
                    <div class="transaction-type">Deposite</div>
                    <div class="transaction-date">${transaction[1]}</div>
                    </div>

                    <div class="transaction-amount">${
                      transaction[0] + "$"
                    }</div>
                    </div>`;

      transactionsDiv.insertAdjacentHTML("afterbegin", html);
    } else {
      let html = `
                    <div class="transaction withdraw">
                    <div class="type-and-date-div">
                    <div class="transaction-type">Withdraw</div>
                    <div class="transaction-date">${transaction[1]}</div>
                    </div>

                    <div class="transaction-amount">${
                      transaction[0] + "$"
                    }</div>
                    </div>`;

      transactionsDiv.insertAdjacentHTML("afterbegin", html);
    }
  }

  displaySummary(user);
};

const displaySummary = function (user) {
  let allTransactions = [];
  for (let transaction of user.transactions) {
    allTransactions.push(transaction[0]);
  }
  let inTransactions = allTransactions.filter(function (transaction) {
    return transaction > 0;
  });
  let outTransactions = allTransactions.filter(function (transaction) {
    return transaction < 0;
  });
  inTransactions = inTransactions
    .filter(function (cur) {
      return cur * (1.2 / 100) > 1;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
  outTransactions = outTransactions.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  summaryIn.textContent = `IN: ${inTransactions + "$"}`;
  summaryout.textContent = `OUT: ${outTransactions + "$"}`;
  summaryInterest.textContent = `INTEREST ${(inTransactions * 1.2) / 100}`;
};

const checkLogInInfo = function () {
  let accountName = document.querySelector(".account-name").value;
  let password = document.querySelector(".password").value;
  let divs = document?.querySelectorAll(".hide");

  for (let user of users) {
    if (user.username === accountName && user.password === Number(password)) {
      if (divs == []) {
        let mainText = document.querySelector(".main-text");
        let mainGrid = document.querySelector(".main-grid");
        let summary = document.querySelector(".summary");
        welcomeMessage.innerHTML = `Welcome back ${user.username}`;
        currUser.push(user);
        todayDate.textContent = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;

        displayTransaction(user);
        accName.blur();
        accPassword.blue();
        accName.value = "";
        accPassword.value = "";
        // user.getBalance()

        return;
      }

      divs[0]?.classList?.toggle("hide");
      divs[0]?.classList?.toggle("main-text");
      divs[1]?.classList?.toggle("hide");
      divs[1]?.classList?.toggle("main-grid");
      divs[2]?.classList?.toggle("hide");
      divs[2]?.classList?.toggle("summary");
      document.querySelector(".balance").innerHTML = user.getBalance() + "$";
      todayDate.textContent = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      for (let transaction of user.transactions) {
      }
      welcomeMessage.innerHTML = `Welcome back ${user.username}`;
      currUser.push(user);
      displayTransaction(user);
      accName.blur();
      accPassword.blur();
      accName.value = "";
      accPassword.value = "";
      // user.getBalance()

      return;
    }
  }
  window.alert("Wrong password or username");
};

const transfer = function (currUser, to, amount) {
  let transaction = [
    Number(-amount),
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    "out-transfer",
  ];
  currUser.transactions?.push(transaction);

  to = users.find(function (user) {
    return user.username === to.value;
  });
  if (to === undefined) {
    window.alert("Check the username again");
    return;
  }
  if (amount > currUser.getBalance()) {
    window.alert("You can't transfer more than you have");
    return;
  }
  to.transactions.push([
    Number(amount),
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    "in-transfer",
  ]);
  

  refreshData(currUser);
  window.alert(`The transaction was successful`);
};

let addTransferEvent = function () {
  transferBtn.addEventListener(
    "click",
    transfer(currUser[0], to, transferInput.value)
  );
};

const refreshData = function (user) {
  displayTransaction(user);
  displaySummary(user);
  console.log("reached the point where I'll change the balance")
  console.log(user)
  console.log(document.querySelector(".balance"),user.getBalance())
  document.querySelector(".balance").innerHTML = user.getBalance() + "$";
  console.log("past the point where I update the balance")
};


//******************************code******************************

document.querySelector(".login").addEventListener("click", checkLogInInfo);
document
  .querySelector(".transfer-btn")
  .addEventListener("click", addTransferEvent);
