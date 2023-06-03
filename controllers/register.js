var User = require('../models/account');
exports.createAccount = function (req, res) {
    var data = req.body;
    User.create(data, function (resp) {
        res.json({ result: resp })
    })
}