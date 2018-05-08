(function(){
	'use strict';	
});


var gulp = require('gulp'),
	nib = require('nib'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	stylus = require('gulp-stylus'),
	rigger = require('gulp-rigger'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	spritesmith = require("gulp.spritesmith"),
	svgsprite = require("gulp-svg-sprites"),
	svgmin = require("gulp-svgmin"),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		distjs: 'build/js/',
		js: 'build/js/',
		css: 'build/css/',
		distcss: 'build/css/',
		img: 'build/img/',
		pic: 'build/pic/',
		font: 'build/font/',
		sprite: 'build/img/',
		svgsprite: 'build/img/'
	},
	src: {
		html: 'src/*.html',
		distjs: 'src/js/dist/*',
		js: 'src/js/*.js',
		style: 'src/style/style.styl',
		distcss: 'src/style/dist/*',
		img: 'src/img/**/*.*',
		pic: 'src/pic/**/*.*',
		font: 'src/font/**/*.*',
		sprite: 'src/icon/*.*',
		spritevar: 'src/style/chunk/',
		svgsprite: 'src/svg/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.styl',
		img: 'src/img/**/*.*',
		pic: 'src/pic/**/*.*',
		font: 'src/font/**/*.*',
		sprite: 'src/icon/*.*',
		svgsprite: 'src/svg/**/*.*'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "MyBuild"
};

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('dist:build', function() {
    gulp.src(path.src.distjs)
        .pipe(gulp.dest(path.build.distjs));
    gulp.src(path.src.distcss)
        .pipe(gulp.dest(path.build.distcss));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(stylus({use: nib()}))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('pic:build', function () {
    gulp.src(path.src.pic)
        .pipe(gulp.dest(path.build.pic))
        .pipe(reload({stream: true}));
});

gulp.task('font:build', function() {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font));
});

gulp.task('sprite:build', function() {
	var spriteData = 
		gulp.src(path.src.sprite)
			.pipe(spritesmith({
//				retinaSrcFilter: 'src/icon/*@2x.png',
				imgName: 'sprite.png',
//				retinaImgName: 'sprite-2x.png',
				cssName: 'spritevar.styl',
				cssFormat: 'stylus',
				algorithm: 'binary-tree',
				cssTemplate: 'sprite.template.mustache',
				padding: 10
			}));
	spriteData.img.pipe(gulp.dest(path.build.sprite));
	spriteData.css.pipe(gulp.dest(path.src.spritevar));
});

//gulp.task('svgsprite:build', function () {
//	return gulp.src('src/svg/*.svg')
//		.pipe(svgmin({
//            js2svg: {
//                pretty: true
//            }
//        }))
//		.pipe(svgsprite({
//			mode: "symbols", 
//			preview: false, 
//			svg: {symbols: "sprite.svg"}
//		}))
//		.pipe(gulp.dest('build/img'));
//});

gulp.task('build', [  
    'html:build',
    'dist:build',
    'js:build',
    'style:build',
    'font:build',
    'image:build',
    'pic:build',
    'sprite:build'
//    'svgsprite:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
        gulp.start('dist:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.pic], function(event, cb) {
        gulp.start('pic:build');
    });
    watch([path.watch.font], function(event, cb) {
        gulp.start('font:build');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite:build');
    });
	watch([path.watch.svgsprite], function(event, cb) {
        gulp.start('svgsprite:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);