var gulp = require('gulp');

var templateCache = require('gulp-angular-templatecache');
var browserify    = require('gulp-browserify');
var jshint        = require('gulp-jshint');
var nodemon       = require('gulp-nodemon');

//TODO:
//  sass
//  live reload

var paths = {
  //All js files except the compiled templateCache.js file
  clientScripts: ['client/app/**/*.js', '!client/app/templateCache.js'],
  //All html files except the index.html page
  htmlPartials: ['client/app/**/*.html', '!client/app/index.html'],
  index: ['client/app/index.html'],
  serverScripts: ['./server.js', 'server/**/*.js']
};

/*******************************************************
 *            Client Side Gulp Tasks 
 ******************************************************/

//Convert all html partials for the app and add them to the $templateCache in the 'app' module
gulp.task('templateCache', function(){
	gulp
    .src(paths.htmlPartials)
		.pipe(templateCache('templateCache.js',{module: 'app'}))
		.pipe(gulp.dest('client/app'));
});

//Concatenate all of the dependencies in app.js via Browserify
gulp.task('browserify', function(){
  gulp
    .src(['client/app/app.js'])
    .pipe(browserify())
    .pipe(gulp.dest('client/public/js'));
});

//Lint files with jshint
gulp.task('clientLint', function(){
  gulp
    .src(paths.clientScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});

//Watch files and recompile when changes occur
gulp.task('clientWatch', function(){
  gulp.watch(paths.clientScripts, ['clientLint', 'browserify']);
  gulp.watch(paths.htmlPartials, ['templateCache', 'browserify']);
  gulp.watch(paths.index, ['index']);
});

//Move index.html file into public folder
gulp.task('index', function() {
  gulp
    .src(paths.index)
    .pipe(gulp.dest('client/public'));
});

/*******************************************************
 *            Server Side Gulp Tasks 
 ******************************************************/

//Lint files with jshint
gulp.task('serverLint', function(){
  gulp
    .src(paths.serverScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//Start nodemon server
gulp.task('serve', function() {
  nodemon({script: 'server.js', ignore: ['node_modules/**/*.js', 'client/**/*.js']})
    .on('restart', function () {
      //live reload
    });
});

gulp.task('serverWatch', function(){
  gulp.watch(paths.serverScripts, ['serverLint']);
});

/*******************************************************
 *            Defined Task Groups
 ******************************************************/

gulp.task('clientDevTasks', ['clientLint', 'templateCache', 'browserify', 'index', 'clientWatch']);
gulp.task('serverDevTasks', ['serverLint', 'serverWatch', 'serve']);
gulp.task('default', ['serverDevTasks', 'clientDevTasks']);
