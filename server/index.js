require('babel-polyfill');
require('babel-register');
require('css-modules-require-hook')({
  extensions: '.less',
  processorOpts: {parser: require('postcss-less').parse},
	generateScopedName: '[path]_[local]_[hash:base64:4]',
});

// Image require hook
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000
});

require('./server');
