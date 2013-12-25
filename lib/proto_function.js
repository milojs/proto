'use strict';

/**
 * - [makeFunction](#makeFunction)
 * - [partial](#partial)
 * - [partialRight](#partialRight)
 * - [memoize](#memoize)
 *
 * These methods can be [chained](proto.js.html#Proto)
 */
var functionMethods = module.exports = {
	makeFunction: makeFunction,
	partial: partial,
	partialRight: partialRight,
	memoize: memoize
};


var slice = Array.prototype.slice;


/**
 * Similarly to Function constructor creates a function from code.
 * Unlike Function constructor, the first argument is a function name
 *
 * @param {String} name new function name
 * @param {String} arg1, arg2, ... the names of function parameters
 * @param {String} funcBody function body
 * @return {Function}
 */
function makeFunction(arg1, arg2, funcBody) {
	var name = this
		, count = arguments.length - 1
		, funcBody = arguments[count]
		, func
		, code = '';
	for (var i = 0; i < count; i++)
		code += ', ' + arguments[i];
	code = ['func = function ', name, '(', code.slice(2), ') {\n'
				, funcBody, '\n}'].join('');
	eval(code);
	return func;
}


/**
 * Creates a function as a result of partial function application with the passed parameters.
 *
 * @param {Function} func Function to be applied
 * @param {List} arguments Arguments after self will be prepended to the original function call when the partial function is called.
 * @return {Function}
 */
function partial() { // , ... arguments
	var func = this;
	var args = slice.call(arguments);
	return function() {
		return func.apply(this, args.concat(slice.call(arguments)));
	}
}


/**
 * Creates a function as a result of partial function application with the passed parameters, but parameters are appended on the right.
 *
 * @param {Function} func Function to be applied
 * @param {List} arguments Arguments after self will be appended on the right to the original function call when the partial function is called.
 * @return {Function}
 */
function partialRight() { // , ... arguments
	var func = this;
	var args = slice.call(arguments);
	return function() {
		return func.apply(this, slice.call(arguments).concat(args));
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
