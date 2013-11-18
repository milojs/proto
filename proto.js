function extendProto(methods) {
	var props = {};
	for (var name in methods)
		props[name] = {
			enumerable: false,
			configurable: false,
			writable: false,
			value: methods[name]
		};
	Object.defineProperties(this.prototype, props);
	return this;
}

function extend(obj) {
	for (var prop in obj)
		this[prop] = obj[prop];
	return this;
}

extendProto.call(Function, {
	extendProto: extendProto,
	extend: extend
});
