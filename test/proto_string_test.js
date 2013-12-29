'use strict';

var _ = require('../lib/proto')
	, assert = require('assert');


describe('String functions', function() {
	it('should define firstUpperCase function', function() {
		var upper = 'UPPERCASE'
			, lower = 'lowercase';

		assert(_.firstUpperCase(upper), 'UPPERCASE');
		assert(_.firstUpperCase(lower), 'Lowercase');
	});


	it('should define firstLowerCase function', function() {
		var upper = 'UPPERCASE'
			, lower = 'lowercase';

		assert(_.firstLowerCase(upper), 'uPPERCASE');
		assert(_.firstLowerCase(lower), 'lowercase');
	});	
});
