const jwt = require('jsonwebtoken');
const User = require('../operations/user');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

module.exports = (app, passport) => {

    //DUMMY 
    app.get('/user', (req, res) => {
        User.all()
            .then((users) => {
                res.send(users);
            });
    });

    // REGISTER
    app.post('/user/register', (req, res) => {
        User.add({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }, (err, user) => {
            if (!err && user)
                res.json({
                    success: true,
                    msg: 'User Registered.'
                });
            else
                res.json({
                    success: false,
                    msg: 'User not Registered.'
                });
        })
    });

    //PROTECTED ROUTE
    app.get('/user/profile', passport.authenticate('jwt', { session: false }),
        function (req, res) {
            res.json(req.user);
        }
    );

    //LOGIN
    app.post('/user/login', (req, res) => {
        // res.send('user login');
        const username = req.body.username;
        const password = req.body.password;

        User.byUsername(username)
            .then((user) => {
                if (!user)
                    return res.json({ success: false, msg: 'User not found!' });
                bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            const token = jwt.sign(user.toJSON(), config.secret, {
                                expiresIn: 604800
                            });

                            return res.json({
                                success: true,
                                msg: 'Login successfuly!',
                                token: 'Bearer ' + token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    username: user.username,
                                    email: user.email
                                }
                            });
                        } else
                            return res.json({ success: false, msg: 'Password invalid!' });

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};