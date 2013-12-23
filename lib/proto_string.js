'use strict';

/**
 * - [firstUpperCase](string.js.html#firstUpperCase)
 * - [firstLowerCase](string.js.html#firstLowerCase)
 */
 var stringMethods = module.exports = {
	firstUpperCase: firstUpperCase,
	firstLowerCase: firstLowerCase
};


/**
 * Returns string with the first character changed to upper case.
 *
 * @param {String} self A string that will have its first character replaced
 */
function firstUpperCase() {
	return this[0].toUpperCase() + this.slice(1);
}


/**
 * Returns string with the first character changed to lower case.
 *
 * @param {String} self A string that will have its first character replaced
 */
function firstLowerCase() {
	return this[0].toLowerCase() + this.slice(1);
}
