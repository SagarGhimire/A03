
QUnit.test('Testing function with several sets of inputs', function (assert) {

    assert.equal(wagecalculator(2, 2, 5), 4.2, 'Tested with positive numbers');

    assert.equal(wagecalculator(-1, 0, 2), "Number cannot be negative", 'Passing in a negative number and a zero raises an Error');

    assert.throws(wagecalculator(0, 0, 0), 0, 'Passing a zero value');

    assert.equal(wagecalculator(-1, -2, 2), "Number cannot be negative", 'Passing in a negative number raises an Error');

});