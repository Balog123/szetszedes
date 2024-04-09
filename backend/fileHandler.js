const path = require('path');

function sendIndex(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
}

function sendRegister(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'register.html'));
}

function sendLogin(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'login.html'));
}

function sendProfile(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'profile.html'));
}

function sendAllProducts(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'allproducts.html'));
}

function sendSingleProducts(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'singleproduct.html'));
}

module.exports = { sendIndex, sendRegister, sendLogin, sendProfile, sendAllProducts, sendSingleProducts };
