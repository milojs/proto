'use strict';

var utils = module.exports = {
    makeProtoInstanceMethod: makeProtoInstanceMethod,
    makeProtoFunction: makeProtoFunction,
    makeFindMethod: makeFindMethod
}


function makeProtoInstanceMethod(method) {
    return function() {
        this.self = method.apply(this.self, arguments);
        return this;
    };
}


function makeProtoFunction(method) {
    return function() {
        // when the method is executed, the value of "this" will be arguments[0],
        // other arguments starting from #1 will passed to method as parameters.
        return method.call.apply(method, arguments);
    };
}


var _error = new Error;

/**
 * Returns `find` or `findIndex` method, depending on parameter
 *
 * @param {Function} eachMethod - method to use for iteration (forEach for array or eachKey for object)
 * @param {String} findWhat 'value' - returns find method of Array (implemented in ES6) or findValue method of Object, anything else = returns findIndex/findKey methods.
 * @return {Function}
 */
function makeFindMethod(eachMethod, findWhat) {
    var argIndex = findWhat == 'value' ? 0 : 1;

    return function findValueOrIndex(callback, thisArg) {
        var caughtError;
        try {
            eachMethod.call(this, testItem, thisArg);
        } catch (found) {
            if (found === _error) throw caughtError;
            else return found;
        }
        // if looking for index and not found, return -1
        if (argIndex && eachMethod == Array.prototype.forEach)
            return -1; 

        function testItem(value, index, self) {
            var test;
            try {
                test = callback.call(this, value, index, self);
            } catch(err) {
                caughtError = err;
                throw _error;
            }
            if (test)
                throw arguments[argIndex];
        }
    }
}
