var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

var resources = {
    public: 'public/',
    views: [
        'app/index.html',
        'app/views/**/*.html'
    ]
};

gulp.task('clean', function() {
   return del(resources.public);
});

gulp.task('useref', function () {
    return gulp.src(resources.views)
        .pipe(plugins.useref())
        .pipe(gulp.dest(resources.public));
});
