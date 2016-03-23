/*var minifyCss   = require('gulp-minify-css');
	less        = require('gulp-less');
	notify      = require('gulp-notify');
	autoprefix = require('gulp-autoprefixer');
	browserSync = require('browser-sync');
	reload      = browserSync.reload;
	concat = require('gulp-concat');*/
var gulp        = require('gulp');
	gulpLoadPlugins = require('gulp-load-plugins');
	plugins = gulpLoadPlugins();
    pngquant = require('imagemin-pngquant');
	browserSync = require('browser-sync');
	reload  = browserSync.reload;
	html = {
		cosmos:['dev/cosmos/index.html'],
		psd_1:['dev/psd-1/index.html']
	};
	css	= {
		cosmos:['dev/cosmos/**/*.*ss'],
		firstScreen_cosmos: ['dev/cosmos/css/firstscreen/firstscreen.les_s'],
		psd_1:['dev/psd-1/**/*.*ss'],
		firstScreen_psd_1: ['dev/psd-1/css/firstscreen/firstscreen.les_s']
	};
	img	= {
		cosmos:['dev/cosmos/img/*.*'],
		psd_1:['dev/psd-1/img/*.*']
	};

//////////
// HTML //
//////////
gulp.task('html_cosmos', function(){
  return gulp.src(html.cosmos)
    .pipe(gulp.dest('build/cosmos'))
    // .pipe(reload({stream:true}))
	.pipe(plugins.notify('cosmos HTML built! Check new files'));
});
gulp.task('html_psd_1', function(){
  return gulp.src(html.psd_1)
    .pipe(gulp.dest('build/psd-1'))
    .pipe(reload({stream:true}))
	.pipe(plugins.notify('psd-1 HTML built! Check new files'));
});

//////////////	
// LESS+CSS //
//////////////
gulp.task('firstScreen_cosmos', function(){
  return gulp.src(css.firstScreen_cosmos)
	.pipe(plugins.less())
	.pipe(plugins.autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('build/cosmos/css'))
    // .pipe(reload({stream:true}))
	.pipe(plugins.notify('cosmos CSS for firstScreen built! Check new files'));
});

gulp.task('css_cosmos', function(){
  return gulp.src(css.cosmos)
	.pipe(plugins.concat('css/style.css'))
	.pipe(plugins.less())
	.pipe(plugins.autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('build/cosmos'))
    // .pipe(reload({stream:true}))
	.pipe(plugins.notify('cosmos CSS built! Check new files'));
});

gulp.task('firstScreen_psd_1', function(){
  return gulp.src(css.firstScreen_psd_1)
	.pipe(plugins.less())
	.pipe(plugins.autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('build/psd-1/css'))
    .pipe(reload({stream:true}))
	.pipe(plugins.notify('psd-1 CSS for firstScreen built! Check new files'));
});

gulp.task('css_psd_1', function(){
  return gulp.src(css.psd_1)
	.pipe(plugins.less())
	.pipe(plugins.autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	}))
    .pipe(plugins.minifyCss())
	.pipe(plugins.concat('css/style.css'))
    .pipe(gulp.dest('build/psd-1'))
    .pipe(reload({stream:true}))
	.pipe(plugins.notify('psd-1 CSS built! Check new files'));
});


/////////	
// IMG //
/////////
gulp.task('img_cosmos', function(){
  return gulp.src(img.cosmos)
	.pipe(plugins.imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox:false}],
		use: [pngquant()],
		interlaced: true
	}))
    .pipe(gulp.dest('build/cosmos/img'))
    // .pipe(reload({stream:true}))
	/* .pipe(plugins.notify('cosmos IMG built! Check new files')); */
});

gulp.task('img_psd_1', function(){
  return gulp.src(img.psd_1)
  	.pipe(plugins.imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox:false}],
		use: [pngquant()],
		interlaced: true
	}))
    .pipe(gulp.dest('build/psd-1/img'))
    .pipe(reload({stream:true}))
/* 	.pipe(plugins.notify('psd-1 IMG built! Check new files')); */
});


// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('bsync_cosmos', function() {
  browserSync({
    server: {
      baseDir: "./build/cosmos"
    },
    port: 8080,
    open: true,
    notify: true
  });
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./build/psd-1"
    },
    port: 8080,
    open: true,
    notify: true
  });
});

gulp.task('watcher', function(){
  gulp.watch(html.cosmos, ['html_cosmos']);
  gulp.watch(html.psd_1, ['html_psd_1']);
  gulp.watch(css.cosmos, ['css_cosmos']);
  gulp.watch(css.firstScreen_cosmos, ['firstScreen_cosmos']);
  gulp.watch(css.psd_1, ['css_psd_1']);
  gulp.watch(css.firstScreen_psd_1, ['firstScreen_psd_1']);
  gulp.watch(img.cosmos, ['img_cosmos']);
  gulp.watch(img.psd_1, ['img_psd_1']);
});



gulp.task('compile_cosmos', ['html_cosmos', 'firstScreen_cosmos', 'css_cosmos', 'img_cosmos']);

gulp.task('compile_psd-1', ['html_psd_1', 'firstScreen_psd_1', 'css_psd_1', 'img_psd_1']);

gulp.task('default', ['html_cosmos', 'html_psd_1', 'firstScreen_cosmos', 'css_cosmos', 'firstScreen_psd_1', 'css_psd_1', 'img_cosmos', 'img_psd_1', 'watcher', 'browserSync']); 

/*
// ////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
  // .pipe(reload({stream:true}))
  .pipe(notify('HTML built! Browser refreshed'));
});
*/

