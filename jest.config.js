const transformWhitelistPackages = []

module.exports = {
	collectCoverage: true,
	coverageReporters: [ 'lcov', 'text-summary' ],
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
	moduleFileExtensions: [ 'ts', 'tsx', 'js' ],
	rootDir: './',
	roots: [ '<rootDir>/src' ],
	// testMatch: [ '<rootDir>/src/someFile.test.tsx' ], //Left here intentionally to test single files easy
    clearMocks: true,
	testEnvironment: 'jest-environment-jsdom',
	setupFiles: [],
	setupFilesAfterEnv: [ './jest.setup.js' ],
	transform: {
		'\\.[jt]sx?$': [ 'ts-jest', {
			isolatedModules: true,
            tsconfig: {
                jsx: 'react-jsx',
            },
			diagnostics: {
				ignoreCodes: [ 6133, 6192, 6198 ],
			},
		} ],
	},
	transformIgnorePatterns: [
		`node_modules/(?!(${transformWhitelistPackages.join( '|' )})/)`,
	],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
}
