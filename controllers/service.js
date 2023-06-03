var User = require('../models/account');
var sql = require('../mysql/connect');

exports.deleteUser = function (req, res) {
    var email = req.body.email;
    User.delete(email, function (resp) {
        res.json(resp);
    })
}

exports.updateUser = function (req, res) {
    var data = req.body;
    User.update(data, function (resp) {
        res.json(resp);
    })
}