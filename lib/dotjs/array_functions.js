'use strict';
module.exports = {
    appendArray: appendArray,
    prependArray: prependArray,
    toArray: toArray,
    object: object,
    mapToObject: mapToObject,
    spliceItem: spliceItem
};
/**
 * Appends `sourceArr` to the end of array `self` in place (can be an instance of Array or array-like object).
 * Changes the value of `self` (it uses `Array.prototype.splice`) and returns `self`.
 *
 * @param {Array} self An array that will be modified
 * @param {Array} sourceArr An array that will be appended
 * @return {Array}
 */
function appendArray(self, sourceArr) {
    if (!sourceArr.length) return self;
    if (!Array.isArray(sourceArr)) sourceArr = Array.prototype.slice.call(sourceArr);
    var args = [self.length, 0].concat(sourceArr);
    Array.prototype.splice.apply(self, args);
    return self;
}
/**
 * Prepends `sourceArr` to the beginnig of array `self` in place (can be an instance of Array or array-like object).
 * Changes the value of `self` (it uses `Array.prototype.splice`) and returns `self`.
 *
 * @param {Array} self An array that will be modified
 * @param {Array} sourceArr An array that will be prepended
 * @return {Array}
 */
function prependArray(self, sourceArr) {
    if (!sourceArr.length) return self;
    if (!Array.isArray(sourceArr)) sourceArr = Array.prototype.slice.call(sourceArr);
    var args = [0, 0].concat(sourceArr);
    Array.prototype.splice.apply(self, args);
    return self;
}
/**
 * Returns new array created from array-like object (e.g., `arguments` pseudo-array).
 *
 * @param {PseudoArray} self Object with numeric property length
 * @return {Array}
 */
function toArray(self) {
    return Array.prototype.slice.call(self);
}
/**
 * Returns an object created from the array of `keys` and optional array of `values`.
 *
 * @param {Array} self Array of keys
 * @param {Array|any} values Optional array of values or the value to be assigned to each property.
 * @return {Object}
 */
function object(self, values) {
    var obj = {};
    var valuesIsArray = Array.isArray(values);
    for (var i = 0; i < self.length; i++) obj[self[i]] = valuesIsArray ? values[i] : values;
    return obj;
}
/**
 * Maps array to object.
 * Array elements become keys, value are taken from `callback`.
 * 
 * @param {Array} self An array which values will become keys of the result
 * @param {Function} callback Callback is passed `value`, `index` and `self` and should return value that will be included in the result.
 * @param {Object} thisArg An optional context of iteration (the valueof `this`), will be undefined if this parameter is not passed.
 * @return {Object}
 */
function mapToObject(self, callback, thisArg) {
    var obj = {};
    for (var i = 0; i < self.length; i++) {
        var value = self[i];
        obj[value] = callback.call(thisArg, value, i, self);
    }
    return obj;
}
/**
 * Removes item from array that is found using indexOf (i.e. '===')
 * Modifies original array and returns the reference to it.
 * 
 * @param {Array} self An array that will be modified
 * @param  {Any} item item to be removed
 * @return {Array}
 */
function spliceItem(self, item) {
    var index = self.indexOf(item);
    if (index >= 0) self.splice(index, 1);
    return self;
}
