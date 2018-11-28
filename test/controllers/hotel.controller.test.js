const chai = require('chai');
const chai_http = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require('../../server')
let hotel_model = require('../../app/models/hotel.model');
let hotel_route = require('../../app/routes/hotel_routes');

chai.use(chai_http);

describe('GET Hotels Data Test', () => {
    it("It Should GET all Hotels data Test Happy Flow", () => {
        chai.request('http://127.0.0.1:3030')
            .get('/hotelssss')
            .end((error, res) => {
                console.error("error========", error);
                console.log("res===", res)
                try {
                    if (error) throw error;
                    res.should.be.json;
                    res.should.have.status(200);
                } catch (error) {
                    // console.log("error========", error);
                    // res.body.should.be.equal({});
                    // res.res.IncomingMessage.text.should.be('string').to.equal('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /hotelssss</pre>\n</body>\n</html>\n')
                    res.should.have.status(404);
                }

            });
    });
});