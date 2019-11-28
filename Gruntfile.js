module.exports = function(grunt) {

    'use strict';

    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {
            cwd: path
        }).forEach(function(option) {
            key = option.replace(/\.js$/, '');
            object[key] = require(path + option);
        });

        return object;
    }

    var os = require('os'),
        _ = require('lodash');

    // console.log('cacheDir: ' + os.tmpdir());

    var ip = _.chain(require('os').networkInterfaces()).flatten().filter(function(val) {
        return (val.family === 'IPv4' && val.internal === false);
    }).pluck('address').first().value();

    var cfg = {
        pkg: grunt.file.readJSON('package.json'),
        ip: ip
    };

    grunt.util._.extend(cfg, loadConfig('./tasks/options/'));

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*'],
        config: './package.json',
        scope: 'devDependencies'
    });

    grunt.loadTasks('tasks');

    grunt.initConfig(cfg);

};
