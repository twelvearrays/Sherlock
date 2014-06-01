/**
 * Watson - Collects data for Sherlock to analyze.
 * Copyright (c) 2014 Tabule, Inc.
 */

var Watson = (function() {
	var helpers = {
		// Validates the parsed times returned by Sherlock
		validate: function(Sherlocked) {
			if (!Sherlocked.startDate)
				return 'Sorry, you\'ve entered an invalid date :(';

			if (Sherlocked.endDate && Sherlocked.startDate > Sherlocked.endDate)
				return 'Sorry, the end time can\'t be before the start time.';

			return true;
		},

		// Parse the input string to try to figure out which calendar the user wants.
		parseCalendar: function(str, Sherlocked) {

			// Simple example of searching for CS 104 calendar and removing it from input string
			if (str.indexOf('CS 104') !== -1) {
				Sherlocked.calendar = 'CS 104';
				str = str.replace('CS 104', '');
			}

			return [str, Sherlocked];
		},
	};

	return {
		/*
		 * Takes the untouched input string, returns 
		 * an array with the modified input string at position 0 and a new Sherlocked object at position 1
		*/
		preprocess: function(str) {
			return helpers.parseCalendar(str, {});
		},

		/* 
		 * Takes a Sherlocked object, and returns that Sherlocked object with any desired modifications.
		*/
		postprocess: function(Sherlocked) {
			Sherlocked.validated = helpers.validate(Sherlocked);
			return Sherlocked;
		}
	};
})();
