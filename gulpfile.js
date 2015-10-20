'use strict';

// include gulp
var gulp       = require('gulp');

// include plug-ins
var changed        = require('gulp-changed');
var imagemin       = require('gulp-imagemin');
var minifyHTML     = require('gulp-minify-html');
var jshint         = require('gulp-jshint');
var concat         = require('gulp-concat');
var stripDebug     = require('gulp-strip-debug');
var uglify         = require('gulp-uglify');
var autoprefix     = require('gulp-autoprefixer');
var minifyCSS      = require('gulp-minify-css');
var sass           = require('gulp-sass');
var jade           = require('gulp-jade');
var notify         = require("gulp-notify");
//src file
var imgSrc         = './src/images/**/*';
var sourcesjs      =  [     
                            'bower_components/modernizr/modernizr.js',
                            'bower_components/jquery/src/jquery.js',
                                'bower_components/jquery-ui/jquery-ui.js',
                                 'bower_components/imagesloaded/imagesloaded.js', 
                                // 'bower_components/video.js/src/js/video.js',
                                 'bower_components/bigvideo/lib/bigvideo.js',

                            //'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                            //'bower_components/bootstrap-sass/assets/javascripts/bootstrap-sprockets.js',
                            
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
                            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
                            
                          

                            './src/scripts/*.js'

                            //'bower_components/OwlCarousel/owl-carousel/owl.carousel.js',
                            //'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
                           // 'bower_components/shufflejs/dist/jquery.shufflejs.js',
                           // 'bower_components/wowjs/dist/wow.js',
                            //'bower_components/isotope/dist/isotope.pkgd.js',
                            //'bower_components/imagesloaded/imagesloaded.js',
                           // 'bower_components/jquery.ajax-progress.js',
                           // 'bower_components/jquery.fitvids.js',
                           // 'bower_components/jquery.parallax-1.1.3.js',
                           // 'bower_components/jquery.sticky.js',
                           //Ы 'bower_components/_contact.js'
                            //'src/js/main-init.js'
                            ];

var htmlSrc        = './src/html/*.html';
var srcjade        ='./src/jade/*.jade';
var srcsass        ='./src/sass/styles.scss';
var imgSrccss      ='./src/img/**/*';
//src target
var csstarget      = './www/assets/styles/';
var htmlDst        = './www/';
var sasstarget     = './www/assets/styles';
var pathjstarget   = './www/assets/scripts/';
var fontsTargetbs  = './www/assets/fonts/bootstrap/';
var imgDst         = './www/assets/images';
var jadetarget     = './www/';
var opensanstarget = './www/assets/fonts/open-sans/';
var myriadprotarget = './www/assets/fonts/';
var imgDstcss      ='./www/assets/styles/img';
// tasks 

 gulp.task('copymyriadpro', function() {
    gulp.src('./src/font/*/*')
        .pipe(gulp.dest(myriadprotarget));

});

gulp.task('copyopensans', function() {
    gulp.src('./bower_components/open-sans/fonts/*/*')
        .pipe(gulp.dest(opensanstarget));
});

gulp.task('copyfont', function() {
    gulp.src([ './bower_components/bootstrap-sass/assets/fonts/bootstrap/*', 
               './bower_components/components-font-awesome/fonts/*'
             ])
        .pipe(gulp.dest(fontsTargetbs));

});
//jade task
gulp.task('jade', function() {
  gulp.src([srcjade])
    .pipe(jade())
    .pipe(gulp.dest(jadetarget))
    .pipe(notify({
            title: 'jade',
            message: 'jade-complete the work!'
    }));
}); 

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
           .pipe(notify("jshint-complete the work!"));
});
// minify new images
gulp.task('imagemin', function() {
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
         .pipe(notify({
            title: 'imagemin',
            message: 'imagemin-complete the work!'
    }));
});
// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
         .pipe(notify({
            title: 'html',
            message: 'html-complete the work!'
    }));
});
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
   gulp.src(sourcesjs)
        .pipe(concat('script.js'))
        .pipe(stripDebug())
        .pipe(uglify())

    .pipe(gulp.dest(pathjstarget))
    .pipe(notify({
            title: 'scripts',
            message: 'scripts-complete the work!'
    }));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
    gulp.src(['./src/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(csstarget))
            .pipe(notify({
            title: 'styles',
            message: 'styles-complete the work!'
    }));
});

//sass task




gulp.task('sass', function () {
  gulp.src(srcsass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(sasstarget))
    .pipe(notify({
            title: 'sass',
            message: 'sass-complete the work!'

    }));
});



// default gulp task
gulp.task('watch', ['imagemin', 'htmlpage',  'scripts', 'styles', 'sass', /*'jade'*/], function() {
    // watch for HTML changes
   gulp.watch('./src/html/*.html', function() {
    gulp.run('htmlpage');
    });

    // watch for JS changes
    gulp.watch('./src/scripts/*.js', function() {
        gulp.run('jshint', 'scripts');
    });

    // watch for CSS changes
    gulp.watch('./src/styles/*.css', function() {
        gulp.run('styles');
    });
    gulp.watch('./src/sass/{,*/}*.{scss,sass}', function() {
        gulp.run('sass');
    });
    gulp.watch('./src/images/*', function() {
        gulp.run('imagemin');
    });

  // gulp.task('./src/jade/**/*', function(){
  // gulp.run('jade');
   //});

});

gulp.task('default', function() {
 
        gulp.run('htmlpage');
        gulp.run('jshint', 'scripts');
        gulp.run('styles');
        gulp.run('sass');
        gulp.run('imagemin');
        gulp.run('imagemincss'); 
    
});


gulp.task('whtml', function() {
    // watch for HTML changes
   gulp.watch('./src/html/*.html', function() {
    gulp.run('htmlpage');
    });
});

gulp.task('imagemincss', function() {
    gulp.src(imgSrccss)
        .pipe(changed(imgDstcss))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDstc5ss))
        .pipe(notify({
            title: 'imagemincss',
            message: 'imagemincss-complete the work!'
    }));
});
