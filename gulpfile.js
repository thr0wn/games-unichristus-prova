var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();

var resources = {
    tmp: '.tmp',
    out: 'dist',
    views: [
        'public/index.html',
        'public/views/**/*.html'
    ],
    styles: [
        'public/styles/**/*.css'
    ],
    javascript: [
        'public/src/index.js',
        'public/src/**/*.js'
    ],
    imgs: 'public/imgs/**/*'
};

gulp.task('clean', function () {
    return del([
        resources.tmp,
        resources.out
    ]);
});

gulp.task('inject', function () {
    var appFiles = gulp.src(resources.styles.concat(resources.javascript), { read: false });
    var vendorFiles = gulp.src(mainBowerFiles(), { read: false });

    return gulp.src(resources.views, { base: 'public' })
        .pipe(plugins.inject(appFiles, { name: 'app', removeTags: true }))
        .pipe(plugins.inject(vendorFiles, { name: 'vendor', removeTags: true }))
        .pipe(gulp.dest(resources.tmp));
});

gulp.task('useref', function () {
    var useref = gulp.src(path.join(resources.tmp, '**/*.html'))
        .pipe(plugins.useref({ searchPath: __dirname, noconcat: !argv.release}));
    if (argv.release) {
        useref = useref
            .pipe(plugins.if('*.js', plugins.uglify()))
            .pipe(plugins.if('*.css', plugins.minifyCss()))
            .pipe(plugins.if('!**/*.html', plugins.rev()))
            .pipe(plugins.revReplace())
    }
    return useref
        .pipe(gulp.dest(resources.out));
});

gulp.task('copy', function () {
    return gulp.src(resources.imgs, { base: 'public' })
        .pipe(gulp.dest(resources.out));
});

gulp.task('build', function (cb) {
    plugins.sequence('clean', 'copy', 'inject', 'useref')(cb);
});

gulp.task('serve', ['build'], function () {
    var app = require('./bin/www');

    // Serve files from the root of this project
    browserSync.init({
        proxy: 'localhost:65433'
    });

    plugins.watch([
        'bower.json',
        'public/**/*'
    ], function () {
        plugins.sequence('build', function () {
            browserSync.reload();
        });
    });
});

gulp.task('default', ['build']);
