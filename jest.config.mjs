export default {
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	testEnvironment: 'jest-environment-jsdom',
	setupFiles: ['./jest.setup.js'],
};
