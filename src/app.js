require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var routeRegister = require('../routes/routeRegister');
var routeLogin = require('../routes/routeLogin');
var routeService = require('../routes/routeService')

app.use('/', routeLogin);
app.use('/', routeRegister);
app.use('/', routeService)
app.listen(process.env.PORT || 3000, (req, res) => {
    console.log(`http://localhost:${process.env.PORT}`)
    console.log()
})