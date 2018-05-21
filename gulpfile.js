const gulp = require('gulp'),
	plugins=require('gulp-load-plugins')(),
	config = require('./pluginsConfig.js'),//载入配置文件
	browserSync = require('browser-sync').create(),//同步刷新
	browserify = require('browserify'),//es6转码
	through2 = require('through2'),
	reload = browserSync.reload;

console.log('---------------------');
console.log('loaded plugins name:');
console.log('---------------------');
for (let plugin_name in plugins) {
	console.log(plugin_name);
}
console.log('---------------------');
console.log(config);

gulp.task('html', () => {
	return gulp.src(config.basePath.source + '*.html')
		.pipe(plugins.plumber())
		.pipe(plugins.changed(config.basePath.build))
		.pipe(plugins.htmlmin(config.htmlmin))
		.pipe(gulp.dest(config.basePath.build))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('css', () => {
	return gulp.src(config.basePath.source + '*.less')
		.pipe(plugins.plumber())
		.pipe(plugins.changed(config.basePath.build))
		.pipe(plugins.less())
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest(config.basePath.build))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', () => {
	return gulp.src(config.basePath.source + '*.js')
		.pipe(plugins.plumber())
		.pipe(plugins.changed(config.basePath.build))
		.pipe(through2.obj(function(file, enc, callback) {
			browserify({
				entries: file.path,
				debug: true,
			})
			.transform('babelify', {
				presets: ['es2015']
			})
			.bundle(function(err, res) {
				err && console.log(err.stack);
				file.contents = res;
				callback(null, file);
			});
		}))
		.pipe(plugins.uglify(config.uglify))
		.pipe(gulp.dest(config.basePath.build))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', () => {
	gulp.watch(config.basePath.source + '*.html', ['html']);
	gulp.watch(config.basePath.source + '*.less', ['css']);
	gulp.watch(config.basePath.source + '*.js', ['js']);
});

gulp.task('default', ['watch']);

browserSync.init(config.browserSync);
