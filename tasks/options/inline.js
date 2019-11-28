module.exports = {
    prod: {
        options: {
            cssmin: true,
            uglify: true,
            exts: [
                'html',
                'jsp'
            ]
        },
        src: ['dist/**/*.{html,jsp}', '!dist/views/**/*.{html,jsp}']
    }
};
