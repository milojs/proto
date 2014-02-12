'use strict';

/**
 * - [times](#times)
 * - [tap](#tap)
 */
var utilMethods = module.exports = {
	times: times,
	tap: tap
};


/**
 * Calls `callback` `self` times with `thisArg` as context. Callback is passed iteration index from 0 to `self-1`
 * 
 * @param {Integer} self
 * @param {Function} callback
 * @param {Any} thisArg
 * @return {Array}
 */
function times(callback, thisArg, collectResults) {
	var arr = Array(Math.max(0, this));
	for (var i = 0; i < this; i++)
		arr[i] = callback.call(thisArg, i);
    return arr;
}


/**
 * Function to tap into chained methods and to inspect intermediary result
 *
 * @param {Any} self value that's passed between chained methods
 * @param {Function} func function that will be called with the value
 * @return {Any}
 */
function tap(func) {
	func(this);
	return this;
};
