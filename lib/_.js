'use strict';


/**
 * [__Prototype functions__](prototype.js.html)
 *
 * - [extendProto](prototype.js.html#extendProto)
 * - [createSubclass](prototype.js.html#createSubclass)
 * - [makeSubclass](prototype.js.html#makeSubclass)
 */
var	prototypeFunctions = require('./prototype');


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
var	objectFunctions = require('./object');


/**
 * [__Array functions__](array.js.html)
 *
 * - [appendArray](array.js.html#appendArray)
 * - [prependArray](array.js.html#prependArray)
 * - [toArray](array.js.html#toArray)
 */
var	arrayFunctions = require('./array');


/**
 * [__String functions__](string.js.html)
 *
 * - [firstUpperCase](string.js.html#firstUpperCase)
 * - [firstLowerCase](string.js.html#firstLowerCase)
 */
var	stringFunctions = require('./string');


/**
 * [__Function functions__](function.js.html)
 *
 * - [partial](function.js.html#partial)
 * - [memoize](function.js.html#memoize)
 */
var	functionFunctions = require('./function');


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
 * In cases when performance is critical, chaining should NOT be used,as it can be 1.5-5 times slower, depending on the number of parameters and the number of functions chained.
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


// extend Proto with functions from different modules
objectFunctions.extend(Proto, objectFunctions);
_.extend(Proto, prototypeFunctions);
_.extend(Proto, arrayFunctions);
_.extend(Proto, stringFunctions);
_.extend(Proto, functionFunctions);


// create instance methods for wrapped Proto object to allow chaining
var protoInstanceMethods = {};
Object.keys(Proto).forEach(function(funcName) {
	protoInstanceMethods[funcName] = function() {
		// add wrapped value to the beginning of parameters list
		Array.prototype.unshift.call(arguments, this.self);
		// call _ function with prepended arguments
		var result = Proto[funcName].apply(Proto, arguments);
		// replace wrapped object
		this.self = result;
		// return wrapped object
		return this;
	};
});

// add _ method to unwrap
protoInstanceMethods._ = function() {
	return this.self;
};

_.extendProto(Proto, protoInstanceMethods);


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
