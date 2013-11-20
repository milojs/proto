var _ = require('../proto')
	, assert = require('assert');

describe('proto object library', function() {
	it('should have extendProto function', function() {
		function TestObject() {
			this.property = 1;
		}

		function throwError() { throw new Error(); }

		function doNothing() {}

		_.extendProto(TestObject, {
			method: throwError,
			method2: doNothing
		});

		assert.equal(throwError, TestObject.prototype.method, 'prototype should be extended');
		assert.equal(doNothing, TestObject.prototype.method2, 'prototype should be extended');

		assert.doesNotThrow(function(){
			for (var p in TestObject.prototype)
				throw new Error;
		}, 'properties should be non-enumerable');

		var obj = new TestObject;

		assert.throws(function() { obj.method(); }, 'object methods can be called');
		assert.doesNotThrow(function() { obj.method2(); }, 'object methods can be called');

		assert.doesNotThrow(function() {
			for (var p in obj)
				if (p != 'property')
					throw new Error;
		}, 'methods should be non-enumerable');
	});

	it('should have extend function', function() {
		function TestObject() { this.property = 0; };
		function TestObject2() { this.property = 0; };
		var obj = new TestObject;
		var obj2 = new TestObject2;

		obj.prop1 = 1;
		obj2.prop2 = 2;

		_.extend(obj, obj2);

		assert.equal(obj.prop1, 1 , 'properties should be copied');
		assert.equal(obj.prop2, 2 , 'properties should be copied');

		Object.defineProperty(obj2, 'nonEnum', {
			enumerable: false,
			value: 3
		});

		_.extend(obj, obj2);

		assert.equal(obj.nonEnum, 3 , 'non-enumerable properties should be copied');
		assert.doesNotThrow(function() {
			for (var p in obj)
				if (p == 'nonEnum')
					throw new Error;
		}, 'non-enumerable should be copied as non-enumerable');

		Object.defineProperty(TestObject2.prototype, 'enum', {
			enumerable: true,
			value: 4
		});

		assert.throws(function() {
			for (var p in obj2)
				if (p == 'enum')
					throw new Error;
		}, 'enumerable prototype properties should be enumerated too - more like JS test');

		_.extend(obj, obj2);

		assert.equal(obj2.enum, 4, 'prototype property is visible via object');
		assert.equal(obj.enum, undefined, 'enumerable prototype properties should NOT be copied');
	});

	it('should have clone function', function() {
		function TestObject() { this.property = 0; };
		var obj = new TestObject;
		obj.prop1 = 1;

		var obj2 = _.clone(obj);

		assert(obj2 instanceof TestObject, 'cloned object should be of the same class');
		
	});
});
