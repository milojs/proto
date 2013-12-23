'use strict';

/**
 * - [partial](function.js.html#partial)
 * - [memoize](function.js.html#memoize)
 *
 * These methods can be [chained](_.js.html#Proto)
 */
var functionMethods = module.exports = {
	partial: partial,
	memoize: memoize
};


/**
 * Creates a function as a result of partial function application with the passed parameters.
 *
 * @param {Function} func Function to be applied
 * @param {List} arguments Arguments after self will be prepended to the original function call when the partial function is called.
 * @return {Function}
 */
function partial() { // , ... arguments
	var func = this;
	var args = Array.prototype.slice.call(arguments);
	return function() {
		return func.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	}
}


/**
 * Creates a memoized version of the function using supplied hash function as key. If the hash is not supplied, uses its first parameter as the hash.
 * 
 * @param {Function} func function to be memoized
 * @param {Function} hashFunc optional hash function that is passed all function arguments and should return cache key.
 * @param {Integer} limit optional maximum number of results to be stored in the cache. 1000 by default.
 * @return {Function} memoized function
 */
function memoize(hashFunc, limit) {
	var func = this;
	var cache = {}, keysList = [];
	limit = limit || 1000;

	return function() {
		var key = hashFunc ? hashFunc.apply(this, arguments) : arguments[0];
		if (cache.hasOwnProperty(key))
			return cache[key];

		var result = cache[key] = func.apply(this, arguments);
		keysList.push(key);

		if (keysList.length > limit)
			delete cache[keysList.shift()];

		return result;
	};
}
