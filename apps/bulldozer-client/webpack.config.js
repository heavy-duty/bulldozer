const webpack = require('webpack');

module.exports = function override(config) {
	// Disable resolving ESM paths as fully specified.
	// See: https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
	config.module.rules.push({
		test: /\.m?js/,
		resolve: {
			fullySpecified: false,
		},
	});

	// Ignore source map warnings from node_modules.
	// See: https://github.com/facebook/create-react-app/pull/11752
	config.ignoreWarnings = [/Failed to parse source map/];

	// Polyfill other modules.
	config.resolve.fallback = {
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		util: require.resolve('util'),
		assert: require.resolve('assert'),
		http: require.resolve('stream-http'),
		https: require.resolve('https-browserify'),
		process: false,
		fs: false,
		path: false,
		zlib: false,
	};

	return config;
};
