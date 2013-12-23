'use strict';

var utils = module.exports = {
	makeProtoInstanceMethodFromFunc: makeProtoInstanceMethodFromFunc,
	makeProtoInstanceMethod: makeProtoInstanceMethod,
	makeProtoFunction: makeProtoFunction
}


function makeProtoInstanceMethod(method) {
	return function() {
		this.self = method.apply(this.self, arguments);
		return this;
	};
}


function makeProtoFunction(method) {
	return function() {
		return method.call.apply(method, arguments);
	};
}


function makeProtoInstanceMethodFromFunc(func) {
	return function() {
		// add wrapped value to the beginning of parameters list and
		// call _ function with prepended arguments and replace wrapped object
		this.self = func.apply(this.constructor, [this.self].concat(Array.prototype.slice.call(arguments)));
		// return wrapped object
		return this;
	};	
}
