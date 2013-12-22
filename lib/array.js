'use strict';

var _ = require('./object');


/**
 * - [appendArray](#appendArray)
 * - [prependArray](#prependArray)
 * - [toArray](#toArray)
 *
 * Functions that Array [implements natively][Array methods] are not included.
 * All these methods can be [chained](_.js.html#Proto)
 */
var arrayFunctions = module.exports = {
	appendArray: appendArray,
	prependArray: prependArray,
	toArray: toArray
};


/**
 * Appends `arrayToAppend` to the end of array `self` in place (can be an instance of Array or array-like object).
 * Changes the value of `self` (it uses `Array.prototype.splice`) and returns `self`.
 *
 * @param {Array} self An array that will be modified
 * @param {Array|Array-like} arrayToAppend An array that will be appended
 * @return {Array}
 */
function appendArray(self, arrayToAppend) {
	if (! arrayToAppend.length) return self;

    var args = [self.length, 0].concat(arrayToAppend);
    Array.prototype.splice.apply(self, args);

    return self;
}


/**
 * Prepends `arrayToPrepend` to the beginnig of array `self` in place (can be an instance of Array or array-like object).
 * Changes the value of `self` (it uses `Array.prototype.splice`) and returns `self`.
 *
 * @param {Array} self An array that will be modified
 * @param {Array|Array-like} arrayToAppend An array that will be prepended
 * @return {Array}
 */
function prependArray(self, arrayToPrepend) {
	if (! arrayToPrepend.length) return self;

    var args = [0, 0].concat(arrayToPrepend);
    Array.prototype.splice.apply(self, args);

    return self;
}


/**
 * Returns new array created from array-like object (e.g., `arguments` pseudo-array).
 *
 * @param {Array-like} arrayLike An object with numeric property length
 * @return {Array}
 */
function toArray(arrayLike) {
	return Array.prototype.slice.call(arrayLike);
}
