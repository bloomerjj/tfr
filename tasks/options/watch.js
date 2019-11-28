module.exports = {
    options: {
        dot: true,
        interrupt: false,
        livereload: true,
        livereloadOnError: true,
        spawn: false
    },
    markup: {
        files: ['src/markup/**/*.{yaml,pug,html,jsp}', '!src/markup/pages/**/*.{yaml,pug,html,jsp}'],
        tasks: ['markup:dev']
    },
    markup_pages: {
        files: ['src/markup/pages/**/*.{yaml,pug,html,jsp}', 'src/markup/pages/*.{yaml,pug,html,jsp}'],
        tasks: ['markup:watch']
    },
    tasks: {
        files: ['tasks/**/*.js'],
        tasks: ['jshint:tasks', 'build:dev']
    },
    images: {
        files: ['src/images/**/*.{gif,jpg,png}', '!src/images/**/sprites/*.png'],
        tasks: ['images:watch']
    },
    styles: {
        files: ['src/styles/**/*.scss', 'src/images/**/sprites/*.png'],
        tasks: ['styles:dev']
    },
    scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['scripts:watch']
    },
    assets: {
        files: [
            'src/assets/**/*'
        ],
        tasks: ['newer:copy:assets']
    }
};
