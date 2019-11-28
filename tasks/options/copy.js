module.exports = {
    options: {
        processContentExclude: [
            '.DS_Store',
            '.gitignore',
            '.sass-cache',
            'node_modules',
            'ruby_gems'
        ]
    },
    fonts: {
        files: [{
            cwd: 'src/fonts/',
            dest: 'dist/fonts/',
            src: ['**/*.{ttf,otf,eot,woff,svg}'],
            expand: true
        }]
    },
    images: {
        files: [{
            cwd: 'src/images/',
            dest: 'dist/img/',
            src: ['**/*.{gif,jpg,png,svg}', '!**/sprites/*.png'],
            expand: true
        }]
    },
    scripts: {
        files: [{
            cwd: 'src/scripts/',
            dest: 'dist/js/',
            src: ['*.{js,htc,map}'],
            expand: true
        }, {
            cwd: 'src/scripts/inline/',
            dest: 'dist/js/inline/',
            src: ['*.{js,htc,map}'],
            expand: true
        }]
    },
    assets: {
        files: [{
            cwd: 'src/assets/',
            dest: 'dist/',
            src: ['**/*'],
            expand: true,
            dot: true
        }]
    },
};
