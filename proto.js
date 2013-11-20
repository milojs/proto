var _;
var proto = _ = {
	extendProto: extendProto,
	extend: extend,
	clone: clone,
	createSubclass: createSubclass
};


if (typeof window != 'undefined') {
	// preserve existing _ object
	if (window._)
		proto.underscore = window._

	// expose global _
	window._ = proto;
} else if (module.exports)
	// export for node/browserify
	module.exports = proto;

function extendProto(self, methods) {
	var propDescriptors = {};
	for (var name in methods)
		propDescriptors[name] = {
			enumerable: false,
			configurable: false,
			writable: false,
			value: methods[name]
		};
	Object.defineProperties(self.prototype, propDescriptors);
	return self;
}

function extend(self, obj, onlyEnumerable) {
	var properties = Object.getOwnPropertyNames(obj)
		, propDescriptors = {};

	properties.forEach(function(prop) {
		var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
		if (! onlyEnumerable || descriptor.enumerable)
			propDescriptors[prop] = descriptor;
	});

	Object.defineProperties(self, propDescriptors);

	return self;
}

function clone(obj) {
	var clonedObject = Object.create(obj.constructor.prototype);

	_.extend(clonedObject, obj);

	return clonedObject;
}

function createSubclass(thisClass, name, applyConstructor) {
	var subclass;

	// name is optional
	name = name || '';

	// apply superclass constructor
	var constructorCode = applyConstructor === false
			? ''
			: 'thisClass.apply(this, arguments);';

	eval('subclass = function ' + name + '(){ ' + constructorCode + ' }');

	// pprototype chain
	subclass.prototype = Object.create(thisClass.prototype);
	// subclass identity
	subclass.prototype.constructor = subclass;
	// copy class methods
	// - for them to work correctly they should not explictly use superclass name
	// and use "this" instead
	_.extend(subclass, thisClass, true);

	return subclass;
}
