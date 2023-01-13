const { series, parallel, watch } = require('gulp');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const headerfooter = require('gulp-headerfooter');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const inlineCss = require('gulp-inline-css');

function servers() {
	//https://browsersync.io/docs/options
	browserSync.init({
		server: {
			baseDir: './static',
			index: '/content/guide-new/list.html'
		},
		port: 3000
	});
}

function wscss(params) {
	for (var i = scss.length - 1; i >= 0; i--) {
		watchscss(i);
	}
}

function waths() {
	wscss();
	console.log('waths 시작');
	// html
	watchLibraryReload();
	// watchLibrary('kias');
	// watchLibrary('front');
	// watchLibrary('bos');
	//
	// watchCts('kias');
	//watchCts('eng');
	// watchCts('bos');
	watchContent('guide')
	watchContentMobile()
}

function watchLibraryReload(targets) {
	watch('**/*.{js}', { delay: 500 }).on('change', function (event) {
		console.log('File ' + 'change => ' + event + ', running tasks...1');
		browserSync.reload();
	});
	watch('static/content/guide-new/**/*.html', { delay: 500 }).on('change', function (event) {
		console.log('File ' + 'change => ' + event + ', running tasks...1');
		browserSync.reload();
	});
}

const Vinyl = require('vinyl');

function watchLibrary(targets) {
	const watcher = watch(['static/guide/' + targets + '/lib/*.html']);
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		});
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(gulp.dest('static/guide/' + targets + '/dist'));
	});
}
function watchContentMobile() {
	const watcher = watch('static/content/guide/mobile/**/*.html');
	watcher.on('change', function (paths) {
		const file = new Vinyl({
			path: paths
		})
		if(file.stem.indexOf('_') === 0) {
			console.log('제외')
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
			return
		}
		if(file.stem.indexOf('-P')>=0){
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('static/content/guide/mobile/include/pophead.html'))
				.pipe(headerfooter.footer('static/content/guide/mobile/include/popfoot.html'))
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
		}else{
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('static/content/guide/mobile/include/head.html'))
				.pipe(headerfooter.footer('static/content/guide/mobile/include/foot.html'))
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
		}
	})
}
function watchContent(targets) {
	const watcher = watch('static/content/guide/**/*.html');
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		})
		console.log(file.stem.indexOf('-P'))
		if(file.dirname.indexOf('mobile') >= 0) {
			return
			console.log('제외')
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
		}
		if(file.stem.indexOf('_') === 0) {
			console.log('제외')
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
			return
		}
		if(file.stem.indexOf('-P')>=0){
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('static/content/' + targets + '/include/pophead.html'))
				.pipe(headerfooter.footer('static/content/' + targets + '/include/popfoot.html'))
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
		}else{
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('static/content/' + targets + '/include/head.html'))
				.pipe(headerfooter.footer('static/content/' + targets + '/include/foot.html'))
				.pipe(gulp.dest(file.dirname.replace('guide','guide-new')));
		}
	})
}


function mail() {
	return gulp
		.src('src/*.html') //대상 파일
		.pipe(inlineCss())
		.pipe(gulp.dest('dist/'));
}

function tojsp(cb) {
	console.log('---jspout---');
	for (var i = projectlist.length - 1; i >= 0; i--) {
		gulp.src(`static/guide/${projectlist[i]}/content/*.html`)
			.pipe(headerfooter.header('<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>'))
			.pipe(rename({ extname: '.jsp' }))
			.pipe(gulp.dest(`WEB-INF/jsp/cts/${projectlist[i]}/`));
	}
	cb();
}

function dist(cb) {
	var targets = 'kias';
	gulp.src('static/guide/' + targets + '/content/*.html')
		.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
		.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
		.pipe(gulp.dest('static/guide/' + targets + '/dist'));

	gulp.src('static/guide/' + targets + '/lib/*.html')
		.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
		.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
		.pipe(gulp.dest('static/guide/' + targets + '/dist'));
	cb();
}

function imgmin(cb) {
	gulp.src('static/*/img/**').pipe(imagemin()).pipe(gulp.dest('dist/images'));
	cb();
}


// exports.watchscss = watchscss;
exports.default = series(parallel(servers, waths));
// exports.default   = series(clean, parallel(html, watchFiles));
exports.server = series(servers);
exports.mail = mail;
exports.imgmin = imgmin;
