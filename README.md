proto
=====

Prototypes aware object manipulation library for node and modern browsers

Why not use underscore or lo-dash
---------------------------------

1. They do NOT use properties that are non-enumerable when they extend/clone/etc.
2. They DO use enumerable properties from prototypes when they extend/clone/etc.
3. When they clone, they create instances of Object rather than of the same class as cloned object.
4. They implement many methods that are already implemented natively.
5. They don't implement methods for inheritance and extention of prototypes

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

  Makes a shallow clone of object _self_ creating an instance of the same class

* __createSubclass__(_Constructor_ [, _name_ [, _applyConstructor_]])

  Makes a subclass of class _Constructor_.
  The returned function will have specified _name_ if supplied.
  The constructor of superclass will be called in subclass constructor by default
  unless _applyConstructor_ === false (not just falsy).
