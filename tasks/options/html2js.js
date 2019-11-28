module.exports = {
    options: {
        htmlmin: {
            collapseWhitespace: true
        },
        module: 'templates',
        rename: function(moduleName) {
            return moduleName.replace('../dist/', '');
        }
    },
    all: {
        src: ['dist/views/**/*.html'],
        dest: 'dist/js/templates.js'
    }
};
