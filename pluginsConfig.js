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
		baseDir: path.build,
	},
	files: [path.source + '**/*.html', path.source + '**/*.css', path.source + '**/*.js'],
};

exports.htmlmin = {
	collapseWhitespace: true,
	removeComments: true,
};

exports.uglify = {
	compress: true, //压缩
	output: {
		comments: 'all', //保留注释
	},
	toplevel: true, //修改变量名
};
