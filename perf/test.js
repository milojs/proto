'use strict';

module.exports = function perfTest(func1, func2, times) {
	times = times || 100000;
	var time1 = time(func1);
	var time2 = time(func2);

	console.log('time1:', time1, 'time2:', time2, 'diff: func1 is ', time1 / time2, 'times slower (', time2 / time1, ' times faster)');

	function time(func) {
		var start = Date.now()
			, i = times;
		while (i--)
			func();
		return Date.now() - start;
	}
};
