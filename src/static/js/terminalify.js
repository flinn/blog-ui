(function(window, undefined) {
	//"use strict";
	var	options,
	defaults = {
		user: "Vistors-MacBook-Pro:~ guest$ ",
		command: "WHOIS flinn",
		hesitate: 500,
		lastLogin: "Thu May 24 12:18:16 on ttys001",
		maxStrokeInterval: 200,
		outputInterval: 300,
		output: [
		"Registrant Name: Matthew Claiborne Flinn", 
		"Registrant Organization: The Motley Fool", 
		"Registrant Title: Software Developer", 
		"Registrant City: Arlington, VA",
		"Last update of WHOIS database: 2014-05-06T01:00:00Z"
		]
	},
	cursor,
	lastInput,
	lastLogin;

	terminalify = function(selector, options) {
		return new terminalify.fn.init(selector, options);
	};

	terminalify.fn = terminalify.prototype = {
		constructor: terminalify,
		init: function(selector, options) {
			if (!selector) {
				throw "You must have a selector!";
			}
			if (!options) {
				options = defaults;
			}
			cursor = $('.' + selector).find('.cursor').first();

			lastInput = $("#last-input");

			lastLogin = $('.' + selector).find('.terminalify-lastlogin').first();
			$(lastLogin).text(options.lastLogin);

			var user = $('.' + selector).find('.user').first();
			$(user).text(options.user);

			setTimeout(function() {				
				appendEachLetterOfCommand(options);
			}, options.hesitate);
		}
	};

	terminalify.fn.init.prototype = terminalify.fn;

	function writeOutput(options) {
		$(cursor).css('visibility', 'hidden')
		var i = 0, intervaliId;
		outputIntervalId = window.setInterval(function() {
			var textOutput = '<p><span class="user">' 
						+ String(options.user) + '</span>  <span class="input">' 
						+ String(options.output[i++]) + '</span></p>';
			$(lastInput).before(textOutput);
			if (i >= options.output.length)  {
				window.clearInterval(outputIntervalId);
				var lastInputHtml = '<span class="user">' + String(options.user) + '</span>';
				$(lastInput).append(lastInputHtml);
				$(cursor).appendTo(lastInput);
				$(cursor).css('visibility', 'visible');
			}
		}, options.outputInterval)
	}

	function appendEachLetterOfCommand(options) {		
		var i = 0, intervalId, writtenChars = "";
		intervalId = window.setInterval(function() {
			writtenChars += String(options.command).charAt(i++);
			$("#terminalify-command").text(writtenChars);
			if (i > options.command.length) {
           		window.clearInterval(intervalId);
           		writeOutput(options);
			}
		}, options.maxStrokeInterval);
	};	

	if ( typeof module === "object" && typeof module.exports === "object" ) {		
		module.exports = terminalify;
	} else {		
		if ( typeof define === "function" && define.amd ) {
			define( "terminalify", [], function () { return terminalify; } );
		}
	}
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.terminalify = terminalify;
	}
})(window);