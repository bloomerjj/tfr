module.exports = {
    options: {
        width: '641px',
        px_em_ratio: 16,
        with_queries: false
    },
    dev: {
        files: {
            'dist/css/oldie.css': ['dist/css/styles.css']
        }

    },
    prod: {
        files: {
            'dist/css/oldie.css': ['dist/css/styles.css']
        }
    }
};
