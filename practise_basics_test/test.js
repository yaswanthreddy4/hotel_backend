const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
let op = require('./operations');

describe("Checking For POSITIVE Response", () => {
    it("Checked Value Is Null, Test is Sucess Happy Flow", () => {
        assert.equal(op.isNull(null), true)
    });
    it("Checked Value Is String, Test is Sucess Happy Flow", () => {
        assert.equal(op.isString(''), true)
    });
    it("Checked Value Is Number, Test is Sucess Happy Flow", () => {
        assert.equal(op.isNumber(20), true)
    });
    it("Checked Value Is Undefine, Test is Sucess Happy Flow", () => {
        assert.equal(op.isUndefine(undefined), true)
    });
});

describe("Checking For NEGATIVE Response", () => {
    it("Checked Value Is Null, Test is Sucess Happy Flow", () => {
        assert.notEqual(op.isNull(null), false)
    });
    it("Checked Value Is String, Test is Sucess Happy Flow", () => {
        assert.notEqual(op.isString(''), false)
    });
    it("Checked Value Is Number, Test is Sucess Happy Flow", () => {
        assert.notEqual(op.isNumber(20), false)
    });
    it("Checked Value Is Undefine, Test is Sucess Happy Flow", () => {
        assert.notEqual(op.isUndefine(undefined), false)
    });
});
// ------------- Type CHecking ------------------------------
describe("Checking For POSITIVE Type Checking", () => {
    it("Checked Value Is String Type", () => {
        assert.equal(op.isStringType('yaswanth'), true)
    });
    it("Checked Value Is Number Type", () => {
        assert.equal(op.isNumberType(20), true)
    });
    // it("Checked Value Is Number Type", () => {
    //     expect(op.isNumberType(20)).to.be.a('number')
    // });
});

describe("Checking For NEGATIVE Type Checking", () => {
    it("Checked Value Is String Type", () => {
        assert.notEqual(op.isStringType('yaswanth'), false)
    });
    it("Checked Value Is Number Type", () => {
        assert.notEqual(op.isNumberType(20), false)
    });
});

// ------------BDD Test By Chai with Expect & Should------------------
var name = "yaswanth";
var obj = { cars: ["audi", "benz", "bmw"] }

// ------------- with Expect---------------
describe("Checking NAME & OBJ Test Cases With Expect ", () => {
    it("Yes, NAME is a String", () => {
        expect(name).to.be.a('string');
    });
    it("Checking name = obj", () => {
        expect(name).to.equal('yaswanth')
    });
    it("Checking length of name is 8", () => {
        expect(name).is.lengthOf(8)
    });
    it("Checking length of name is obj", () => {
        expect(obj).to.have.property('cars').with.lengthOf(3)
    });
});

// ------------ with Should------------------
describe("Checking NAME & OBJ Test Cases With Should", () => {
    it("Yes, NAME is a String", () => {
        name.should.be.a('string');
    });
    it("Checking name = obj", () => {
        name.should.to.equal('yaswanth')
    });
    it("Checking length of name is 8", () => {
        name.should.have.lengthOf(8)
    });
    it("Checking length of name is obj", () => {
        obj.should.have.property('cars').with.lengthOf(3)
    });
});
// ------------ LogIn Success-----------------
describe("Checkig Login Credintials", () => {
    it("Login Success", () => {
        assert.equal(op.logIn("cyr@gmail.com", "cyr@1"), true)
    })
});