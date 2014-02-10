'use strict';

/**
 * - [tap](#tap)
 */
var utilMethods = module.exports = {
	tap: tap
};


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
