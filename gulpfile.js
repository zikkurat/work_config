const gulp = require('gulp');
const plugins=require('gulp-load-plugins')();
const config = require('./pluginsConfig.js');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

console.log('---------------------');
console.log('loaded plugins name:');
console.log('---------------------');
for (let plugin_name in plugins) {
	console.log(plugin_name);
}
console.log('---------------------');
console.log(config);

gulp.task('html', () => {
	gulp.src(config.basePath.source + '*.html')
		.pipe(plugins.plumber())
		.pipe(plugins.changed(config.basePath.build))
		.pipe(plugins.htmlmin(config.htmlmin))
		.pipe(gulp.dest(config.basePath.build))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('css', () => {
	gulp.src(config.basePath.source + '*.less')
		.pipe(plugins.plumber())
		.pipe(plugins.changed(config.basePath.build))
		.pipe(plugins.less())
		.pipe(gulp.dest(config.basePath.build))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', () => {
	gulp.watch(config.basePath.source + '*.html', ['html']);
	gulp.watch(config.basePath.source + '*.less', ['css']);
});

gulp.task('default', ['watch']);

browserSync.init(config.browserSync);
