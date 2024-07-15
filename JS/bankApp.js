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
let closeAccountNameInput=document.querySelector(".close-account-name-input")
let closeAccountPasswordInput=document.querySelector(".close-account-password-input")
//******************************buttons******************************
let transferBtn = document.querySelector(".transfer-btn");
let loanBtn = document.querySelector(".loan-btn");
let closeAccountBtn = document.querySelector(".close-account-btn");
let btns=document.querySelectorAll(".btn");
let loginBtn=document.querySelector(".login")
//******************************divs and the like******************************
let transactionsDiv = document.querySelector(".transactions");
let summaryIn = document.querySelector(".summary-in");
let summaryout = document.querySelector(".summary-out");
let summaryInterest = document.querySelector(".summary-interest");
let welcomeMessage = document.querySelector(".welcome");
let todayDate = document.querySelector(".date");
let divs = document?.querySelectorAll(".hide");
let overlay=document.querySelector(".overlay")
let main=document.querySelector("main");
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
  currUser=[]
  //made another variable that has the same objects as divs above because this might cause problems later
  let hiddenDivs = document?.querySelectorAll(".hide");

  for (let user of users) {
    if (user.username === accountName && user.password === Number(password)) {
      if (hiddenDivs == []) {
        welcomeMessage.innerHTML = `Welcome back ${user.username}`;
        currUser.push(user);
        todayDate.textContent = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;

        displayTransaction(user);
        accName.blur();
        accPassword.blur();
        accName.value = "";
        accPassword.value = "";
        // user.getBalance()

        return;
      }

      hiddenDivs[0]?.classList?.toggle("hide");
      hiddenDivs[0]?.classList?.toggle("main-text");
      hiddenDivs[1]?.classList?.toggle("hide");
      hiddenDivs[1]?.classList?.toggle("main-grid");
      hiddenDivs[2]?.classList?.toggle("hide");
      hiddenDivs[2]?.classList?.toggle("summary");
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
  // window.alert("Wrong password or username");
  messages("Wrong password or username","red")
};

const transfer = function (currUser, to, amount,e) {
  let transaction = [
    Number(-amount.value),
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    "out-transfer",
  ];
  
  let toCopy=to
  to = users.find(function (user) {
    return user.username === to.value;
  });
  if (Number(amount.value) > currUser.getBalance()) {
    // window.alert("You can't transfer more than you have");
    console.log(currUser,currUser.getBalance())
    messages("You can't transfer more than you have","red")
    return;
  }
  
  if(currUser===to){
    // window.alert("You can't transfer to you own account");
    messages("You can't transfer to you own account","red")
    return;
  }
  if (to === undefined) {
    // window.alert("Check the username again");
    messages("Check the username again","red")
    return;
  }
  to.transactions.push([
    Number(amount),
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    "in-transfer",
  ]);
  currUser.transactions?.push(transaction);
  
  toCopy.value=""
  amount.value=""
  
  refreshData(currUser);
  // window.alert(`The transaction was successful`);
  messages("The transaction was successful","green")
};

let addTransferEvent = function () {
  transferBtn.addEventListener(
    "click",
    transfer(currUser[0], to, transferInput)
  );
};

const refreshData = function (user) {
  displayTransaction(user);
  displaySummary(user);
  document.querySelector(".balance").innerHTML = user.getBalance() + "$";
};


const closeAccount=function(){
if (closeAccountNameInput.value===currUser[0].username&&Number(closeAccountPasswordInput.value)=== currUser[0].password){
  let index=users.findIndex(function(curr){
      return curr.username===closeAccountNameInput.value

    })
    users.splice(index,1)
    welcomeMessage.textContent="Login to get started"
      currUser=[]
      divs[0]?.classList?.toggle("hide");
      divs[0]?.classList?.toggle("main-text");
      divs[1]?.classList?.toggle("hide");
      divs[1]?.classList?.toggle("main-grid");
      divs[2]?.classList?.toggle("hide");
      divs[2]?.classList?.toggle("summary");
    messages("The account was deleted successfuly","green")
}
}




const closeOverlay=function(){
  
  overlay.classList.toggle("hide-overlay");
  document.querySelector(".overlay-box").innerHTML="";
  main.style.pointerEvents="auto";
  
  
  
}

const messages=function(message,color){


  let html=`
  <div class="overlay-box">
  <p class="overlay-text"> ${message} </p>
  <button class="close-overlay-btn">Close</button>
  </div>
  `;
  
  overlay.insertAdjacentHTML("afterbegin",html);
  main.style.pointerEvents="none";
  overlay.classList.toggle("hide-overlay");
  overlay.style.backdropFilter="blur(3px)"
  overlay.style.backgroundColor="rgba(0, 0, 0, 0.2);"
  document.querySelector(".overlay-text").style.color=color
  document.querySelector(".close-overlay-btn").addEventListener("click",closeOverlay)


}
//******************************code******************************

document.querySelector(".login").addEventListener("click", checkLogInInfo);
document.querySelector(".transfer-btn").addEventListener("click", addTransferEvent);
document.querySelector(".close-account-btn").addEventListener("click", closeAccount);
