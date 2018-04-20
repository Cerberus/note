// every file name must be unique for auto import feature
module.exports = {
	excludes: ['**/**test.js', 'build/**', 'public/**', 'coverage/**'],
	useRelativePaths: false,
	tab: '\t',
	importStatementFormatter({ importStatement }) {
		return importStatement
			.replace(/;$/, '')
			.replace(/src\//, '')
			.replace(/type {/, '{ type')
	},
	useRelativePaths({ pathToImportedModule, pathToCurrentFile }) {
		if (pathToImportedModule.includes('__generated__')) {
			return true
		}
		return false
	},
	aliases: {
		gql: 'graphql-tag',
		styled: 'styled-components',
	},
}
