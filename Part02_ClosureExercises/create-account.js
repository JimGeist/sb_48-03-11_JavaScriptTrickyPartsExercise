/**
 * createAccount accepts a pin and dollar amount (no validation for correct types) and the account
 * is initialized with the pin and dollar amount. createAccount returns an object with methods 
 * to checkBalance(pin), deposit(pin, amount), withdraw(pin, amount), and changePin(pin, newPin).
 * @param {*} pin 
 * @param {*} amount 
 * @returns 
 */
function createAccount(pin, amount) {

    let acctPIN = pin;
    let acctBalance = amount || 0;

    const validPin = (inPin) => {
        return inPin === acctPIN ? true : false;
    }

    return {
        checkBalance: (pin) => {
            if (validPin(pin)) {
                return `$${acctBalance}`;
                // return `Current balance: $${acctBalance}.`;
            } else {
                return "Invalid PIN.";
            }
        },
        deposit: (pin, amount) => {
            if (validPin(pin)) {
                acctBalance = acctBalance + amount;
                return `Succesfully deposited $${amount}. Current balance: $${acctBalance}.`;
            } else {
                return "Invalid PIN.";
            }
        },
        withdraw: (pin, amount) => {
            if (validPin(pin)) {
                if (amount > acctBalance) {
                    return "Withdrawal amount exceeds account balance. Transaction cancelled.";
                } else {
                    acctBalance = acctBalance - amount;
                    return `Succesfully withdrew $${amount}. Current balance: $${acctBalance}.`;
                }
            } else {
                return "Invalid PIN.";
            }
        },
        changePin: (pin, newPin) => {
            if (validPin(pin)) {
                acctPIN = newPin;
                return "PIN successfully changed!"
            } else {
                return "Invalid PIN.";
            }
        }
    }
}

module.exports = { createAccount };
