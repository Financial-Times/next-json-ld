module.exports = {
    ignorePatterns: ['package.json', 'package-lock.json', 'node_modules/**/*', 'CODEOWNERS'],
	extends: [
		'@financial-times/eslint-config-next',
		'plugin:json/recommended',
		'plugin:yml/standard',
		'prettier'
	]
}
