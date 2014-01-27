'use strict';

/**
 * - [makeFunction](#makeFunction)
 * - [partial](#partial)
 * - [partialRight](#partialRight)
 * - [memoize](#memoize)
 * - [delay](#delay)
 * - [defer](#defer)
 *
 * These methods can be [chained](proto.js.html#Proto)
 */
var functionMethods = module.exports = {
	makeFunction: makeFunction,
	partial: partial,
	partialRight: partialRight,
	memoize: memoize,
	delay: delay,
	defer: defer,
	debounce: debounce
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
 * @param {Function} self Function to be applied
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
 * @param {Function} self Function to be applied
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
 * @param {Function} self function to be memoized
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


/**
 * Delays function execution by a given time in milliseconds.
 * The context in function when it is executed is set to `null`.
 *
 * @param {Function} self function that execution has to be delayed
 * @param {Number} wait approximate dalay time in milliseconds
 * @param {List} arguments optional arguments that will be passed to the function
 */
function delay(wait) { // , arguments
    var args = slice.call(arguments, 1);
	return _delay(this, wait, args);
}
 

/**
 * Defers function execution (executes as soon as execution loop becomes free)
 * The context in function when it is executed is set to `null`.
 *
 * @param {Function} self function that execution has to be delayed
 * @param {List} arguments optional arguments that will be passed to the function
 */
function defer() { // , arguments
	return _delay(this, 1, arguments);
}

function _delay(func, wait, args) {
	return setTimeout(func.apply.bind(func, null, args), wait);
}


/**
 * Creates a function that will call original function once it has not been called for a specified time
 *
 * @param {Function} self function that execution has to be delayed
 * @param {Number} wait approximate dalay time in milliseconds
 * @param {Boolean} immediate true to invoke funciton immediately and then ignore following calls for wait milliseconds
 * @return {Function}
 */
function debounce(wait, immediate) {
	var func = this; // first parameter of _.debounce
    var timeout, args, context, timestamp, result;
    return function() {
		context = this; // store original context
		args = arguments;
		timestamp = Date.now();
		var callNow = immediate && ! timeout;
		if (! timeout)
			timeout = setTimeout(later, wait);
		if (callNow)
			result = func.apply(context, args);
		return result;

		function later() {
	        var last = Date.now() - timestamp;
	        if (last < wait)
	        	timeout = setTimeout(later, wait - last);
	        else {
	        	timeout = null;
	        	if (! immediate)
	        		result = func.apply(context, args);
	        }
		}
    };
};
