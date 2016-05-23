'use strict';

var express = require('express');
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var bodyParser = require('body-parser');

app.use(bodyParser.json(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/countries', function(req, res) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://www.easysend.pl/api/calculator/countries", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    if (xhr.status === 200) {
        res.send(xhr.responseText);
    } else {
        res.send(status);
    }
});

app.post('/countries/destinations', function(req, res) {
    let data = req.body;
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://www.easysend.pl/api/calculator/countries/" + data.countryIn + "/destinations", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

    if (xhr.status === 200) {
        res.send(xhr.responseText);
    } else {
        res.send(status);
    }
});

app.post('/currencies', function(req, res) {
    let data = req.body;
    let xhr = new XMLHttpRequest();
    console.log(data);

    xhr.open("GET", "https://www.easysend.pl/api/calculator/currencies/" + data.countryIn + "/" + data.countryOut, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

    if (xhr.status === 200) {
        console.log(xhr.responseText);
        res.send(xhr.responseText);
    } else {
        res.send(status);
    }
});

app.post('/exchange-rate', function(req, res) {
    let data = req.body;
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://www.easysend.pl/api/calculator/exchange-rate/" + data.currencyIn + "/" + data.currencyOut + "/1", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

    if (xhr.status === 200) {
        console.log(xhr.responseText);
        res.send(xhr.responseText);
    } else {
        res.send(status);
    }
});

app.listen(3000, console.log('Server run on http://localhost:3000'));
