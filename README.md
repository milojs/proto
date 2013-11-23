proto
=====

Prototypes aware object manipulation library for node and modern browsers

Why not use underscore or lo-dash
---------------------------------

1. They do NOT use properties that are non-enumerable when they extend/clone/etc.
2. They DO use enumerable properties from prototypes when they extend/clone/etc.
3. When they clone, they create instances of Object rather than of the same class as cloned object.
4. They implement many methods that are already implemented natively.
5. They don't implement methods for inheritance and extention of prototypes.
6. They create confusion when you read code as you can't clearly differentiate
between arrays and objects (maps), e.g. when _each_ function is used.


Install
-------

TODO: rename and publish on npm


    git clone git@github.com:MailOnline/proto.git
    cd proto
    npm link
    cd ../<your project>
    npm link proto


Use
---

    var _ = require('proto');

Functions
---------

* __extendProto__(_Constructor_, _properties_)

  Adds non-enumerable, non-configurable and non-writable to the prototype of constructor function

      function MyClass() {}
      _.extendProto(MyClass, {
          method1: function() {},
          method2: function() {}
      });

  To extend class via object:

      _.extendProto(obj.constructor, { /* ... */ } );


* __extend__(_self_, _obj_ [, _onlyEnumerable_])
  
  Extends object _self_ with an object _obj_ copying all own properties
  (not those inherited via prototype chain), including non-enumerable properties
  (unless _onlyEnumerable_ is truthy)


* __clone__(_self_)

  Makes a shallow clone of object _self_ creating an instance of the same class.

  Although it can be used to clone an Array and the returned object will look and 
  behave like a real array (it will be an instance of Array),
  depending on JavaScript implementation it may store items inefficiently (not
  sequentially) and it may affect performance.

  If you need to clone array, use

      var clonedArray = [].concat(arr);


* __createSubclass__(_Constructor_ [, _name_ [, _applyConstructor_]])

  Makes a subclass of class _Constructor_.
  The returned function will have specified _name_ if supplied.
  The constructor of superclass will be called in subclass constructor by default
  unless _applyConstructor_ === false (not just falsy).


* __keyOf__(_self_, _searchElement_ [, _onlyEnumerable_])

  An analogue of _indexOf_ method of Array prototype.

  Returns the _key_ of _searchElement_ in the object _self_.
  
  As object keys are unsorted, if there are several keys that hold _searchElement_
  any of them can be returned. Use _allKeysOf_ to return all keys.

  All own properties are searched (not those inherited via prototype chain),
  including non-enumerable properties (unless _onlyEnumerable_ is truthy).


* __allKeysOf__(_self_, _searchElement_ [, _onlyEnumerable_])

  Works similarly to the previous function, but returns the array of keys
  holding _searchElement_ as their value.


* __eachKey__(_self_, _callback_ [, _thisArg_ [, _onlyEnumerable_]])

  An analogue of _forEach_ method of Array prototype.

  Iterates all own properties of _self_ (or only enumerable own properties
  if _onlyEnumerable_ is truthy) calling callback for each key.

  Callback is passed _value_, _key_ and _self_, its return value is not used.

  If _thisArg_ is set it will be the context (the value of _this_) in _callback_.

  This method should not be used with arrays, it will include _length_ property
  in iteration.

  To iterate array-like objects (e.g., _arguments_ pseudo-array) use:

      Array.prototype.forEach.call(arguments, callback, thisArg);


* __mapKeys__(_self_, _callback_ [, _thisArg_ [, _onlyEnumerable_]])

  An analogue of _map_ method of Array prototype.

  Returns the map that is the result of the application of callback to values
  in all own properties of _self_ (or only enumerable own properties
  if _onlyEnumerable_ is truthy).

  Callback is passed _value_, _key_ and _self_ and should return value that will be
  included in the map. Property descriptors of the returned map will have the same
  values of properties _enumerable_, _configurable_ and _writable_ as the original map.

  If _thisArg_ is set it will be the context (the value of _this_) in _callback_.

  This method should not be used with arrays, it will include _length_ property
  in iteration.

  To map array-like objects use:

      var result = Array.prototype.map.call(arguments, callback, thisArg);


* __appendArray__(_self_, _arrayToAppend_)

  Appends _arrayToAppend_ to the end of array _self_ in place (can be an instance
  of Array or array-like object).

  Changes the value of _self_ (it uses Array.prototype.splice) and returns the new
  value of _self_.

  TODO: test


* __prependArray__(_self_, _arrayToPrepend_)

  Appends _arrayToPrepend_ to the end of array _self_ in place (can be an instance of
  Array or array-like object).

  Changes the value of _self_ (it uses Array.prototype.splice) and returns the new
  value of _self_. 

  TODO: test
