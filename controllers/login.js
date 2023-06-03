var User = require('../models/account');
var sql = require('../mysql/connect');
var _token = require('../token/secrete')
const jwt = require('jsonwebtoken')
exports.listUser = function (req, res) {
    User.list(function (data) {
        res.json({ users: data })
    })
}


var make = function (user) {
    return new Promise(function (resolve, reject) {
        jwt.sign({ data: user }, _token.ACCESS_TOKEN, {
            algorithm: 'HS256',
            expiresIn: _token.TOKEN_TIME_LIFE,
        },
            function (err, _token) {
                if (err) return reject(err);
                return resolve(_token);
            });
    });
};

var check = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, _token.ACCESS_TOKEN, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

exports.login = function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;
    var user = [
        req.body.user_id,
        req.body.firstname,
        req.body.lastname,
        email,
        pass,
    ];
    sql.query('select * from infomation where email = ? and password = ?', [email, pass], async (err, rows) => {
        if (err) {
            res.json(err);
        } else if (rows.length === 0) {
            res.json('invalid username or password');
        } else {
            const token_ = await make(user);
            res.json({
                msg: 'oke',
                token: token_
            });

        }
    });
}
exports.checkToken = async function (req, res) {
    try {
        var tokenToCheck = req.body.token;
        const data = await check(tokenToCheck);
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}