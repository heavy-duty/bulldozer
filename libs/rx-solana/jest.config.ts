/* eslint-disable */
export default {
	displayName: 'shared--rx-solana',
	preset: '../../jest.preset.js',
	globals: {},
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/rx-solana',
};
