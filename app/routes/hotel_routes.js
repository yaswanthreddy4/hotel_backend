const express = require('express');
const router = express.Router();
const hotel_controller = require('../controllers/hotel.controller');
const user_controller = require('../controllers/user.controller');
// const auth_controller = require('../controllers/auth.controller');
const tokenValidator_controller = require('../controllers/tokenValidator.controller');

router
    .route('/hotel')
    .post(hotel_controller.addHotel)

router
    .route('/hotels')
    // .get(tokenValidator_controller.tokenVaidator, hotel_controller.getAllHotels)
    .get(hotel_controller.getAllHotels)
router
    .route('/events/')
    .get(hotel_controller.getEvents)

// router
//     .route('/hotelssss')
//     // .get(tokenValidator_controller.tokenVaidator, hotel_controller.getAllHotels)
//     .get(hotel_controller.getAllHotels)
// router
//     .route('/registration')
//     .post(auth_controller.registration)
// router
//     .route('/login')
//     .post(auth_controller.login)

router
    .route('/hotel/:hotelId')
    .get(hotel_controller.getOneHotel)
    .put(hotel_controller.updateOneHotel)
    .delete(hotel_controller.deleteOneHotel)
    .patch(hotel_controller.updateOneHotel)

router
    .route('/hotel/:hotelId/reviews')
    .get(hotel_controller.allReviewsForOneHotel)

router
    .route('/hotel/:hotelId/reviews/:reviewId')
    .get(hotel_controller.OneReviewForHotel);
router
    .route('/bookhotel/:hotelId/:userId')
    // .put(tokenValidator_controller.tokenVaidator, hotel_controller.bookHotel);
    .put(tokenValidator_controller.tokenVaidator, hotel_controller.bookHotel);
router
    .route('/showBookedHotel/:userId')
    .get(tokenValidator_controller.tokenVaidator, hotel_controller.showBookedHotel);

router
    .route('/events/:eventId')
    .get(hotel_controller.getEvents)

module.exports = router;