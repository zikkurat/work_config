let path = {
	source: './source/',
	build: './build/',
};

exports.basePath = {
	source: path.source,
	build: path.build,
};

exports.browserSync = {
	//proxy: 'zlw',
	server: {
		baseDir: './build'
	},
	files: [path.source + '**/*.html', path.source + '**/*.css', path.source + '**/*.js'],
};

exports.htmlmin = {
	collapseWhitespace: true,
	removeComments: true,
};
