const express = require('express');
const routeLogin = express.Router();
const controllers = require('../controllers/login')
var { check } = require('express-validator');
var { validationResult } = require('express-validator');

routeLogin.post('/login', [
    check('email', 'invalid email').isEmail(),
    check('email', 'email must not be empty').not().isEmpty(),
    check('password', 'password must not be empty').not().isEmpty(),
    check('password', 'password must be more than 6 digits').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    return controllers.login(req, res);
});

routeLogin.get('/checkToken', controllers.checkToken);
routeLogin.get('/list', controllers.listUser);


module.exports = routeLogin