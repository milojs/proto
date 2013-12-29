'use strict';

var _ = require('../lib/proto')
	, assert = require('assert')
	, perfTest = require('./perf');


describe('Function functions', function() {
	it('should define makeFunction function', function() {
		var myFunc = _.makeFunction('myFunc', 'a', 'b', 'c'
									, 'return a + b + c;');

		assert(myFunc instanceof Function);
		assert.doesNotThrow(myFunc);
		assert.equal(myFunc.name, 'myFunc');
		assert.equal(myFunc('1_', '2_', '3_'), '1_2_3_');
	});


	it('should define partial function', function() {
		function testFunc(a,b,c) {
			return a + b + c;
		}

		var testPartial = _.partial(testFunc, 'my ');

			assert.equal(testFunc('my ', 'partial ', 'function'),
						testPartial('partial ', 'function'));

		var testPartial2 = _.partial(testFunc, 'my ', 'partial ');

			assert.equal(testFunc('my ', 'partial ', 'function'),
						testPartial2('function'));
	});


	it('should define partialRight function', function() {
		function testFunc(a,b,c) {
			return a + b + c;
		}

		var testPartial = _.partialRight(testFunc, 'function');

			assert.equal(testFunc('my ', 'partial ', 'function'),
						testPartial('my ', 'partial '));

		var testPartial2 = _.partialRight(testFunc, 'partial ', 'function');

			assert.equal(testFunc('my ', 'partial ', 'function'),
						testPartial2('my '));
	});


	it('should define memoize function', function() {
		var called = 0;

		function factorial(x) {
			called++;
			return x <= 0 ? 1 : x * fastFactorial(x-1);
		}

		var fastFactorial = _.memoize(factorial, undefined, 11);

			var fact10 = factorial(10);
			assert.equal(fastFactorial(10), fact10, 'should return the same result');

		called = 0;

			assert.equal(fastFactorial(10), fact10, 'should return the same result when called second time');
			assert.equal(called, 0, 'should take the value from cache without calling original function');
			assert.equal(fastFactorial(11), fact10 * 11, 'should return correct result');
			assert.equal(called, 1, 'should be called with new value');

		called = 0;

			assert.equal(fastFactorial(11), fact10 * 11, 'should return correct result');
			assert.equal(called, 0, 'should not be called with old value');

		called = 0;

			assert.equal(fastFactorial(0), 1, 'should return correct result');
			assert.equal(called, 1, 'should be called again as the first key will be pushed out of cache');


		function testFunc(a, b) {
			called += 1;
			return a + b;
		}

		function hashFunc (a, b) {
			return a + b;			
		}

		var memoTestFunc = _.memoize(testFunc, hashFunc);

		var result = testFunc(10, 20);
		assert.equal(memoTestFunc(10, 20), result);

		called = 0;
			assert.equal(memoTestFunc(10, 20), result);
			assert.equal(called, 0, 'should not be called with same hash');
	});

	
	it('should allow chaining of partial and memoize', function() {
		var called = 0;

		function testFunc(a, b) {
			called++;
			return a + b;
		}

		var myFunc = _(testFunc).partial('my ').memoize()._();

			assert.equal(testFunc('my ', 'function'),
						myFunc('function'));

		called = 0;

			assert.equal(myFunc('function'), 'my function');
			assert.equal(called, 0, 'value should be taken from cache');

		perfTest(
			function(){
				var myFunc = _(testFunc).partial('my ').memoize()._();
			},
			function() {
				var myFunc = _.partial(testFunc, 'my ')
				myFunc = _.memoize(myFunc);
			}
		);
	});
});
