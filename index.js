let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0
    for (const trans of this.transactions) {
      total += trans.amount;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    }
    return false;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed()  {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return this.amount * -1;
  }
  isAllowed() {
    if (this.amount <= this.account.balance) {
      return true;
    }
    return false;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);


// 1) Allow multiple accounts to be created
// 2) Each account can have many transactions
// 3) Allow withdrawals and deposits into accounts
// 4)  Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// 5)  Allow us to retrieve the current balance of the account at any time
// 6) Don't allow withdrawals that exceed the remaining balance of the account
