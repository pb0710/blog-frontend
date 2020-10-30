module.exports = {
	extends: ['react-app'],
	parser: 'babel-eslint',
	plugins: ['prettier', 'react-hooks'],
	rules: {
		'prettier/prettier': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': ['warn', { enableDangerousAutofixThisMayCauseInfiniteLoops: true }],
		// https://cn.eslint.org/docs/rules/object-curly-newline
		'object-curly-newline': [
			'warn',
			{
				consistent: true,
				multiline: true
			}
		],
		'react/jsx-no-target-blank': [0],
		'array-callback-return': 'off',
		// "array-element-newline": ["warn", "multiline"],
		// "function-paren-newline": ["warn", "multiline"],
		'anchor-has-content': 'off',
		'no-anonymous-default-export': 'off'
	},
	// 为我们提供运行环境，一个环境定义了一组预定义的全局变量
	env: {
		es6: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			// 额外使用的语言特性
			jsx: true // 启用jsx的eslint
		}
	}
}
