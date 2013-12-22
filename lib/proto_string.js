'use strict';

/**
 * - [firstUpperCase](string.js.html#firstUpperCase)
 * - [firstLowerCase](string.js.html#firstLowerCase)
 */
 var stringFunctions = module.exports = {
	firstUpperCase: firstUpperCase,
	firstLowerCase: firstLowerCase
};


/**
 * Returns string with the first character changed to upper case.
 *
 * @param {String} str A string that will have its first character replaced
 */
function firstUpperCase(str) {
	return str[0].toUpperCase() + str.slice(1);
}


/**
 * Returns string with the first character changed to lower case.
 *
 * @param {String} str A string that will have its first character replaced
 */
function firstLowerCase(str) {
	return str[0].toLowerCase() + str.slice(1);
}
