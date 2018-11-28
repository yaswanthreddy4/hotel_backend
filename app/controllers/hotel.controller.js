const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const User = mongoose.model('User');
const Events = mongoose.model('Events');


module.exports.addHotel = (req, res, next) => {
    console.log('adding one HOtel');
    // console.log((req.body));
    // if (req.body && req.body.name && req.body.stars &&
    //     req.body.currency) {
    Hotel.insertMany(req.body,
            function(error, response) {
                if (error) {
                    res
                        .status(500).json({
                            message: "Internal Server Error",
                            error: error
                        });
                } else {
                    res.status(200).json(response);
                }
            })
        // }
        // else {
        //     res
        //         .status(200)
        //         .json({
        //             message: "Required Feilds For creating Hotel is Missing"
        //         });
        // }
};

module.exports.getAllHotels = (req, res, next) => {
    console.log(req.query);
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    Hotel
        .find()
        .skip(offset).limit(count)
        .exec((error, hotels) => {
            if (error) {
                console.log(error);
                res
                    .status(500)
                    .json({
                        message: "Hotels Records Not Found",
                        error: error
                    });
            } else {
                res
                    .status(200)
                    .json(hotels);
            }
        });
}

module.exports.getOneHotel = (req, res, next) => {
    var hotelId = req.params.hotelId;
    console.log(req.params.hotelId);
    if (req.params && req.params.hotelId) {
        Hotel
            .findById(hotelId)
            .exec(function(error, hotel) {
                if (error) {
                    res
                        .status(404)
                        .json({
                            message: "Hotel Records Not Found",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .json(hotel);
                }
            });
    } else {
        res
            .status(404)
            .json({
                message: "Request Params HotelId is Not In Url"
            })
    }

}

module.exports.updateOneHotel = (req, res, next) => {
    try {
        console.log("Update One Hotels Put");
        var hotelId = req.params.hotelId;
        var updateQuery = {
            $push: {
                // "name": req.body.name,
                // "reviews": req.body.reviews,
                "photos": req.body.photos
            }
        };
        Hotel
            .findByIdAndUpdate(hotelId, updateQuery, function(error, response) {
                if (error) throw error;
                res
                    .status(200)
                    .json({
                        message: "Updated One Hotel",
                        response: "ok"
                    });
            });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Error While Update One Hotel",
                error: error
            });
    }

}
module.exports.deleteOneHotel = (req, res, next) => {
    try {
        let hotelId = req.params.hotelId;
        console.log(req.params.hotelId);

        if (req.params && req.params.hotelId) {
            Hotel
                .findByIdAndDelete(hotelId, (error, response) => {
                    if (error) throw error;
                    res
                        .status(200)
                        .json({
                            message: "deleted One Hotel",
                            response: "ok"
                        });
                })
        };
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Error While deleting One Hotel",
                error: error
            });
    }

}

module.exports.allReviewsForOneHotel = (req, res, next) => {
    let hotelId = req.params.hotelId;
    if (req.params && req.params.hotelId) {
        Hotel.findById(hotelId)
            .select('reviews')
            .exec((err, reviews) => {
                if (err) {
                    res
                        .status(404)
                        .json({
                            message: "Hotel Records Not Found",
                            error: err
                        });
                } else {
                    res
                        .status(200)
                        .json(reviews);
                }
            })
    } else {
        res
            .status(404)
            .json({
                message: "Request Params HotelId is Not In Url"
            })
    }
}

module.exports.OneReviewForHotel = (req, res, next) => {
    let hotelId = req.params.hotelId;
    let reviewId = req.params.reviewId;
    if (req.params && req.params.hotelId && req.params.reviewId) {
        Hotel
            .findById(hotelId)
            .select('reviews') //for projecting reviews only
            .exec(function(error, reviews) {
                if (error) {
                    res
                        .status(404)
                        .json({
                            message: "Hotel Records Not Found",
                            error: error
                        });
                } else {
                    var review = reviews.reviews.id(reviewId)
                    res
                        .status(200)
                        .json(review);
                }
            });
    } else {
        res
            .status(404)
            .json({
                message: "Request Params HotelId is Not In Url"
            })
    }
}

module.exports.showBookedHotel = (req, res, next) => {
    let userId = req.params.userId;
    if (req.params && req.params.userId) {
        User
            .findById(userId)
            .select("bookHistory")
            .exec((error, hotels) => {
                if (error) {
                    res
                        .status(500)
                        .json({
                            message: "Internal Server Error While Show Hotel History",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .json(hotels);
                }
            });
    } else {
        res
            .status(404)
            .json({
                message: "Request Params UserId  is Not In Url"
            })

    }

};

module.exports.bookHotel = (req, res, next) => {
    try {
        let userId = req.params.userId;
        let hotelId = req.params.hotelId;
        findOneHotelOneUser(hotelId, userId).then((data) => {
            let bookHotelHistory = {
                $push: {
                    'bookHistory': [{
                        name: data.hotel.name,
                        hotelId: data.hotel._id,
                        price: data.hotel.rooms.price,
                        bookingDate: new Date(),
                        checkIn: new Date(),
                        checkOut: new Date(),

                    }]
                }
            }
            if (data.user._id) {
                User.findByIdAndUpdate(userId, bookHotelHistory, (err, doc) => {
                    if (err) {
                        res.set('application/json')
                            .status(500)
                            .json({
                                error: err,
                                message: "Booking Is not Completed Due to Server Error"
                            })
                    } else {
                        res.status(200)
                            .json({
                                response: true,
                                message: "Booking Completed !"
                            })
                    }
                })
            } else {
                res.status(404).json({
                    message: "For Booking User Not Found!"
                });
            }
        })
    } catch (err) {
        res.status(500).json(error)
    }
}

async function findOneHotelOneUser(hotelId, userId) {
    if (!hotelId) {
        throw new Error("Hotel Id Is Not Found")
    }
    if (!userId) {
        throw new Error("UserId Is Not Found")
    }
    var hotel = await Hotel.findById(hotelId);
    var user = await User.findById(userId);
    return {
        hotel: hotel,
        user: user
    };
}

module.exports.getEvents = (req, res, next) => {
    console.log(req.query);
    var offset = 0;
    var count = 6;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    Events
        .find()
        .skip(offset).limit(count)
        .exec((error, events) => {
            if (error) {
                console.log(error);
                res
                    .status(500)
                    .json({
                        message: "Events Not Found",
                        error: error
                    });
            } else {
                res
                    .status(200)
                    .json(events);
            }
        });
}





module.exports.getOneEvent = (req, res, next) => {
    var eventId = req.params.eventId;
    console.log(req.params.eventId);
    if (req.params && req.params.eventId) {
        Events
            .findById(eventId)
            .exec((error, events) => {
                if (error) {
                    console.log(error);
                    res
                        .status(500)
                        .json({
                            message: "Events Not Found",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .json(events);
                }

            })
    }
}