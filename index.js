var resolveProp = require('postcss-resolve-prop');
var parseCssFont = require('parse-css-font');
var unquote = require('unquote');
var t = require('tcomb-postcss');

[
	'style',
	'variant',
	'weight',
	'stretch',
	'size'
].forEach(function(prop) {
	module.exports[prop] = t.func(t.Container, t.Any).of(
		function(container) {
			return resolveProp(container, 'font-' + prop, {
				parsers: {
					font: function(value) {
						return parseCssFont(value)[prop];
					}
				}
			});
		}
	);
});

module.exports.family = t.func(t.Container, t.Any).of(
	function(rule) {
		return resolveProp(rule, 'font-family', {
			parsers: {
				font: function(value) {
					return parseCssFont(value).family;
				},
				'font-family': function(value) {
					return value.split(/\s*,\s*/).map(unquote);
				}
			}
		});
	}
);

module.exports.lineHeight = t.func(t.Container, t.Any).of(
	function(rule) {
		return resolveProp(rule, 'line-height', {
			parsers: {
				font: function(value) {
					return parseCssFont(value).lineHeight;
				},
				'line-height': function(value) {
					var parsed = parseFloat(value);
					if (parsed.toString() === value) {
						return parsed;
					}
					return value;
				}
			}
		});
	}
);
