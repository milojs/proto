'use strict';

/**
 * - [extend](#extend)
 * - [clone](#clone)
 * - [defineProperty](#defineProperty)
 * - [defineProperties](#defineProperties)
 * - [deepExtend](#deepExtend)
 * - [allKeys](#allKeys)
 * - [keyOf](#keyOf)
 * - [allKeysOf](#allKeysOf)
 * - [eachKey](#eachKey)
 * - [mapKeys](#mapKeys)
 *
 * All these methods can be [chained](_.js.html#Proto)
 */
var objectMethods = module.exports = {
	extend: extend,
	clone: clone,
	defineProperty: defineProperty,
	defineProperties: defineProperties,
	deepExtend: deepExtend,
	allKeys: allKeys,
	keyOf: keyOf,
	allKeysOf: allKeysOf,
	eachKey: eachKey,
	mapKeys: mapKeys
};

/**
 * Extends object `self` with the properties of the object `obj` copying all own properties (not those inherited via prototype chain), including non-enumerable properties (unless `onlyEnumerable` is truthy).
 * Created properties will have the same descriptors as the propertis of `obj`.
 * Returns `self` to allow chaining with other functions.
 * Can be used with functions, to copy class methods, e.g.
 *
 * @param {Object} self An object to be extended
 * @param {Object} obj An object which properties will be copied to self
 * @param {Boolean} onlyEnumerable Optional flag to prevent copying non-enumerable properties, `false` by default
 * @return {Object}
 */
function extend(obj, onlyEnumerable) {
	var propDescriptors = {};

	eachKey.call(obj, function(value, prop) {
		var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
		propDescriptors[prop] = descriptor;
	}, this, onlyEnumerable);

	Object.defineProperties(this, propDescriptors);

	return this;
}


/**
 * Makes a shallow clone of object `obj` creating an instance of the same class; the properties will have the same descriptors.
 * To clone an array use
 * ```
 * var clonedArray = [].concat(arr);
 * ```
 * This function should not be used to clone an array, both because it is inefficient and because the result will look very much like an array, it will not be a real array.
 *
 * @param {Object} self An object to be cloned
 * @return {Object}
 */
function clone() {
	var clonedObject = Object.create(this.constructor.prototype);
	extend.call(clonedObject, this);
	return clonedObject;
}


/**
 * Syntax sugar to shorten usage of `Object.defineProperty`.
 * The simplest usage (to add non-enumerable, non-configurable, non-writable property):
 * ```
 * _.defineProperty(obj, 'key', value);
 * ```
 * Returns `self`.
 *
 * @param {Object} self An object to add a property to
 * @param {String} propertyName the name of the property that will be added
 * @param {Any} value the value of added property
 * @param {Boolean} enumerable Optional `true` value to make property enumerable, `false` by default
 * @param {Boolean} configurable Optional `true` value to make property configurable, `false` by default
 * @param {Boolean} writable Optional `true` value to make property writable, `false` by default
 * @return {Object}
 */
function defineProperty(propertyName, value, enumerable, configurable, writable) {
	Object.defineProperty(this, propertyName, {
		enumerable: enumerable,
		configurable: configurable,
		writable: writable,
		value: value
	});
	return this;
}


/**
 * Syntax sugar to shorten usage of `Object.defineProperties`.
 * The simplest usage (to add non-enumerable, non-configurable, non-writable properties):
 * ```
 * _.defineProperties(obj, {
 *     key1: value1,
 *     key2: value2	
 * });
 * ```
 * Returns `self`.
 *
 * @param {Object} self An object to add a property to
 * @param {Object} propertyValues A map of keys and values of properties thatwill be added. The descriptors of properties will be defined by the following parameters.
 * @param {Boolean} enumerable Optional `true` value to make property enumerable, `false` by default
 * @param {Boolean} configurable Optional `true` value to make property configurable, `false` by default
 * @param {Boolean} writable Optional `true` value to make property writable, `false` by default
 * @return {Object}
 */
function defineProperties(propertyValues, enumerable, configurable, writable) {
	var descriptors = mapKeys.call(propertyValues, function(value) {
		return {
			enumerable: enumerable,
			configurable: configurable,
			writable: writable,
			value: value
		};		
	});
	Object.defineProperties(this, descriptors);
	return this;
}


/**
 * Extends object `self` with properties of `obj` to any depth, without overwrtiting existing object properties of `self` with object properties of `obj`.
 * Scalar properties of `obj` will overwrite properties of `self`. Scalar porperties of `self` will also be overwritten.
 * Correctly works with recursive objects.
 * Usage:
 * ```
 * var obj = {
 *     inner: {
 *         a: 1
 *     }
 * };
 *
 * _.deepExtend(obj, {
 *     inner: {
 *         b: 2
 *     }
 * });
 *
 * assert.deepEqual(obj, {
 *     inner: {
 *         a: 1,
 *         b: 2
 *     }
 * }); // assert passes
 * ```
 * Returns `self`.
 *
 * @param {Object} self An object to be extended
 * @param {Object} obj An object with properties to copy to 
 * @param {Boolean} onlyEnumerable Optional `true` to use only enumerable properties
 * @return {Object}
 */
function deepExtend(obj, onlyEnumerable) {
	return _extendTree(this, obj, onlyEnumerable, []);
}


function _extendTree(selfNode, objNode, onlyEnumerable, objTraversed) {
	if (objTraversed.indexOf(objNode) >= 0) return; // node already traversed, obj has recursion

	// store node to recognise recursion
	objTraversed.push(objNode);

	eachKey.call(objNode, function(value, prop) {
		var descriptor = Object.getOwnPropertyDescriptor(objNode, prop);
		if (typeof value == 'object') {
			if (! (selfNode.hasOwnProperty(prop) && typeof selfNode[prop] == 'object'))
				selfNode[prop] = {};
			_extendTree(selfNode[prop], value, onlyEnumerable, objTraversed);
		} else
			Object.defineProperty(selfNode, prop, descriptor);
	}, this, onlyEnumerable);

	return selfNode;
}


/**
 * Returns array of all property names of an object `self` (including non-enumerbale).
 * To get only enumerable properties, use `Object.keys()`.
 *
 * @param {Object} self An object to get all properties of.
 * @return {Array}
 */
 function allKeys() {
 	return Object.getOwnPropertyNames(this);
 }


/**
 * An analogue of `indexOf` method of Array prototype.
 * Returns the `key` of `searchElement` in the object `self`. 
 * As object keys are unsorted, if there are several keys that hold `searchElement` any of them can be returned. Use `allKeysOf` to return all keys.
 * All own properties are searched (not those inherited via prototype chain), including non-enumerable properties (unless `onlyEnumerable` is truthy).
 *
 * @param {Object} self An object to search a value in
 * @param {Any} searchElement An element that will be searched. An exact equality is tested, so `0` is not the same as `'0'`.
 * @param {Boolean} onlyEnumerable An optional true to search among enumerable properties only.
 * @return {String} 
 */
function keyOf(searchElement, onlyEnumerable) {
	var properties = onlyEnumerable 
						? Object.keys(this)
						: allKeys.call(this);

	for (var i = 0; i < properties.length; i++)
		if (searchElement === this[properties[i]])
			return properties[i];
	
	return undefined;
}


/**
 * Works similarly to the previous function, but returns the array of keys holding `searchElement` as their value.
 *
 * @param {Object} self An object to search a value in
 * @param {Any} searchElement An element that will be searched. An exact equality is tested, so `0` is not the same as `'0'`.
 * @param {Boolean} onlyEnumerable An optional true to search among enumerable properties only.
 * @return {Array[String]} 
 */
function allKeysOf(searchElement, onlyEnumerable) {
	var properties = onlyEnumerable 
						? Object.keys(this)
						: allKeys.call(this);

	var keys = properties.filter(function(prop) {
		return searchElement === this[prop];
	}, this);

	return keys;
}


/**
 * An analogue of [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method of Array prototype.
 * Iterates all own properties of `self` (or only enumerable own properties if `onlyEnumerable` is truthy) calling callback for each key.
 * This method should not be used with arrays, it will include `length` property in iteration.
 * To iterate array-like objects (e.g., `arguments` pseudo-array) use:
 * ```
 * Array.prototype.forEach.call(arguments, callback, thisArg);
 * ```
 * Function returns `self` to allow [chaining](_.js.html)
 *
 * @param {Object} self An object which properties will be iterated
 * @param {Function} callback Callback is passed `value`, `key` and `self`, its return value is not used.
 * @param {Object} thisArg An optional context of iteration (the valueof `this`), will be undefined if this parameter is not passed.
 * @param {Boolean} onlyEnumerable An optional `true` to iterate enumerable properties only.
 */
function eachKey(callback, thisArg, onlyEnumerable) {
	var properties = onlyEnumerable 
						? Object.keys(this)
						: allKeys.call(this);

	properties.forEach(function(prop) {
		callback.call(thisArg, this[prop], prop, this);
	}, this);

	return this;
}


/**
 * An analogue of [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method of Array prototype.
 * Returns the map that is the result of the application of callback to values in all own properties of `self` (or only enumerable own properties if `onlyEnumerable` is truthy).
 * Property descriptors of the returned map will have the same `enumerable`, `configurable` and `writable` settings as the properties of the original map.
 * This method should not be used with arrays, it will include `length` property in iteration.
 * To map array-like objects use:
 * ```javascript
 * var result = Array.prototype.map.call(arguments, callback, thisArg);
 * ```
 * 
 * @param {Object} self An object which properties will be iterated
 * @param {Function} callback Callback is passed `value`, `key` and `self` and should return value that will be included in the map.
 * @param {Object} thisArg An optional context of iteration (the valueof `this`), will be undefined if this parameter is not passed.
 * @param {Boolean} onlyEnumerable An optional `true` to iterate enumerable properties only.
 * @return {Object}
 */
function mapKeys(callback, thisArg, onlyEnumerable) {
	var mapResult = {};
	eachKey.call(this, mapProperty, this, onlyEnumerable);
	return mapResult;

	function mapProperty(value, key) {
		var descriptor = Object.getOwnPropertyDescriptor(this, key);
		if (descriptor.enumerable || ! onlyEnumerable) {
			descriptor.value = callback.call(thisArg, value, key, this);
			Object.defineProperty(mapResult, key, descriptor);
		}
	}
}
