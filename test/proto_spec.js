'use strict';

var _ = require('../lib/proto')
	, assert = require('assert');

function throwError() { throw new Error(); }
function doNothing() {}

describe('proto object library', function() {
	it('should define extendProto function', function() {
		function TestObject() {
			this.property = 1;
		}

		_.extendProto(TestObject, {
			method: throwError,
			method2: doNothing
		});

			assert.throws(TestObject.prototype.method, 'prototype should be extended');
			assert.doesNotThrow(TestObject.prototype.method2, 'prototype should be extended');

			assert.doesNotThrow(function(){
				for (var p in TestObject.prototype)
					throw new Error;
			}, 'properties should be non-enumerable');

		var obj = new TestObject;

			assert.throws(obj.method, 'object methods can be called');
			assert.doesNotThrow(obj.method2, 'object methods can be called');

			assert.doesNotThrow(function() {
				for (var p in obj)
					if (p != 'property')
						throw new Error;
			}, 'methods should be non-enumerable');
	});


	it('should define extend function', function() {
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

		var obj3 = new TestObject;
		Object.defineProperty(obj3, 'prop3', {
			enumerable: false,
			value: 3
		});

		_.extend(obj, obj3, true); // only enumerable properties

		assert.notEqual(obj.prop3, 3, 'non-enumerable properties should NOT be copied if onlyEnumerable is truthy');

		_.extend(obj, obj3); // all properties

		assert.equal(obj.prop3, 3, 'non-enumerable properties should be copied if onlyEnumerable is falsy');

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


	it('should define clone function', function() {
		function TestObject() { this.property = 0; };
		var obj = new TestObject;
		obj.prop1 = 1;

		var obj2 = _.clone(obj);

			assert(obj2 instanceof TestObject, 'cloned object should be of the same class');
	});


	it('should define createSubclass function', function() {
		function TestObject() { this.property = 1; };
		TestObject.method = throwError;
		TestObject.classMethod = throwError;

		var TestSubclass = _.createSubclass(TestObject, 'TestSubclass');

			assert(TestSubclass.prototype instanceof TestObject);
			assert.throws(TestSubclass.method, 'class method of superclass should be copied');
			assert.equal(TestSubclass.name, 'TestSubclass');

		var obj = new TestSubclass;

			assert(obj instanceof TestObject, 'objects should be instances of ancestor class');
			assert.equal(obj.property, 1, 'constructor of superclass should be called');
			assert.throws(obj.method, 'instance method of superclass should be available');

		var TestSubclass2 = _.createSubclass(TestObject, '', false);

			assert.equal(TestSubclass2.name, '');

		var obj2 = new TestSubclass2;

			assert(obj2 instanceof TestObject, 'objects should be instances of ancestor class');
			assert.equal(obj2.property, undefined, 'constructor of superclass should NOT be called');

		var TestSubclass3 = _.createSubclass(TestObject);
		
		var obj3 = new TestSubclass3;

			assert(obj3 instanceof TestObject, 'objects should be instances of ancestor class');
			assert.equal(obj3.property, 1, 'constructor of superclass should be called');
	});


	it.skip('should define makeSubclass method', function() {

	});


	it('should define keyOf function', function() {
		var self = {
			a: 1,
			b: 2,
		};

		Object.defineProperty(self, 'nonenum', {
			enumerable: false,
			value: 3
		});

		assert.equal(_.keyOf(self, 1), 'a', 'should find property value');
		assert.equal(_.keyOf(self, 3), 'nonenum',
			'should find non-enumerable property value');
		assert.equal(_.keyOf(self, 3, true), undefined,
			'should NOT find non-enumerable property value if nonEnumerable true is specified');
	});


	it('should define allKeysOf function', function() {
		var self = {
			a: 1,
			b: 2,
			c: 2,
			d: 3
		};

		Object.defineProperty(self, 'nonenum', {
			enumerable: false,
			value: 3
		});

		var keys = _.allKeysOf(self, 2);

			assert.notEqual(keys.indexOf('b'), -1, 'should find keys for a given property value')
			assert.notEqual(keys.indexOf('c'), -1, 'should find keys for a given property value')

		var keys = _.allKeysOf(self, 3);

			assert.notEqual(keys.indexOf('d'), -1, 'should find ALL keys for a given property value')
			assert.notEqual(keys.indexOf('nonenum'), -1, 'should ALL find keys for a given property value')

		var keys = _.allKeysOf(self, 3, true); // enumerable only

			assert.notEqual(keys.indexOf('d'), -1,
				'should find enumerable keys for a given property value if nonEnumerable true is specified')
			assert.equal(keys.indexOf('nonenum'), -1,
				'should NOT find non-enumerable keys for a given property value if nonEnumerable true is specified')
	});


	it('should define eachKey function', function() {
		var self = {
			a: 1,
			b: 2,
		};

		Object.defineProperty(self, 'nonenum', {
			enumerable: false,
			value: 3
		});

		var result, thisArg;
		function callback(value, key, obj) {
			result[key] = value;
			assert.equal(obj, self, 'iterated object should be passed as the third parameter');
			assert.equal(this, thisArg, 'context should be correctly set from the third parameter of eachKey');
		}

		var result = {}, thisArg = this;
		_.eachKey(self, callback, thisArg); // iterate over all properties

			assert.deepEqual(result, { a: 1, b: 2, nonenum: 3 }, 'ALL properties should be used in iteration');

		var result = {}, thisArg = null;
		_.eachKey(self, callback, thisArg, true); // iterate over enumerable properties

			assert.deepEqual(result, { a: 1, b: 2 }, 'only enumerable properties should be used in iteration');

		function TestClass() {};
		TestClass.prototype.protoProp = 4;
		self = new TestClass;
		self.a = 1
		self.b = 2
		Object.defineProperty(self, 'nonenum', {
			enumerable: false,
			value: 3
		});

		var result = {}, thisArg = undefined;
		_.eachKey(self, callback); // iterate over all properties

			assert('protoProp' in self);
			assert.deepEqual(result, { a: 1, b: 2, nonenum: 3 }, 'prototype properties should NOT be used in iteration');

	});


	it('should define mapKeys function', function() {
		var self = {
			a: 1,
			b: 2
		};

		Object.defineProperty(self, 'nonenum', {
			enumerable: false,
			value: 3
		});

		var result, thisArg;
		function callback(value, key, obj) {
			assert.equal(obj, self, 'iterated object should be passed as the third parameter');
			assert.equal(this, thisArg, 'context should be correctly set from the third parameter of eachKey');
			return value * 10;
		}

		var thisArg = this;
		var result = _.mapKeys(self, callback, thisArg); // iterate over all properties

			assert.deepEqual(result, {
				a: 10,
				b: 20
			}, 'ALL properties should be used in iteration');
			assert.equal(result.a, 10, 'ALL properties should be used in iteration');
			assert.equal(result.b, 20, 'ALL properties should be used in iteration');
			assert.equal(result.nonenum, 30, 'ALL properties should be used in iteration');

		var thisArg = null;
		var result = _.mapKeys(self, callback, thisArg, true); // iterate over enumerable properties

			assert.equal(result.a, 10, 'only enumerable properties should be used in iteration');
			assert.equal(result.b, 20, 'only enumerable properties should be used in iteration');
			assert.equal(result.nonenum, undefined, 'only enumerable properties should be used in iteration');

		function TestClass() {};
		TestClass.prototype.protoProp = 4;
		self = new TestClass;
		self.a = 1
		self.b = 2

		var thisArg = undefined;
		var result = _.mapKeys(self, callback); // iterate over all properties

			assert('protoProp' in self);
			assert.equal(result.protoProp, undefined, 'only enumerable properties should be used in iteration');
			assert.equal(result.a, 10, 'only enumerable properties should be used in iteration');
			assert.equal(result.b, 20, 'only enumerable properties should be used in iteration');
	});

	
	it.skip('should define appendArray function', function() {
		// TODO
	});


	it.skip('should define prependArray function', function() {
		// TODO
	});


	it('should define toArray function', function() {
		var arrayLikeObject = {};
		arrayLikeObject[0] = 2;
		arrayLikeObject[1] = 5;
		arrayLikeObject[2] = 8;
		arrayLikeObject.length = 3;

		var arr = _.toArray(arrayLikeObject);

		assert(Array.isArray(arr), 'should convert arrayLikeObject to array');
		assert.deepEqual(arr, [2, 5, 8], 'should convert arrayLikeObject to array');
	});


	it.skip('should define firstUpperCase function', function() {
		// TODO
	});


	it.skip('should define firstLowerCase function', function() {
		// TODO
	});
});
