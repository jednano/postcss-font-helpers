var tape = require('tape');
var postcss = require('postcss');

var font = require('..');

tape('postcss-font-helpers', function(t) {

	var rule = postcss.parse([
		'a {',
		'  font: italic none 500 condensed 1rem/100% serif;',
		'}'
	].join('')).first;

	t.deepEqual(
		font(rule),
		{
			style: 'italic',
			variant: 'none',
			weight: '500',
			stretch: 'condensed',
			size: '1rem',
			lineHeight: '100%',
			family: ['serif']
		},
		'resolves all props into an object'
	);

	t.equal(
		font.style(rule),
		'italic',
		'resolves a font style'
	);

	t.equal(
		font.variant(rule),
		'none',
		'resolves a font variant'
	);

	t.equal(
		font.weight(rule),
		'500',
		'resolves a font weight'
	);

	t.equal(
		font.stretch(rule),
		'condensed',
		'resolves a font stretch'
	);

	t.equal(
		font.size(rule),
		'1rem',
		'resolves a font size'
	);

	t.equal(
		font.lineHeight(rule),
		'100%',
		'resolves a line height'
	);

	t.deepEqual(
		font.family(rule),
		['serif'],
		'resolves a font family'
	);

	rule = postcss.parse([
		'a {',
		'  font: italic none 500 condensed 1rem/1.2 serif;',
		'  font-style: oblique;',
		'  font-variant: small-caps;',
		'  font-weight: 300;',
		'  font-stretch: ultra-condensed;',
		'  font-size: 1.5rem;',
		'  line-height: 150%;',
		'  font-family: sans-serif;',
		'}'
	].join('')).first;

	t.deepEqual(
		font(rule),
		{
			style: 'oblique',
			variant: 'small-caps',
			weight: '300',
			stretch: 'ultra-condensed',
			size: '1.5rem',
			lineHeight: '150%',
			family: ['sans-serif']
		},
		'accumulates all resolved props into an object'
	);

	t.equal(
		font.style(rule),
		'oblique',
		'resolves the last font style'
	);

	t.equal(
		font.variant(rule),
		'small-caps',
		'resolves the last font variant'
	);

	t.equal(
		font.weight(rule),
		'300',
		'resolves the last font weight'
	);

	t.equal(
		font.stretch(rule),
		'ultra-condensed',
		'resolves the last font stretch'
	);

	t.equal(
		font.size(rule),
		'1.5rem',
		'resolves the last font size'
	);

	t.equal(
		font.lineHeight(rule),
		'150%',
		'resolves the last line height'
	);

	t.deepEqual(
		font.family(rule),
		['sans-serif'],
		'resolves the last font family'
	);

	rule = postcss.parse([
		'a {',
		'  line-height: 1.2;',
		'}'
	].join('')).first;

	t.equal(
		font.lineHeight(rule),
		1.2,
		'resolves a numeric line height'
	);

	rule = postcss.parse([
		'a {',
		'  line-height: 1;',
		'  font: 1rem/1.2 serif;',
		'  font-size: .8rem;',
		'}'
	].join('')).first;

	t.equal(
		font.lineHeight(rule),
		1.2,
		'resolves the readme example\'s line height'
	);

	t.equal(
		font.size(rule),
		'.8rem',
		'resolves the readme example\'s font size'
	);

	t.deepEqual(
		font.family(rule),
		['serif'],
		'resolves the readme example\'s font family'
	);

	t.end();
});
