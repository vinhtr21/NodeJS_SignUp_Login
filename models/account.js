const sql = require('../mysql/connect')
const User = function () {
    this.email = email,
        this.user_id = User.user_id,
        this.email = User.email,
        this.firstname = User.firstname,
        this.lastname = User.lastname,
        this.password = User.password
};

User.list = function (result) {
    sql.query('select * from infomation', function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        result(user);
    })
}

User.create = function (data, result) {
    sql.query('select * from infomation where email = ?', data.email, function (err, user) {
        if (user.length === 0) {
            sql.query('insert into infomation set ?', data, function (err) {
                if (err) {
                    result({ errors: err })
                    return;
                }
                result({ msg: 'create success' })
            })
        }
        else if (err) {
            result({ error: err })
        } else {
            result({ error: 'email existed' })
        }
    })



}

User.delete = function (email, result) {
    sql.query('select * from infomation where email = ?', email, function (err, user) {
        if (err) {
            result({ errors: err })
        } else if (user.length === 0) {
            result({ msg: 'user not exist in database' })
        } else {
            sql.query('delete from infomation where email = ?', email, function (err) {
                if (err) {
                    result({ error: err })
                }
                result({ msg: 'delete success' })
            })
        }
    })
}

User.update = function (data, result) {
    sql.query('select * from infomation where email = ? ', data.email, function (err, user) {
        if (err) {
            return result({ errors: err })
        } else if (user.length === 0) {
            return result({ msg: 'user not exist in database' })
        }
        sql.query('update infomation set firstname = ?, lastname = ?, password = ? where email = ?',
            [data.firstname, data.lastname, data.password, data.email], function (err) {
                if (err) {
                    return result({ error: err })
                }
                return result({ msg: 'update success' })
            })
    })
}

module.exports = User;