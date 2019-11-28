module.exports = {
    dist: {
        options: {
            force: true
        },
        src: [
            './dist/*'
        ]
    },
    inline: {
        options: {
            force: true
        },
        src: [
            './dist/js/inline'
        ]
    },
    // integrate: {
    //     options: {
    //         force: true
    //     },
    //     src: [
    //         '../REPLACE/*',
    //         '!../REPLACE/ME'
    //     ]
    // }
};
