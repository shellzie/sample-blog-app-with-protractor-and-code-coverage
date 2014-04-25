'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    dirs: {
      // configurable paths
      app: 'blog',
      coverageE2E: 'coverage/e2e',
      instrumentedE2E: '<%= dirs.coverageE2E %>/instrumented',
      javascriptDirectory: '<%= dirs.instrumentedE2E %>/<%= dirs.app %>/app/assets/javascripts'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      coverageE2E: {
        options: {
          script: '<%= dirs.instrumentedE2E %>/server/server.js',
          debug: true
        }
      },
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    // Empties folders to start fresh
    clean: {
      coverageE2E: {
        src: ['<%= dirs.coverageE2E %>/']
      },
      javascript: {
          src: ['<%= dirs.javascriptDirectory %>/*.js']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      coverageE2E: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.app %>',
          dest: '<%= dirs.instrumentedE2E %>/<%= dirs.app %>',
          src: [
            './**/*'
          ]
        }]
      }
    },

    // start - code coverage settings
    instrument: {
      files: ['<%= dirs.app %>/app/assets/**/*.js'],
      options: {
        lazy: true,
        basePath: '<%= dirs.instrumentedE2E %>/'
      }
    },

    makeReport: {
      src: '<%= dirs.instrumentedE2E %>/*.json',
      options: {
        type: 'lcov',
        dir: '<%= dirs.coverageE2E %>/reports',
        print: 'detail'
      }
    },

    protractor_coverage: {
      options: {
        configFile: '<%= dirs.app %>/test/protractorConf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        coverageDir: '<%= dirs.instrumentedE2E %>',
        args: {}
      },
      phantom: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            // Arguments passed to the command
            'browser': 'phantomjs'
          }
        }
      },
      chrome: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            // Arguments passed to the command
            'browser': 'chrome'
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'clean:coverageE2E',
    'copy:coverageE2E',
    'instrument',
    'express:coverageE2E',
    'protractor_coverage:chrome',
    'makeReport'
  ]);

    grunt.registerTask('instrumentation', [
        'clean:coverageE2E',
        'copy:coverageE2E',
        'clean:javascript',//,
        'instrument'
    ]);

    grunt.registerTask('execution', [
        'protractor_coverage:chrome',
        'makeReport'
    ]);


};
