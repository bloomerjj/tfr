var files = {
    'dist/js/head.js': [
        'src/scripts/vendor/console.min.js',
        'src/scripts/vendor/requestAnimationFrame.min.js',
        'src/scripts/vendor/modernizr.custom.min.js',
        'src/scripts/vendor/respond.min.js',
        'src/scripts/vendor/media.match.min.js',
        'src/scripts/vendor/matchmedia.addListener.min.js',
        'src/scripts/vendor/picturefill.min.js'
    ],
    'dist/js/vendor.js': [
        'src/scripts/vendor/lodash.min.js',
        'src/scripts/vendor/parseuri.min.js',
        'src/scripts/vendor/fastclick.min.js',
        'src/scripts/vendor/jquery.min.js',
        'src/scripts/vendor/angular.min.js',
        // 'src/scripts/vendor/angular-route.min.js',
        'src/scripts/vendor/angular-sanitize.min.js',
        // 'src/scripts/vendor/angular-cookies.min.js',
        'src/scripts/vendor/matchmedia-ng.min.js',
        'src/scripts/vendor/angular-scroll.min.js',
        'src/scripts/vendor/bowser.min.js',
        'src/scripts/vendor/moment.min.js',
        'src/scripts/vendor/he.min.js',
        'src/scripts/vendor/mobiscroll.custom-2.15.0.min.js',
        'src/scripts/vendor/catchall.js',
        'src/scripts/vendor/anchorScroll.js',
        'src/scripts/vendor/simplebar.js',
        // detect zoom pulled from Hangar's bower components
        // git://github.com/tombigel/detect-zoom.git"
        'src/scripts/vendor/detect-zoom.min.js',

        // hangar zoom includes the modules hangar used to apply classes to body on page zoom
        'src/scripts/vendor/hangar-zoom.js',
    ],
    'dist/js/app.js': [
        'src/scripts/app/vendor/ngMask.js',
        'src/scripts/app/vendor/rcMailgun.js',
        'src/scripts/app/services/services.js',
        'src/scripts/app/services/modalService.js',
        'src/scripts/app/services/analyticsProvider.js',
        'src/scripts/app/controllers/controllers.js',
        'src/scripts/app/controllers/mainController.js',
        'src/scripts/app/controllers/modalController.js',
        'src/scripts/app/directives/directives.js',
        'src/scripts/app/filters/filters.js',
        'src/scripts/app/app.js',
    ]
};

module.exports = {
    options: {
        separator: ';'
    },
    dev: {
        options: {
            sourceMap: true
        },
        files: files
    },
    prod: {
        options: {
            sourceMap: false
        },
        files: files
    }
};
