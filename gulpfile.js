const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
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
});

gulp.task('default', gulp.parallel('styles', 'html', 'browser-sync', 'watch'));
