const express = require('express');
const controllers = require('../controllers/service')
var { validationResult, check } = require('express-validator');
var { check } = require('express-validator')

const serviceRoute = express.Router()

serviceRoute.delete('/delete', [
    check('email', 'must not be empty').not().isEmpty(),
    check('email', 'invalid email').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array })
    } else {
        controllers.deleteUser(req, res);
    }
})

serviceRoute.put('/update', [
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
        return controllers.updateUser(req, res);
    })

module.exports = serviceRoute;
