'use strict';

var underscore = require('underscore')
	, _ = require('../lib/proto')
	, testPerf = require('./test');


var self = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5
};

function mapCallback(value) {
	return value + 'test'
}

function eachCallback(value, key, obj) {
	obj[key] = value * 10;
}


console.log('each/eachKey test');
testPerf(
	function() {
		underscore.each(self, eachCallback);
	},
	function() {
		_.eachKey(self, eachCallback);
	}
);


console.log('map/mapKeys test');
testPerf(
	function() {
		var result = underscore.map(self, mapCallback);
	},
	function() {
		var result = _.mapKeys(self, mapCallback);
	}
);


console.log('each/eachKey chain test');
testPerf(
	function() {
		underscore.chain(self)
			.each(eachCallback)
			.value();
	},
	function() {
		_(self)
			.eachKey(eachCallback)
			._();
	}
);
