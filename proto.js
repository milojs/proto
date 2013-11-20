var proto = module.exports = {
	extendProto: extendProto,
	extend: extend,
	clone: clone,
	createSubclass: createSubclass
};

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

function extend(self, obj) {
	var properties = Object.getOwnPropertyNames(obj)
		, propDescriptors = {};

	properties.forEach(function(prop) {
		var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
		propDescriptors[prop] = descriptor;
	});

	Object.defineProperties(self, propDescriptors);

	return self;
}

function clone(obj) {
	var clonedObject = Object.create(obj.constructor.prototype);

	extend(clonedObject, obj);

	return clonedObject;
}

function createSubclass(name, applyConstructor) {
	var thisClass = this
		, subclass;

	// apply superclass constructor
	var constructorCode = applyConstructor === false
		? ''
		: 'thisClass.apply(this, arguments);'

	eval([
		'subclass = function ', name, '(){',
		constructorCode, '}'
	].join(''));

	// pprototype chain
	subclass.prototype = Object.create(thisClass.prototype);
	// subclass identity
	subclass.prototype.constructor = subclass;
	// copy class methods
	// - for them to work they should not explictly use superclass name
	// and use "this" instead
	subclass.extend(thisClass);

	return subclass;
}
