const mongoose = require('mongoose');
let User = mongoose.model('User');
const bcrypt = require('bcrypt')

module.exports.registration = (req, res, next) => {
    if (req.body && req.body.email && req.body.password
        //  && req.body.name && req.body.phoneNumber
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
        })
        newUser.save((err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Failed To Regester User Internal Server Error',
                    error: err
                })
            } else {
                res.status(200).json({
                    message: " Regestration Sucessfull",
                    auth: true,
                    response: "ok"
                })
            }
        })
    } else {
        res.status(404).json({
            message: "Required Fields Are Missing",
        })
    }
}

module.exports.login = ((req, res, next) => {
    if (req.body && req.body.email && req.body.password) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.status(500)
                    .json({
                        message: "Internal Server Error",
                        error: err,
                        auth: false
                    });
            } else {
                if (!user) {
                    res.status(404)
                        .json({
                            message: "User Record Not Found",
                            auth: false
                        });
                } else {
                    let isPwd = bcrypt.compareSync(req.body.password, user.password)
                    if (!isPwd) {
                        res.status(401)
                            .json({
                                message: "Invalid Password!",
                                auth: false
                            });
                    } else {
                        res.status(200)
                            .json({
                                message: "Login Successful!",
                                auth: true
                            });
                    }
                }
            }
        })
    } else {
        res.status(404)
            .json({
                message: "Required Fields Are Missing"
            });
    }
});