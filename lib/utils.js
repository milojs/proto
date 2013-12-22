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
		return method.call.apply(arguments);
	};
}
