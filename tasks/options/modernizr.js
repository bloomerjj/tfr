module.exports = {
    all: {
        // [REQUIRED] Path to the build you're using for development.
        devFile: 'remote',

        // [REQUIRED] Path to save out the built file.
        outputFile: 'dist/js/modernizr.js',

        // Based on default settings on http://modernizr.com/download/
        extra: {
            'shiv': true,
            'printshiv': true,
            'load': false,
            'mq': false,
            'cssclasses': true
        },

        // Based on default settings on http://modernizr.com/download/
        extensibility: {
            'addtest': true,
            'prefixed': true,
            'teststyles': true,
            'testprops': true,
            'testallprops': true,
            'hasevents': true,
            'prefixes': true,
            'domprefixes': true
        },

        // By default, source is uglified before saving
        uglify: true,

        // Define any tests you want to implicitly include.
        tests: [],

        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        parseFiles: true,

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a 'files' array below.
        files: {
            src: [
                'src/**/*.{js,scss}',
                '!src/scripts/vendor/*'
            ]
        },

        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        matchCommunityTests: false,

        // Have custom Modernizr tests? Add paths to their location here.
        customTests: [
            'tasks/options/modernizr/*.js'
        ]
    }

};
