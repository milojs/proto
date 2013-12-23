'use strict';

var utils = require('./utils');


/**
 * [__Prototype functions__](prototype.js.html)
 *
 * - [extendProto](prototype.js.html#extendProto)
 * - [createSubclass](prototype.js.html#createSubclass)
 * - [makeSubclass](prototype.js.html#makeSubclass)
 */
var	prototypeMethods = require('./proto_prototype');


/**
 * [__Object functions__](object.js.html)
 *
 * - [extend](object.js.html#extend)
 * - [clone](object.js.html#clone)
 * - [defineProperty](object.js.html#defineProperty)
 * - [defineProperties](object.js.html#defineProperties)
 * - [deepExtend](object.js.html#deepExtend)
 * - [allKeys](object.js.html#allKeys)
 * - [keyOf](object.js.html#keyOf)
 * - [allKeysOf](object.js.html#allKeysOf)
 * - [eachKey](object.js.html#eachKey)
 * - [mapKeys](object.js.html#mapKeys)
 */
var	objectMethods = require('./proto_object');


/**
 * [__Array functions__](array.js.html)
 *
 * - [appendArray](array.js.html#appendArray)
 * - [prependArray](array.js.html#prependArray)
 * - [toArray](array.js.html#toArray)
 * - [object](array.js.html#object)
 *
 * Functions that Array [implements natively](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods) are also added - they can be used with array-like objects and for chaining (native functions are always called).
 */
var	arrayMethods = require('./proto_array');


/**
 * [__Function functions__](function.js.html)
 *
 * - [partial](function.js.html#partial)
 * - [memoize](function.js.html#memoize)
 */
var	functionMethods = require('./proto_function');


/**
 * [__String functions__](string.js.html)
 *
 * - [firstUpperCase](string.js.html#firstUpperCase)
 * - [firstLowerCase](string.js.html#firstLowerCase)
 */
var	stringMethods = require('./proto_string');


/**
 * Chaining
 * ========
 *
 * `_` can be used to create a wrapped value (object, function, array, etc.) to allow chaining of Proto functions.
 * To unwrap, `_` method of a wrapped value should be used.
 * Usage:
 * ```
 * var arr = _({ 0: 3, 1: 4, 2: 5, length: 3})
 *				.toArray()
 *				.prependArray([1, 2])
 *				.appendArray([6, 7, 8])
 *				._();
 * ```
 * A wrapped object is an instance of `_` (`Proto` class).
 *
 * Chaining is implemented for development convenience, but it has performance overhead, not only to wrap and unwrap values but in each function call.
 * Proto functions are not implemented as methods of Proto instance, they add wrapped value as the first parameter to each function call using `Array.prototype.unshift`.
 * In cases when performance is critical, chaining should NOT be used, as it can be 1.5-5 times slower, depending on the number of parameters and the number of functions chained.
 *
 * @param {Any} self A value to be wrapped
 * @return {Proto}
 */
function Proto(self) {
	// wrap passed parameter in _ object
	var wrapped = Object.create(Proto.prototype);
	wrapped.self = self;
	return wrapped;
};

var _ = Proto;


var __ = {};
// extend __ with functions from different modules
objectMethods.extend.call(__, objectMethods, true);
__.extend.call(__, prototypeMethods, true);
__.extend.call(__, arrayMethods, true);
__.extend.call(__, stringMethods, true);
__.extend.call(__, functionMethods, true);


// create instance methods for wrapped Proto object to allow chaining
var protoInstanceMethods = {};

// add _ method to unwrap
protoInstanceMethods._ = function() {
	return this.self;
};


addFuncsAndMethodsToProto(prototypeMethods);
addFuncsAndMethodsToProto(objectMethods);
addFuncsAndMethodsToProto(arrayMethods);
addFuncsAndMethodsToProto(functionMethods);
addFuncsAndMethodsToProto(stringMethods);


__.extendProto.call(Proto, protoInstanceMethods);

// add native array functions
__.extend.call(Proto, arrayMethods.__nativeFunctions, true);

// allow chaining for native array methods
var protoInstanceArrayMethods =
		__.mapKeys.call(
			arrayMethods.__nativeMethods,
			utils.makeProtoInstanceMethod);

__.extendProto.call(Proto, protoInstanceArrayMethods);



function addFuncsAndMethodsToProto(methodsMap) {
	__.eachKey.call(methodsMap, function(method, methodName) {
		Proto[methodName] = utils.makeProtoFunction(method);
		__.defineProperty.call(Proto.prototype, methodName,
			utils.makeProtoInstanceMethod(method));
	}, true);
}


/**
 * In windows environment, a global `_` value is preserved in `_.underscore`
 */
if (typeof window == 'object') {
	// preserve existing _ object
	if (window._)
		Proto.underscore = window._

	// expose global _
	window._ = Proto;
}

if (typeof module == 'object' && module.exports)
	// export for node/browserify
	module.exports = Proto;
