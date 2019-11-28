module.exports = {
    options: {
        force: true,
        quiet: false,
        trace: true,
        noCache: false,
    },
    dev: {
        options: {
            outputStyle: 'expanded',
            sourceMap: true
        },
        files: [{
            expand: true,
            src: ['./**/*.scss', './!**/_*.scss'],
            cwd: './src/styles/',
            dest: './dist/css/',
            ext: '.css'
        },
        {
            expand: true,
            src: ['bootstrap.scss'],
            cwd: './node_modules/bootstrap/scss/',
            dest: './dist/css/vendor/',
            ext: '.css'
        }]
    },
    prod: {
        options: {
            outputStyle: 'compressed',
            sourceMap: false
        },
        files: [{
            expand: true,
            src: ['./**/*.scss', './!**/_*.scss'],
            cwd: './src/styles/',
            dest: './dist/css/',
            ext: '.css'
        }]
    },
};
