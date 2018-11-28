let assert = require('assert');
let add = require('./operations')

// assert(Value, 'Message');

assert(true, 'Test Is Success & 1st Happy Flow');
// assert(false, 'Test Is Fail & 2nd Sad Flow');

assert.ok(true, 'Test Is Success & 3rd Happy Flow');
// assert.ok(false, 'Test Is Fail & 4th Sad Flow');

assert.equal(6, add.addition(2, 4), 'Test Is Success & 5th Happy Flow');
assert.equal("yaswanth", "yaswanth", 'Test Is Success & 6th Happy Flow');

assert.equal("6", 6, 'Test Is Success & 7th Happy Flow');
assert.deepEqual("6", 6, 'Test Is Success & 8th Happy Flow');
assert.notDeepStrictEqual("6", 6, 'Test Is Success & 7th Happy Flow');

assert.notEqual("Yaswanth", "yaswanth", 'Test Is Success & 9th Happy Flow');
assert.notEqual(2, 5, 'Test Is Success & 10th Happy Flow')
assert.notDeepEqual(2, 5, 'Test Is Success & 11th Happy Flow');


assert.strictEqual("6", '6', 'Test Is Success & 7th Happy Flow');



// assert.fail(6, add.addition(2, 4), 'Test Is Success & 10th Happy Flow')