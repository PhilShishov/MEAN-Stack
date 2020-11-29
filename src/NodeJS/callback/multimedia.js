'use strict'
const VAT = 0.2;
const products = [
    { id: 1, name: "PC - Alienware", price: 400 },
    { id: 2, name: "Keyboard - Steelseries Apex M800", price: 60.25 },
    { id: 3, name: "Mouse - Razer Mamba", price: 40.20 },
    { id: 4, name: "Monitor - Dell UltraSharp 34 Curved", price: 749.99 },
    { id: 5, name: "Laptop - Lenovo IdeaPad 700-15", price: 960.99 }
];

let accountBalance = 1000.00;

function withdraw(amount, callback) {
    if (amount > accountBalance) {
        callback("Insufficient funds.");
    } else {
        accountBalance -= amount;
        callback();
    }
}

function calculateVAT(amount) {
    return amount * VAT;
}

function buy(product, callback) {
    withdraw(product.price, function(err) {
        if (err) {
            callback(err);
        } else {
            let tax = calculateVAT(product.price);
            console.log("You bought a " + product.name + " for $" + product.price);
            console.log("VAT: $" + tax.toFixed(2));
            callback();
        }
    });
}

// Expected output:
// You bought a Keyboard - Steelseries Apex M800 for $60.25
// VAT: $12.05
// Your balance is $939.75

buy(products[1], function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Your balance is $" + accountBalance.toFixed(2));
    }
});