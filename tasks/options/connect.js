module.exports = {
    dev: {
        options: {
            hostname: '*',  // if you want this visible by IP in local network, change to '*'
            // hostname: '<%= grunt.config.get("ip") %>',
            port: 9090,
            base: 'dist/',
            appName: 'open',
            open: true,
            livereload: false
        }
    }
};
