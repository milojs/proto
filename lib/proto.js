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
 * - [mapToObject](array.js.html#mapToObject)
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
 * Although all Proto functions are implemented as methods operating on this and the overhead to redefine them as functions is very small, the overhead to redefine them as methods of wrapped value is slightly higher - chaining is 15-25% slower than using functions (properties of _ that take the first parameter).
 * In cases when performance is critical, you may want to avoid using chaining.
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


// store raw methods from different modules in __ object (double "_")
var __ = objectMethods.clone.call(objectMethods);
__.extend.call(__, prototypeMethods);
__.extend.call(__, arrayMethods);
__.extend.call(__, stringMethods);
__.extend.call(__, functionMethods);

// add __ as property of Proto, so they can be used as mixins in other classes
__.defineProperty(Proto, '__', __);


// add _ method to unwrap wrapped value (Proto instance)
function unwrapProto() { return this.self; }
__.extendProto.call(Proto, { _: unwrapProto });


// add functions that take first parameter instead of "this" and wrapped value instance methods to Proto
[ prototypeMethods, objectMethods, arrayMethods, functionMethods, stringMethods ]
	.forEach(addFuncsAndMethodsToProto);

function addFuncsAndMethodsToProto(methodsMap) {
	// make Proto functions
	var protoFuncs = __.mapKeys.call(methodsMap, utils.makeProtoFunction);
	__.extend.call(Proto, protoFuncs);

	// make Proto wrapped value methods
	var protoInstanceMethods = __.mapKeys.call(methodsMap,
								utils.makeProtoInstanceMethod);
	__.extendProto.call(Proto, protoInstanceMethods);
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
