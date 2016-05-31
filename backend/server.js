'use strict';

const express = require('express');
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
});

app.get('/countries', (req, res) => {
    res.send(get_response("GET", "https://www.easysend.pl/api/calculator/countries"));
});

app.get('/countries/destinations', (req, res) => {
  let countryIn = req.param("countryIn");

  if(countryIn !== undefined) {
    /*
      I know that "Easy Send" API return correctly error if we send undefined parameter,
      but I think it's better to not fully trust third-party code :)
    */
    let message = get_response("GET", "https://www.easysend.pl/api/calculator/countries/" + countryIn + "/destinations");

    if (message.error) {
      res.sendStatus(message.error.code)
    } else {
      res.send(message);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post('/currencies', (req, res) => {
  let countryIn = req.params("countryIn");
  let countryOut = req.params("countryOut");

  if (countryIn !== undefined && countryOut !== undefined) {
    let message = get_response("GET", "https://www.easysend.pl/api/calculator/currencies/" + countryIn + "/" + countryOut);

    if (message.error) {
      res.sendStatus(message.error.code)
    } else {
      res.send(message);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post('/exchange-rate', (req, res) => {
  let currencyIn = req.params("currencyIn");
  let currencyOut = req.params("currencyOut");

  if (currencyIn !== undefined && currencyOut !== undefined) {
    let message = get_response("GET", "https://www.easysend.pl/api/calculator/exchange-rate/" + currencyIn + "/" + currencyOut + "/1");

    if (message.error) {
      res.sendStatus(message.error.code)
    } else {
      res.send(message);
    }
  } else {
    res.sendStatus(400);
  }

});

app.listen(8443, console.log('Server run on http://localhost:8443'));

function get_response(type, url) {
  let xhr = new XMLHttpRequest();

  xhr.open(type, url, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send();

  return xhr.responseText;

}
