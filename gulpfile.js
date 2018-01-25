const gulp = require('gulp');
const p=require('gulp-load-plugins')();
//var bs = require('browser-sync').create();

console.log('---------------------');
console.log('loaded plugins name:');
console.log('---------------------');
for (let plugin_name in p) {
	console.log(plugin_name);
}
console.log('---------------------');

const basePath = './source/',
	baseDest = './build/';

gulp.task('html', () => {
	gulp.src(basePath + '*.html')
		.pipe(p.plumber())
		.pipe(p.changed(baseDest))
		.pipe(p.htmlmin({
			collapseWhitespace: true,
			removeComments: true,
		}))
		.pipe(gulp.dest(baseDest))
});

gulp.task('watch', () => {
	gulp.watch(basePath + '*.html', ['html']);
});

gulp.task('default', ['watch']);
