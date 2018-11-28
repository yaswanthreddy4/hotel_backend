const mongoose = require('mongoose');
let User = mongoose.model('User');
const config = require('../config/config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log4js = require('log4js');

log4js.configure('./app/config/log4js.json');
var usersLogger = log4js.getLogger('users');
var accessLogger = log4js.getLogger('access');
var errorLogger = log4js.getLogger('error');

module.exports.tokenVaidator = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.status(404).json({
            message: "Token Not Found",
            token: null,
            auth: false
        });
        errorLogger.error("Token Not Found !");
    } else {
        jwt.verify(token, config.secretKey, (error, doc) => {
            if (error) {
                res.status(401).json({
                    message: "Failed To Authenticate Token :: Invalid Token{Unautherized User Incedent Reported}",
                    token: null,
                    auth: false
                });
                errorLogger.error("Failed To authencate Token :: Invlaid Token {Unautherized User Incedent Reported}");
            } else {
                User.findById(doc._id, (error, user) => {
                    if (error) {
                        res.send(500).json({
                            message: "User Not Found Via Token::Internal Server Error",
                            token: null,
                            auth: fale
                        });
                        errorLogger.error("User NOt Found Via Token :: Internal Server Error");
                    }
                    if (!user) {
                        res.status(404).json({
                            message: "User Record Not Found Via Token",
                            token: null,
                            auth: false
                        });
                        errorLogger.error("User Not Found Via Token");
                    } else {
                        next();
                        usersLogger.info("Valid Token grant access next method trigger")
                    }
                });
            }
        });
    }
}

module.exports.registration = (req, res, next) => {
    if (req.body && req.body.email && req.body.password
        // && req.body.name && req.body.phoneNumber
    ) {
        let saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashPassword = bcrypt.hashSync(req.body.password, salt);
        let newUser = new User({
            // name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            adress: req.body.adress,
            adress2: req.body.adress2,
            city: req.body.city,
            zip: req.body.zip
                // phoneNumber: req.body.phoneNumber
        });
        newUser.save((err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Failed To Regester User Internal Server Error',
                    error: err
                });
                errorLogger.error("Failed to Register a User ..Internal Server Error")
            } else {
                let token = jwt.sign({ _id: user._id }, config.secretKey, { expiresIn: 43200 })
                res.status(200).json({
                    message: " Regestration Sucessfull",
                    auth: true,
                    token: token,
                    role: user.role,
                    response: "ok"
                });
                usersLogger.info("User is Registered SuccessFully with Token :: " + token)
            }
        })
    } else {
        res.status(404).json({
            message: "Required Fields Are Missing",
        });
        errorLogger.error("Failed To Register a User, Required Feilds are Missing")
    }
}

module.exports.login = ((req, res, next) => {
    if (req.body && req.body.email && req.body.password) {
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                res.status(500)
                    .json({
                        message: "Failed to Login a User ..Internal Server Error",
                        error: err,
                        auth: false
                    });
                errorLogger.error("Failed to Login a User ..Internal Server Error")

            } else {
                if (!user) {
                    res.status(404)
                        .json({
                            message: "User Not Found! Get Registered",
                            auth: false
                        });
                    errorLogger.error("User Not Found! Get Registered")

                } else {
                    let isPwd = bcrypt.compareSync(req.body.password, user.password)
                    if (!isPwd) {
                        res.status(401)
                            .json({
                                message: "Invalid Password !  Not Match",
                                auth: false
                            });
                        errorLogger.error("Invalid Password ! Not Match")

                    } else {
                        let token = jwt.sign({ _id: user._id }, config.secretKey, { expiresIn: 43200 })
                        res.status(200)
                            .json({
                                message: "Login Successful!",
                                auth: true,
                                role: user.role,
                                token: token
                            });
                        usersLogger.info("Login SucessFull ! with Token :: " + token)

                    }
                }
            }
        })
    } else {
        res.status(404)
            .json({
                message: "Required Fields Are Missing FOr LogIn"
            });
        errorLogger.error("Required Feilds are Missing For Log In")

    }
});