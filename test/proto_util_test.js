'use strict';

var _ = require('../lib/proto')
	, assert = require('assert');


describe('Utility functions', function() {
	it('should define tap function', function() {
		var obj = { a: 1, b: 2, c: 3 };

		var result = _(obj)
			.mapKeys(function(value) {
				return value * 10;
			})
			.tap(function(self) {
				assert.deepEqual(self, { a: 10, b: 20, c: 30 })
			})
			.allKeys()
			.tap(function(self) {
				assert.deepEqual(self, ['a','b','c']);
			})
			._();
		
		assert.deepEqual(result, ['a','b','c']);
	});
});
