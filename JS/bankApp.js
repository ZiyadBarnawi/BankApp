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
    [1000, "5/7/2024"],
  ],
  getBalance: function () {
    return (
      this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0)
    );
  },
};

let user2 = {
  username: "Said",
  password: 1234,
  transactions: [
    [800, "7/7/2024"],
    [900, "9/7/2024"],
    [-250, "10/7/2024"],
    [-200, "10/7/2024"],
    [900, "11/7/2024"],
  ],
  getBalance: function () {
    return (
      this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0)
    );
  },
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
    return (
      this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0)
    );
  },
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
    return (
      this.transactions.reduce(function (acc, curr) {
        return acc + curr[0];
      }, 0)
    );
  },
};

//******************************Global variables******************************
let users = [user1, user2, user3, user4];
let currUser = [];
let date = new Date();
let sorted = { state: false };
let unsortedTransaction = { transaction: undefined };
let option = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
};
let area = navigator.language;
let timerFuncVar
//this variable is used later to check if there's a timer running at the moment
//******************************inputs******************************
let accName = document.querySelector(".account-name");
let accPassword = document.querySelector(".password");
let loanInput = document.querySelector(".loan-amount");
let transferInput = document.querySelector(".transfer-amount");
let to = document.querySelector(".to");
let closeAccountNameInput = document.querySelector(".close-account-name-input");
let closeAccountPasswordInput = document.querySelector(
  ".close-account-password-input"
);
//******************************buttons******************************
let transferBtn = document.querySelector(".transfer-btn");
let loanBtn = document.querySelector(".loan-btn");
let closeAccountBtn = document.querySelector(".close-account-btn");
let btns = document.querySelectorAll(".btn");
let loginBtn = document.querySelector(".login");
let sortBtns = document.querySelectorAll(".sort-btn");
//******************************divs and the like******************************
let transactionsDiv = document.querySelector(".transactions");
let summaryIn = document.querySelector(".summary-in");
let summaryout = document.querySelector(".summary-out");
let summaryInterest = document.querySelector(".summary-interest");
let welcomeMessage = document.querySelector(".welcome");
let todayDate = document.querySelector(".date");
let divs = document?.querySelectorAll(".hide");
let overlay = document.querySelector(".overlay");
let main = document.querySelector("main");
let form = document.querySelector("form");
let logoutTimer = document.querySelector(".logOutTimer");
let hiddenDivs = document?.querySelectorAll(".hide");
//******************************functions******************************
const calcDate = function (day, month, year) {
  let newDate = new Date();
  newDate.setFullYear(year);
  newDate.setMonth(month);
  newDate.setDate(day);
  return new Intl.DateTimeFormat(area).format(newDate);
};
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
                      new Intl.NumberFormat(area).format(transaction[0]) + "$"
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
                      new Intl.NumberFormat(area).format(transaction[0]) + "$"
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
                      new Intl.NumberFormat(area).format(transaction[0]) + "$"
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
                      new Intl.NumberFormat(area).format(transaction[0]) + "$"
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
  summaryIn.textContent = `IN: ${
    new Intl.NumberFormat(area).format(inTransactions) + "$"
  }`;
  summaryout.textContent = `OUT: ${
    new Intl.NumberFormat(area).format(outTransactions) + "$"
  }`;
  summaryInterest.textContent = `INTEREST ${new Intl.NumberFormat(area).format(
    (inTransactions * 1.2) / 100
  )}`;
};

const logoutTimerFunc = function () {
  let time = 300;
  let interval = setInterval(function () {
    logoutTimer.innerHTML = `You will be loged out in ${
      new Date(clock(time) * 1000).getMinutes() +
      ":" +
      new Date(clock(time) * 1000).getSeconds()
    }`;
    if (time === 0) {
      clearInterval(interval);
      forceLogout();
    }
    time--;
  }, 1000);
   return interval;
};

const checkLogInInfo = function () {
  let accountName = document.querySelector(".account-name").value;
  let password = document.querySelector(".password").value;
  currUser = [];
  let hiddenDivs2=document.querySelectorAll(".hide")
  for (let user of users) {
    if (user.username === accountName && user.password === Number(password)) {
      if (hiddenDivs2.length===0) {
        //made another variable that has the same objects as divs above because this might cause problems later
        welcomeMessage.innerHTML = `Welcome back ${user.username}`;
        currUser.push(user);
        unsortedTransaction.transaction = [...user.transactions];
        // todayDate.textContent = `${date.getDate()}/${
        //   date.getMonth() + 1
        // }/${date.getFullYear()}`;
        todayDate.textContent = Intl.DateTimeFormat(area, option).format(date);
        document.querySelector(".balance").innerHTML = new Intl.NumberFormat(area).format( user.getBalance()) + "$";

        displayTransaction(user);
        accName.blur();
        accPassword.blur();
        accName.value = "";
        accPassword.value = "";
       
        if(timerFuncVar);
        clearInterval(timerFuncVar);
        timerFuncVar= logoutTimerFunc();
        return;
      }

      hiddenDivs[0]?.classList?.toggle("hide");
      hiddenDivs[0]?.classList?.toggle("main-text");
      hiddenDivs[1]?.classList?.toggle("hide");
      hiddenDivs[1]?.classList?.toggle("main-grid");
      hiddenDivs[2]?.classList?.toggle("hide");
      hiddenDivs[2]?.classList?.toggle("summary");
      hiddenDivs[3]?.classList?.toggle("hide");
      hiddenDivs[3]?.classList?.toggle("sort-div");
      document.querySelector(".balance").innerHTML = new Intl.NumberFormat(area).format( user.getBalance()) + "$";
      // todayDate.textContent = `${date.getDate()}/${
      //   date.getMonth() + 1
      // }/${date.getFullYear()}`;
      todayDate.textContent = Intl.DateTimeFormat(area, option).format(date);

      
      welcomeMessage.innerHTML = `Welcome back ${user.username}`;
      currUser.push(user);
      displayTransaction(user);
      accName.blur();
      accPassword.blur();
      accName.value = "";
      accPassword.value = "";
      // let time=100;
      // let interval= setInterval(function(){
      //   logoutTimer.innerHTML=`You will be loged out in ${new Date(clock(time)*1000).getMinutes()+":"+new Date(clock(time)*1000).getSeconds()}`
      // if (time===0){
      //   clearInterval(interval)
      //   forceLogout()

      // }
      // time--;
      // },1000)
      if(timerFuncVar);
      clearInterval(timerFuncVar);
      timerFuncVar= logoutTimerFunc();    
      return;
    }
  }
  messages("Wrong password or username", "red");
};

const transfer = function (currUser, to, amount) {
  let transaction = [
    Number(-amount.value),
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    "out-transfer",
  ];
  let toCopy = to;
  to = users.find(function (user) {
    return user.username === to.value;
  });
  if (Number(amount.value) > currUser.getBalance()) {
    // window.alert("You can't transfer more than you have");
    messages("You can't transfer more than you have", "red");
    return;
  }
  if (currUser === to) {
    // window.alert("You can't transfer to you own account");
    messages("You can't transfer to you own account", "red");
    return;
  }
  if (to === undefined) {
    // window.alert("Check the username again");
    messages("Check the username again", "red");
    return;
  }
  to.transactions.push([
    Number(amount.value),
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    "in-transfer",
  ]);

  currUser.transactions?.push(transaction);

  toCopy.value = "";
  amount.value = "";

  refreshData(currUser);
  messages("The transaction was successful", "green");
  // window.alert(`The transaction was successful`);
  clearInterval(timerFuncVar);
  timerFuncVar= logoutTimerFunc();
};


const refreshData = function (user) {
  displayTransaction(user);
  displaySummary(user);
  document.querySelector(".balance").innerHTML = user.getBalance() + "$";
};

const closeAccount = function () {
  if (
    closeAccountNameInput.value === currUser[0].username &&
    Number(closeAccountPasswordInput.value) === currUser[0].password
  ) {
    let index = users.findIndex(function (curr) {
      return curr.username === closeAccountNameInput.value;
    });
    users.splice(index, 1);
    welcomeMessage.textContent = "Login to get started";
    currUser = [];
    divs[0]?.classList?.toggle("hide");
    divs[0]?.classList?.toggle("main-text");
    divs[1]?.classList?.toggle("hide");
    divs[1]?.classList?.toggle("main-grid");
    divs[2]?.classList?.toggle("hide");
    divs[2]?.classList?.toggle("summary");
    divs[3]?.classList?.toggle("hide");
    divs[3]?.classList?.toggle("sort-div");
    messages("The account was deleted successfuly", "green");
  }
};

const closeOverlay = function () {
  overlay.classList.toggle("hide-overlay");
  document.querySelector(".overlay-box").remove;
  main.style.pointerEvents = "auto";
};


const deleteOverlay = function () {
  let overlayBox = document.querySelectorAll(".overlay-box");
  for (let o of overlayBox) {
    o.remove();
  }
  main.style.pointerEvents = "auto";

};
const messages = function (message, color) {
  let html = `
    <div class="overlay-box">
    <p class="overlay-text" style="color:${color}"> ${message} </p>
    <button  class="close-overlay-btn" onclick="closeModalHandler()">Close</button>
    </div>
    `;
  overlay.innerHTML = html;

  if(overlay.classList.contains("hide-overlay")){

  main.style.pointerEvents = "none";
  overlay.classList.remove("hide-overlay");
  overlay.style.backdropFilter = "blur(3px)";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.2);";
}
else
{
  main.style.pointerEvents = "auto";
  overlay.classList.add("hide-overlay");
  // overlay.style.backdropFilter = "blur(3px)";
  // overlay.style.backgroundColor = "rgba(0, 0, 0, 0.2);";
}
};

function closeModalHandler() {
  closeOverlay();
  deleteOverlay();
}
const requistLoan = function () {
  let amount = Number(loanInput.value);

  if (
    amount > 0 &&
    currUser[0].transactions.some(function (movement) {
      return movement[0] > amount / 10;
    })
  ) {
    currUser[0].transactions.push([
      Math.round(amount),
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      "in-transfer",
    ]);
    refreshData(currUser[0]);
  } else
    messages(
      "The rule is that you must have a transaction that's 10% or more of the amount you are trying to loan",
      "red"
    );
  clearInterval(timerFuncVar);
  timerFuncVar= logoutTimerFunc();
  loanInput.value = "";
};

const sortTransactions = function () {
  unsortedTransaction.transaction = [...currUser[0].transactions];
  console.log(unsortedTransaction);
  let transactions = currUser[0].transactions.sort(function (a, b) {
    return a[0] - b[0];
  });
  currUser[0].transactions = transactions;
  displayTransaction(currUser[0]);
  sorted.state = true;
  // console.log(unsortedTransaction.transaction)
  switchSortBtns();
};

const unsortTransactions = function () {
  // console.log(currUser[0].transactions)
  currUser[0].transactions = [...unsortedTransaction.transaction];
  displayTransaction(currUser[0]);
  sorted.state = false;

  switchSortBtns();
};

const switchSortBtns = function () {
  if (sorted.state) {
    for (let btn of sortBtns) {
      btn?.removeEventListener("click", sortTransactions);
      btn.addEventListener("click", unsortTransactions);
    }
  } else if (sorted.state === false) {
    for (let btn of sortBtns) {
      btn?.removeEventListener("click", unsortTransactions);
      btn.addEventListener("click", sortTransactions);
    }
  }
};
const formatTransactionDate = function (user) {
  for (let [i, transaction] of user.transactions.entries()) {
    transaction[1] = calcDate(...transaction[1].split("/"));
  }
};
const timer = function (func) {
  setTimeout(func, 2500);
};
const clock = function (time) {
  return time;
};
const forceLogout = function () {
  welcomeMessage.innerHTML = "Login to get started";
  currUser.pop();

  while (transactionsDiv.hasChildNodes()) {
    transactionsDiv.removeChild(transactionsDiv.firstChild);
  }

  hiddenDivs[0]?.classList?.toggle("hide");
  hiddenDivs[0]?.classList?.toggle("main-text");
  hiddenDivs[1]?.classList?.toggle("hide");
  hiddenDivs[1]?.classList?.toggle("main-grid");
  hiddenDivs[2]?.classList?.toggle("hide");
  hiddenDivs[2]?.classList?.toggle("summary");
  hiddenDivs[3]?.classList?.toggle("hide");
  hiddenDivs[3]?.classList?.toggle("sort-div");
};
//******************************code******************************

formatTransactionDate(user1);
formatTransactionDate(user2);
formatTransactionDate(user3);
formatTransactionDate(user4);
document.querySelector(".login").addEventListener("click", checkLogInInfo);



// document.querySelector(".transfer-btn").addEventListener("click", addTransferEvent);
transferBtn.addEventListener("click",function(e){
  transfer(currUser[0],to,transferInput)
})
document
  .querySelector(".close-account-btn")
  .addEventListener("click", closeAccount);
document.querySelector("close");
// loanBtn.addEventListener("click", requistLoan);
for (let btn of sortBtns) {
  btn.addEventListener("click", sortTransactions);
}

form.addEventListener("click", function (e) {
  e.preventDefault();
});

loanBtn.addEventListener("click", function () {
  timer(requistLoan);
});
clock();
