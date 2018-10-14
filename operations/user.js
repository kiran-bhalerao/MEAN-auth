const User = require('../models/user');
const bcrypt = require('bcryptjs');


module.exports.byId = (id) => {
    return User.findById(id);
};

module.exports.byUsername = (username) => {
    return User.findOne({ username });
};

module.exports.all = () => {
    return User.find();
};

module.exports.add = (newUser, callback) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            User(newUser)
                .save()
                .then((user) => {
                    callback(null, user);
                })
                .catch((err) => {
                    callback(err, null);
                });
        });
    });
};