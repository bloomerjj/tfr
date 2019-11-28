module.exports = function(grunt) {

    grunt.registerTask('images:watch', ['newer:copy:images']);
    grunt.registerTask('images:dev', ['copy:images']);
    grunt.registerTask('images:prod', ['copy:images']);

    grunt.registerTask('scripts:watch', ['newer:jshint:dev', 'newer:copy:scripts', 'newer:concat:dev']);
    grunt.registerTask('scripts:dev', ['jshint:dev', 'copy:scripts', 'concat:dev']);
    grunt.registerTask('scripts:prod', ['jshint:dev', 'copy:scripts', 'concat:prod', 'uglify:prod']);

    grunt.registerTask('assets', ['copy:assets']);

    grunt.registerTask('styles:dev', ['sass:dev', 'postcss:prod']);
    grunt.registerTask('styles:prod', ['sass:prod', 'postcss:prod']);

    grunt.registerTask('markup:watch', ['newer:pug:dev', 'html2js']);
    grunt.registerTask('markup:dev', ['pug:dev', 'html2js']);
    grunt.registerTask('markup:prod', ['pug:prod', 'html2js']);

    grunt.registerTask('build:dev', ['clean:dist', 'images:dev', 'assets', 'markup:dev', 'scripts:dev', 'styles:dev', 'connect:dev']);
    grunt.registerTask('build:prod', ['clean:dist', 'images:prod', 'assets', 'markup:prod', 'scripts:prod', 'styles:prod', 'inline:prod', 'clean:inline']);

    grunt.registerTask('default', ['build:dev', 'watch']);
    grunt.registerTask('serve', ['build:dev', 'connect', 'watch']); // use this you plan to serve files without apache
    grunt.registerTask('debug', ['build:dev', 'concurrent:local']); // use this if you plan on using weinre to debug
    grunt.registerTask('debug-serve', ['build:dev', 'connect', 'concurrent:local']); // use this if you plan on using weinre to debug without apache
    
    grunt.registerTask('dev', ['build:dev']);
    grunt.registerTask('prod', ['build:prod']);

    // grunt.registerTask('integrate', ['build:prod', 'clean:integrate', 'copy:integrate']);

};
