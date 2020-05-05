module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		// "eslint:recommended",
		"plugin:react/recommended",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2019,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"react-hooks"
	],
	"parser": "babel-eslint",
	// "rules": {
	// 	"strict": 0
	// },
	"rules": {
		"react/prop-types": 0,
		"react-hooks/rules-of-hooks": "error",
		"quotes": [ "warn", "single" ],
		"semi": ["warn", "never"]
	}
};