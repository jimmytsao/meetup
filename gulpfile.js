'use strict';

var gulp          = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var browserify    = require('gulp-browserify');
var jshint        = require('gulp-jshint');
var nodemon       = require('gulp-nodemon');
var connect       = require('gulp-connect');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var clean         = require('gulp-clean');

//TODO:
//  testing

/*******************************************************
 *            File Paths and Values
 ******************************************************/

var paths = {
  clientScripts: {
    //All js files except the compiled templateCache.js file
    src: ['client/app/**/*.js', '!client/app/modules/templateCache.js'],
    //Destination of browserified files
    dest: 'client/public'
  },

  htmlTemplates: {
    //All html files in the modules folder
    src: ['client/app/modules/**/*.html'],
    //Destination of templateCached file
    dest: 'client/app/modules',
    //Name of templateCached file
    templateCacheName: 'templateCache.js'
  },

  index: {
    //Location of index.html file
    src: ['client/app/index.html'],
    //Public location of index.html file
    dest: 'client/public'
  },

  sassFiles: {
    //sassfiles
    src: ['client/app/**/*.scss'],
    dest: 'client/public'
  },

  serverScripts: {
    //Server side scripts
    src: ['./server.js', 'server/**/*.js']
  },

  //Location of files to serve for livereload
  livereloadRoot: 'client/public',

  //Main js file client side
  mainClientAppFile: 'client/app/app.js',

  //Name of main app module in main client js file
  ngAppName: 'app',

  //Main js file server side
  mainServerAppFile: 'server.js',

  //Nodemon files to not watch
  nodemonIgnoreFiles: ['node_modules/**/*.js', 'client/**/*.js'],

  publicPathsToClean: ['client/public/**/*.html', 'client/public/**/*.js', 'client/public/**/*.css']
};

/*******************************************************
 *            Client Side Gulp Tasks 
 ******************************************************/

//Gulp connect
gulp.task('connect', function() {
  connect.server({
    root: paths.livereloadRoot,
    livereload: true
  });
});

//Convert all html partials for the app and add them to the $templateCache in the 'app' module
gulp.task('templateCache', function(){
	gulp
    .src(paths.htmlTemplates.src)
		.pipe(templateCache(paths.templateCacheName,{module: paths.ngAppName}))
		.pipe(gulp.dest(paths.htmlTemplates.dest));
});

//Concatenate all of the dependencies in app.js via Browserify
gulp.task('browserify', function(){
  gulp
    .src([paths.mainClientAppFile])
    .pipe(browserify())
    .pipe(gulp.dest(paths.clientScripts.dest))
    .pipe(connect.reload());
});

//Lint files with jshint
gulp.task('clientLint', function(){
  gulp
    .src(paths.clientScripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});

//Watch files and recompile when changes occur
gulp.task('clientWatch', function(){
  gulp.watch(paths.clientScripts.src, ['clientLint', 'browserify']);
  gulp.watch(paths.htmlTemplates.src, ['templateCache', 'browserify']);
  gulp.watch(paths.sassFiles.src, ['styles']);
  gulp.watch(paths.index.src, ['index']);
});

//Move index.html file into public folder
gulp.task('index', function() {
  gulp
    .src(paths.index.src)
    .pipe(gulp.dest(paths.index.dest))
    .pipe(connect.reload());
});

//Compile styles
gulp.task('styles', function() {
  gulp
    .src(paths.sassFiles.src)
    // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
    .pipe(sass({onError: function(e) { console.log('Sass Compilation Error: ',e); } }))
    // Optionally add autoprefixer
    .pipe(autoprefixer("last 2 versions", "> 1%"))
    .pipe(gulp.dest(paths.sassFiles.dest))
    .pipe(connect.reload());
});

gulp.task('clean', function(){
  return gulp
    .src(paths.publicPathsToClean, {read:false})
    .pipe(clean());
});

/*******************************************************
 *            Server Side Gulp Tasks 
 ******************************************************/

//Lint files with jshint
gulp.task('serverLint', function(){
  gulp
    .src(paths.serverScripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//Start nodemon server
gulp.task('serve', function() {
  nodemon({script: paths.mainServerAppFile, ignore: [paths.nodemonIgnoreFiles]})
    .on('change', ['serverLint'])
    .on('restart', function () {
      //live reload
      connect.reload();
    });
});

/*******************************************************
 *            Defined Task Groups
 ******************************************************/

gulp.task('clientBuildTasks', ['clean', 'connect', 'clientLint', 'templateCache', 'browserify', 'styles', 'index', 'clientWatch']);
gulp.task('serverBuildTasks', ['serverLint', 'serve']);
gulp.task('default', ['serverBuildTasks', 'clientBuildTasks']);
