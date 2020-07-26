const path = require('path');

module.exports = {
	env: {
		es6: true,
	},
	extends: [
		'airbnb',
		'plugin:react/recommended',
		path.resolve(__dirname, 'linting/.eslintrc-general.js'),
		path.resolve(__dirname, 'linting/.eslintrc-react.js')
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	settings: {
		"import/resolver": {
			"babel-module": {}
		},
	},
	plugins: [
		'react',
	],
	rules: {
	},
};
