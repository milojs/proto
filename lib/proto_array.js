'use strict';

var __ = require('./proto_object')
	, utils = require('./utils');


/**
 * - [appendArray](#appendArray)
 * - [prependArray](#prependArray)
 * - [toArray](#toArray)
 * - [object](#object)
 * - [mapToObject](#mapToObject)
 *
 * Functions that Array [implements natively](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods) are also included for convenience - they can be used with array-like objects and for chaining (native functions are always called)
 * All these methods can be [chained](_.js.html#Proto).
 */
var arrayMethods = module.exports = {
	appendArray: appendArray,
	prependArray: prependArray,
	toArray: toArray,
	object: object,
	mapToObject: mapToObject
};


var nativeArrayMethodsNames = [ 'join', 'pop', 'push', 'concat',
	'reverse', 'shift', 'unshift', 'slice', 'splice',
	'sort', 'filter', 'forEach', 'some', 'every',
	'map', 'indexOf', 'lastIndexOf', 'reduce', 'reduceRight'];

var nativeArrayMethods = mapToObject.call(nativeArrayMethodsNames,
		function(methodName) {
			return Array.prototype[methodName];
		});

__.extend.call(arrayMethods, nativeArrayMethods);


/**
 * Appends `arrayToAppend` to the end of array `self` in place (can be an instance of Array or array-like object).
 * Changes the value of `self` (it uses `Array.prototype.splice`) and returns `self`.
 *
 * @param {Array} self An array that will be modified
 * @param {Array|Array-like} arrayToAppend An array that will be appended
 * @return {Array}
 */
function appendArray(arrayToAppend) {
	if (! arrayToAppend.length) return this;

    var args = [this.length, 0].concat(arrayToAppend);
    Array.prototype.splice.apply(this, args);

    return this;
}


/**
 * Prepends `arrayToPrepend` to the beginnig of array `self` in place (can be an instance of Array or array-like object).
 * Changes the value of `self` (it uses `Array.prototype.splice`) and returns `self`.
 *
 * @param {Array} self An array that will be modified
 * @param {Array|Array-like} arrayToAppend An array that will be prepended
 * @return {Array}
 */
function prependArray(arrayToPrepend) {
	if (! arrayToPrepend.length) return this;

    var args = [0, 0].concat(arrayToPrepend);
    Array.prototype.splice.apply(this, args);

    return this;
}


/**
 * Returns new array created from array-like object (e.g., `arguments` pseudo-array).
 *
 * @param {Array-like} self Object with numeric property length
 * @return {Array}
 */
function toArray() {
	return Array.prototype.slice.call(this);
}


/**
 * Returns an object created from the array of `keys` and optional array of `values`.
 *
 * @param {Array} self Array of keys
 * @param {Array|any} values Optional array of values or the value to be assigned to each property.
 * @return {Object}
 */
function object(values) {
	var obj = {}
		, valuesIsArray = Array.isArray(values);
	this.forEach(function(key, index) {
		obj[key] = valuesIsArray ? values[index] : values;
	});

	return obj;
}


/**
 * Maps array to object.
 * Array elements become keys, value are taken from `callback`.
 * 
 * @param {Array} self An object which values will become keys of the result
 * @param {Function} callback Callback is passed `value`, `index` and `self` and should return value that will be included in the result.
 * @param {Object} thisArg An optional context of iteration (the valueof `this`), will be undefined if this parameter is not passed.
 * @return {Object}
 */
function mapToObject(callback, thisArg) {
	var result = {};
	this.forEach(function(value, index) {
		result[value] = callback.call(thisArg, value, index, this);
	}, this);
	return result;
}
