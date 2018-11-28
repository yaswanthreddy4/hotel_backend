const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const auth_controller = require('../controllers/auth.controller');
const tokenValidator_controller = require('../controllers/tokenValidator.controller');

router
    .route('/user')
    .post(user_controller.addoneUser)

router
    .route('/users')
    .get(tokenValidator_controller.tokenVaidator, user_controller.allusers)

// router
//     .route('/registration')
//     .post(auth_controller.registration)
// router
//     .route('/login')
//     .post(auth_controller.login)

router
    .route('/user/registration')
    .post(tokenValidator_controller.registration)
router
    .route('/user/login')
    .post(tokenValidator_controller.login)

router
    .route('/user/token')
    .get(tokenValidator_controller.tokenVaidator);

router
    .route('/user/:userId')
    .get(user_controller.oneUser)

module.exports = router;