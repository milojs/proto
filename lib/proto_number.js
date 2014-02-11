'use strict';

/**
 * - [isNumeric](#isNumeric)
 */
var numberMethods = module.exports = {
	isNumeric: isNumeric
};


/**
 * Function to test if a value is numeric
 *
 * @param {Any} self value to be tested
 * @return {Boolean} true if it is a numeric value
 */
function isNumeric(val) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
