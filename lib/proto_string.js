'use strict';

/**
 * - [firstUpperCase](#firstUpperCase)
 * - [firstLowerCase](#firstLowerCase)
 * - [toRegExp](#toRegExp)
 * - [toFunction](#toFunction)
 */
 var stringMethods = module.exports = {
    firstUpperCase: firstUpperCase,
    firstLowerCase: firstLowerCase,
    toRegExp: toRegExp,
    toFunction: toFunction,
    toQueryString: toQueryString,
    fromQueryString: fromQueryString
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


/**
 * Converts string created by `toString` method of RegExp back to RegExp
 *
 * @param {String} self string containing regular expression including enclosing "/" symbols and flags
 * @return {RegExp}
 */
function toRegExp() {
    var rx = this.match(regexpStringPattern);
    if (rx) return new RegExp(rx[1], rx[2]);
}
var regexpStringPattern = /^\/(.*)\/([gimy]*)$/;


/**
 * Converts string created by `toString` method of function back to function
 *
 * @param {String} self string containing full function code
 * @return {Function}
 */
function toFunction() {
    var func;
    var code = 'func = ' + this + ';';
    try {
        eval(code);
        return func;
    } catch(e) {
        return;
    }
}


/**
 * Convert params object to a url style query string
 * @param  {Object} self The object hash to be converted
 * @return {String} the resulting query string
 */
function toQueryString() {
    var qs = ''
        , params = this;

    for (var key in params) {
        var val = params[key];
        qs += key + '=' + encodeURIComponent(val) + '&';
    }
    return '?' + qs.substring(0, qs.length-1);
}


/**
 * Convert url style query string into object hash
 * @param  {String} self The string to be converted
 * @return {Object} The resulting object hash
 */
function fromQueryString() {
    var pairs = this.slice(1).split('&')
        , results = {};
    pairs.forEach(function(pair) {
        var splitPair = pair.split('=')
            , key = splitPair[0]
            , val = decodeURIComponent(splitPair[1] || '');
        results[key] = val;
    });

    return results;
}
