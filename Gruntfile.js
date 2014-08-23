module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          livereload: 35729,
          port: 8000,
          host: 'localhost'
        }
      }
    },
    concat: {// 2. Configuration for concatinating files goes here.
      dist: {
        src: [
          'js/main.js',  // This specific file
          'js/functions.js'
        ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
            'css/<%= pkg.name %>.min.css': 'css/style.scss'
        }
      } 
    },
    watch: {
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false,
        }
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        },
      } 
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['connect', 'concat', 'uglify', 'sass', 'watch', ]);

};