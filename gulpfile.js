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
var mocha         = require('gulp-mocha');
var karma         = require('gulp-karma');
var protractor    = require('gulp-protractor').protractor;
var shell         = require('gulp-shell');
var runSequence   = require('run-sequence');

/*******************************************************
 *            File Paths and Values
 ******************************************************/


var paths = {
  clientScripts: {
    //All js files except the compiled templateCache.js file
    src: ['client/app/**/*.js', '!client/app/modules/templateCache.js', '!client/app/lib/**/*.js'],
    //Destination of browserified files
    dest: 'client/ionic/www'
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
    dest: 'client/ionic/www'
  },

  oauthcallback: {
    src: ['client/app/oauthcallback.html']
  },

  sassFiles: {
    //sassfiles
    src: ['client/app/**/*.scss'],
    mainSrc: ['client/app/styles.scss'],
    dest: 'client/ionic/www'
  },

  serverScripts: {
    //Server side scripts
    src: ['./server.js', 'server/**/*.js']
  },

  //Location of files to serve for livereload
  livereloadRoot: 'client/ionic/www',

  //Main js file client side
  mainClientAppFile: 'client/app/app.js',

  //Name of main app module in main client js file
  ngAppName: 'app',

  //Main js file server side
  mainServerAppFile: 'server.js',

  //Nodemon files to not watch
  nodemonIgnoreFiles: ['node_modules/**/*.js', 'client/**/*.js'],

  publicPathsToClean: ['client/ionic/www/**/*.html', 'client/ionic/www/**/*.js', 'client/ionic/www/**/*.css', '!client/ionic/www/ionic.bundle.js'],

  buildPathsToClean: ['client/ionic/platforms/**/*'],

  serverSideMochaTestFiles: ['server/**/*.unit.test.js'],

  karmaTestFiles: ['client/app/**/*.unit.test.js'],

  karmaConfigFile: 'client/app/config/karma.config.js',


//Protractor Setup
//Make sure you update the webdriver-manager after a clean npm install (it will add the Jar file and chrome driver):
//  ./node_modules/protractor/bin/webdriver-manager update
//Make sure the line 28 in the protractor config file is pointing to the right Jar file
//  seleniumServerJar: '../../../node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar'
//Make Sure the chromium driver on line 40 is pointing to the correct path
//  chromeDriver: '../../../node_modules/protractor/selenium/chromedriver'

  protractorTestFiles: ['client/app/**/*.e2e.test.js'],

  protractorConfigFile: 'client/app/config/protractor.config.js'
};

/*******************************************************
 *            Client Side Build Tasks 
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
	return gulp
    .src(paths.htmlTemplates.src)
		.pipe(templateCache(paths.htmlTemplates.templateCacheName,{module: paths.ngAppName}))
		.pipe(gulp.dest(paths.htmlTemplates.dest));
});

//Concatenate all of the dependencies in app.js via Browserify
gulp.task('browserify', ['templateCache'], function(){
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
  gulp.watch(paths.oauthcallback.src, ['oauthcallback']);
});

//Move index.html file into public folder
gulp.task('index', function() {
  gulp
    .src(paths.index.src)
    .pipe(gulp.dest(paths.index.dest))
    .pipe(connect.reload());
});

//Move oauthcallback.html file into public folder
gulp.task('oauthcallback', function() {
  gulp
    .src(paths.oauthcallback.src)
    .pipe(gulp.dest(paths.index.dest))
    .pipe(connect.reload());
});


//Compile styles
gulp.task('styles', function() {
  gulp
    .src(paths.sassFiles.mainSrc)
    // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
    .pipe(sass({onError: function(e) { console.log('Sass Compilation Error: ',e); } }))
    // Optionally add autoprefixer
    .pipe(autoprefixer("last 2 versions", "> 1%"))
    .pipe(gulp.dest(paths.sassFiles.dest))
    .pipe(connect.reload());
});

//Delete Public Files
gulp.task('clean', function(){
  return gulp
    .src(paths.publicPathsToClean, {read:false})
    .pipe(clean());
});


/*******************************************************
 *            Client Side Testing Tasks 
 ******************************************************/

gulp.task('karma', function(){
  return gulp
    .src(paths.karmaTestFiles)
    .pipe(karma({configFile: paths.karmaConfigFile, action: 'run'}));
});

gulp.task('protractor', function(){
  gulp.src(paths.protractorTestFiles)
    .pipe(protractor({
        configFile: paths.protractorConfigFile
    }))    
    .on('error', function(e) {console.log('Protractor Error: ', e);});
});
/*******************************************************
 *            Server Side Build Tasks 
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
 *            Server Side Testing Tasks 
 ******************************************************/

gulp.task('serverUnitTests', function(){
  return gulp
    .src(paths.serverSideMochaTestFiles, {read: false})
    .pipe(mocha({reporter: 'min'}));
    // .on('error', function(){console.log('Error');});
});

/*******************************************************
 *            Defined Task Groups
 ******************************************************/

//Delete Ionic Platform Files
gulp.task('buildIos', shell.task(['npm run-script rebuild']));
gulp.task('clientBuildTasks', ['clean', 'connect', 'clientLint', 'templateCache', 'browserify', 'styles', 'oauthcallback', 'index', 'clientWatch']);
gulp.task('serverBuildTasks', ['serverLint', 'serverUnitTests', 'serve']);
gulp.task('clientTestingTasks', ['karma', 'protractor']);
gulp.task('serverTestingTasks', ['serverUnitTests']);
gulp.task('default', ['serverBuildTasks', 'clientBuildTasks']);
