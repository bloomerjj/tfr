var files = {
    'dist/js/app.js': ['dist/js/app.js']
};

module.exports = {
    options: {

    },
    dev: {
        options: {
            compress: {
                drop_console: false
            },
            sourceMapIn: function(src) {
                return src + '.map';
            },
            sourceMap: true
        },
        files: files
    },
    prod: {
        options: {
            compress: {
                drop_console: true
            },
            sourceMapIn: function(src) {
                return src + '.map';
            },
            sourceMap: false
        },
        files: files
    }
};
