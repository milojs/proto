'use strict';

var utils = module.exports = {
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
		// when the method is executed, the value of "this" will be arguments[0],
		// other arguments starting from #1 will passed to method as parameters.
		return method.call.apply(method, arguments);
	};
}
