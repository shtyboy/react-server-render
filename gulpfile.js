const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', ['imagemin_public', 'imagemin_src']);
gulp.task('imagemin', ['imagemin_public', 'imagemin_src']);

gulp.task('imagemin_public', () =>{
  gulp.src('./public/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./public'));
});

gulp.task('imagemin_src', () =>{
  gulp.src('./client/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./client'));
});
