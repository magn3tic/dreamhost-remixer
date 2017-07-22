
const gulp = require('gulp'),
			gutil = require('gulp-util'),
			sass = require('gulp-sass'),
			sourcemaps = require('gulp-sourcemaps'),
			autoprefixer = require('gulp-autoprefixer'),
			concat = require('gulp-concat'),
			webpack = require('webpack'),
			argv = require('yargs').argv,
			_if = require('gulp-if'),
			del = require('del'),
			browsersync = require('browser-sync').create();

const ssg = require('./generator.js');
const isprod = !!(argv.production);


// PATHS - ASSETS & WATCHERS, ETC ---------------------------//
const PATHS = {
	//sass files to watch
	scss: '_scss/**/*.scss',

	//to resolve sass imports from node_nodules
	scssincludes: [],

	//js entry for webpack
	webpack_entry: '_js/app.js',

	//js libs in separate bundle
	plugins_js: [
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/velocity-animate/velocity.min.js',
		'node_modules/velocity-animate/velocity.ui.min.js',
		'node_modules/flickity/dist/flickity.pkgd.min.js',
		'node_modules/plyr/dist/plyr.js'
	],
	//priority(head) js
	priority_js: [
		'node_modules/pace-js/pace.min.js',
		'_asset/js/modernizr.js'
	],

	//file to hot-reload/inject changes from
	inject: 'dist/assets/css/*.css',

	//html/other files to live reload when changed
	sitefiles: ['src/**/*.html'],

	//generated/dist html files
	distfiles: ['dist/*.html'],

	//locations for generated/.dest() files
	dest: {
		css: 'dist/assets/css',
		js: 'dist/assets/js'
	}
};



// WEBPACK CONFIG -----------------------------------------//
const webpack_plugins = [];
// if (_config.env === 'production') {
// 	wpPlugins.push( new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}}) )
// }
const webpackConfig = {
	context: __dirname+'/_js',
	entry: './app.js',
	output: {
		path: __dirname+'/dist/assets/js',
		filename: 'app.bundle.js'
	},
	bail: false,
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|assets|_scss|dist|src)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
      }
    }]
	},
	plugins: webpack_plugins
};



// TASKS ----------------------------------------------//

//SERVER
//starts a browsersync server
gulp.task('server', () => {
	browsersync.init({
		server: 'dist',
		files: PATHS.inject
	});
});


//BUILD
//delete html files in the /dist
gulp.task('build', () => {
	return del(PATHS.distfiles).then(ssg.build);
});


//SCSS
//compiles sass files & writes sourcemaps
gulp.task('scss', () => {
	return gulp.src(PATHS.scss)
		.pipe(_if(!isprod, sourcemaps.init()))
		.pipe(sass({
			outputStyle: isprod ? 'compressed' : 'nested',
			includePaths: PATHS.scssincludes
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 0.5%', 'last 5 versions']
		}))
		.pipe(_if(!isprod, sourcemaps.write('./')))
		.pipe(gulp.dest(PATHS.dest.css));
});


//JS LIBS (separate es5 bundle)
gulp.task('jslibs', () => {
	return gulp.src(PATHS.plugins_js)
		.pipe(concat('plugins.min.js'))
		.pipe(gulp.dest(PATHS.dest.js));
});
//JS Priority 
gulp.task('jspriority', () => {
	return gulp.src(PATHS.priority_js)
		.pipe(concat('priority.min.js'))
		.pipe(gulp.dest(PATHS.dest.js));
});

// build webpack once, without watching
gulp.task('webpackonce', () => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({chunks: false}));
    });
});

//WEBPACK
gulp.task('webpack', () => {
	var webpackCompiler = webpack(webpackConfig);
	webpackCompiler.watch({}, (err, stats) => {
		if (err) {
    	throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({chunks: false}));
    browsersync.reload();
	});
});


//DEBUG
gulp.task('debug', () => {
	console.log(argv);
});


// DEFAULT TASK
gulp.task('default', ['build', 'scss', 'jslibs', 'webpack', 'server'], () => {
	//browsersync will inject changes in compiled css (hot reload)
	gulp.watch(PATHS.scss, ['scss']);
	//rebuild on changes to html in /src
	gulp.watch(PATHS.sitefiles, ['build']);
	//reload browser after rebuild occurs
	gulp.watch(PATHS.distfiles).on('change', browsersync.reload);
});

gulp.task('build-dist', ['build', 'scss', 'jslibs', 'webpackonce']);
