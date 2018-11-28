const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.addoneUser = (req, res, next) => {
    console.log('Add One User By Post');
    if (req.body && req.body.name && req.body.email && req.body.password) {
        User.insertMany(req.body, (error, user) => {
            if (error) {
                res.status(500).json({
                    message: "error while adding user",
                    error: error
                })
            } else {
                res.status(200).json({
                    message: 'added one user',
                    response: 'ok'
                });
            }
        });
    } else {
        res.status(200).json({
            message: "Required Feilds For creating User is Missing ",
        });
    }
}

module.exports.allusers = (req, res, next) => {
    console.log('All Users By Get');
    let offset = 0;
    let count = 2;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    User.find().skip(offset).limit(count)
        .exec((error, users) => {
            if (error) {
                res.status(404).json({
                    message: "user not found",
                    error: error
                })
            } else {
                res
                    .status(200)
                    .json(users);
            }
        });
}

module.exports.oneUser = (req, res, next) => {
    var userId = req.params.userId;
    if (req.params && req.params.userId) {
        User.findById(userId)
            .exec((error, user) => {
                if (error) {
                    res.status(404).json({
                        message: "user record is not found",
                        error: error
                    });
                } else {
                    res.status(200).json(user)
                }
            });
    } else {
        res
            .status(404)
            .json({
                message: "Request Params UserId  is Not In Url"
            })
    }
}