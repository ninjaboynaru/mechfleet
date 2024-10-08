module.exports = {
	'rules': {
		'no-tabs': 0,
		'func-names': 0,
		'prefer-arrow-callback': 0,
		'prefer-destructuring': 0,
		'no-param-reassign': 0,
		'no-underscore-dangle': 0,
		'object-shorthand': 0,
		'consistent-return': 0,
		'max-len': 0,
		'no-restricted-syntax': 0,
		'no-continue': 0,
		'no-plusplus': 0,
		'no-console': 0,
		'no-use-before-define': 0,
		'guard-for-in': 0,
		'default-case': 0,
		'class-methods-use-this': 0,
		'no-useless-constructor': 0,
		'import/no-unresolved': [2, {'ignore': ['native-base']}],
		'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
		'object-curly-newline': ['error', {'consistent':true}],
		'space-before-function-paren': ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		'indent': ['error', 'tab', {'MemberExpression': 'off', 'SwitchCase': 1}],
		'brace-style': ['error', 'stroustrup', { "allowSingleLine": true }],
	}
}
