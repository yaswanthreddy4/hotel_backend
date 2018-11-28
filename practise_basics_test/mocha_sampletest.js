let operations = require('./operations');
let assert = require('assert');

describe("Addition Bock", () => {
    it("Test Success 1st Happy Flow", () => {
        assert.equal(30, operations.addition(10, 20));
    });
    it("Test Success 2nd Happy Flow", () => {
        assert.notEqual(40, operations.addition(20, 10));
    });
    it("Test Sucess 3rd Happy Flow", () => {
        assert.deepStrictEqual(30, operations.addition(10, 20));
    });
});

describe("Subtraction Block", () => {
    it("Test Success 1st Happy Flow", () => {
        assert.equal(-10, operations.subtraction(10, 20));
    });
    it("Test Success 2nd Happy Flow", () => {
        assert.notEqual(30, operations.subtraction(-20, 10));
    });
    it("Test Sucess 3rd Happy Flow", () => {
        assert.deepStrictEqual(10, operations.subtraction(-10, -20));
    });
});

describe("Multiplication Block", () => {
    it("Test Success 1st Happy Flow", () => {
        assert.equal(-200, operations.multiplication(-10, 20));
    });
    it("Test Success 2nd Happy Flow", () => {
        assert.notEqual(30, operations.multiplication(-20, 10));
    });
    it("Test Sucess 3rd Happy Flow", () => {
        assert.deepStrictEqual(200, operations.multiplication(-10, -20));
    });
});

describe("Division Block", () => {
    it("Test Success 1st Happy Flow", () => {
        assert.equal(0.5, operations.division(10, 20));
    });
    it("Test Success 2nd Happy Flow", () => {
        assert.notEqual(2, operations.division(30, 10));
    });
    it("Test Sucess 3rd Happy Flow", () => {
        assert.deepStrictEqual(5, operations.division(1000, 200));
    });
})