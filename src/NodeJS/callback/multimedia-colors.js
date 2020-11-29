'use strict'

// Run npm install

const colors = require('colors');
const VAT = 0.2;
var products = [
    { id: 1, name: "PC - Alienware", price: 400 },
    { id: 2, name: "Keyboard - Steelseries Apex M800", price: 60.25 },
    { id: 3, name: "Mouse - Razer Mamba", price: 40.20 },
    { id: 4, name: "Monitor - Dell UltraSharp 34 Curved", price: 749.99 },
    { id: 5, name: "Laptop - Lenovo IdeaPad 700-15", price: 960.99 }
];

var accountBalance = 1000;

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
            var tax = calculateVAT(product.price);
            var m = "You bought a " + product.name + " for $" + product.price;
            var t = "VAT: $" + tax.toFixed(2);
            console.log(m.green);
            console.log(t.grey);
            callback();
        }
    });
}

// Expected output:
// You bought a Mouse - Razer Mamba for $40.2
// VAT: $8.04
// Your balance is $959.80

buy(products[2], function(err) {
    if (err) {
        console.log(err.red);
    } else {
        var m = "Your balance is $" + accountBalance.toFixed(2);
        console.log(m.green);
    }
});