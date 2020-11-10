const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    rigger = require('gulp-rigger');


gulp.task('styles', function(){ // Создаем таск "sass"
    return gulp.src('app/styles/style.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('docs/css')) // Выгружаем результата в папку docs/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('docs'))
        .pipe(browserSync.reload({ stream: true }))

});

gulp.task('scripts', function() {
    return gulp.src('app/script.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('docs/js')) // Выгружаем результата в папку docs/js
        .pipe(browserSync.reload({ stream: true }))

});

gulp.task('images', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'))
);

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'docs' // Директория для сервера - docs
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.scss', gulp.parallel('styles')); // Наблюдение за sass файлами
    gulp.watch('app/**/*.html', gulp.parallel('html')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/script.js', gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
    gulp.watch('app/img/*', gulp.parallel('images')); // Наблюдение за картинками
});

gulp.task('default', gulp.parallel('styles', 'html', 'scripts', 'images', 'browser-sync', 'watch'));
