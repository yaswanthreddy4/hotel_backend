const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
let hotel_model = require('../../app/models/hotel.model');

describe('Hotel Model Happy FLow Test', () => {
    let hotel = new hotel_model({
        "name": 123,
        "stars": 5,
        "description": "Costly Hotel",
        "currency": "$500",
        "photos": [1, 2, 3],
        // "checkIn": "555",
        "reviews": [{
            "name": "yaswanth",
            "id": "5646",
            "review": "costly",
            "ratings": 5
        }]
    });
    it('Test for Hotel Model Data With Expect Sucess', () => {
        expect(hotel).to.have.property('name')
        expect(hotel).to.have.property('name').is.equal("123")
        expect(hotel).to.have.property('stars')
        expect(hotel).to.have.property('stars').is.to.be.a("number")
        expect(hotel).to.have.property("reviews")
        expect(hotel.reviews[0]).to.have.property("name").is.equal("yaswanth")
        expect(hotel.reviews[0]).to.have.property("name").is.to.be.a("string")
        expect(hotel.reviews[0]).to.have.property("id").is.equal("5646")
        expect(hotel.reviews[0]).to.have.property("id").is.to.be.a("string")
        expect(hotel.photos[0]).contains(1)
            // expect(hotel).to.have.property("checkIn")
    });
    //     it('Test for Hotel Model Data With Should Sucess', () => {
    //         hotel.should.to.have.property('name')
    //         hotel.should.to.have.property('name').is.equal("123")
    //         hotel.should.to.have.property('stars')
    //         hotel.should.to.have.property('stars').is.to.be.a("number")
    //         hotel.should.to.have.property("reviews")
    //         hotel.should.reviews[0]).to.have.property("name").is.equal("yaswanth") hotel.should.reviews[0]).to.have.property("name").is.to.be.a("string")
    //         hotel.should.reviews[0]).to.have.property("id").is.equal("5646") hotel.should.reviews[0]).to.have.property("id").is.to.be.a("string")
    //         hotel.should.photos[0]).contains(1)
    //     // expect(hotel).to.have.property("checkIn")
    // });
});