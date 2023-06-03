const express = require('express');
const controllers = require('../controllers/register')
var { validationResult, check } = require('express-validator');
var { check } = require('express-validator')
const routeRegister = express.Router();
// const validationRules = {
//     email: {
//         required: true,
//         isEmail: true,
//     },
//     password: {
//         required: true,
//         minLength: 6,
//     },
//     firstname: {
//         required: true,
//         minLength: 6,
//         isAlpha: true,
//     },
//     lastname:{
//         required: true,
//         minLength: 6,
//         isAlpha: true,
//     }
// };

routeRegister.post('/register', [
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('password').isLength({ min: 6 }),
    check('firstname').not().isEmpty(),
    check('lastname').not().isEmpty(),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        return controllers.createAccount(req, res);
    }
);

module.exports = routeRegister;
