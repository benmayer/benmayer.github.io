module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage %>/ | ' +
                'tw:// @mayer_ben \n' +
                'Copyright (c) <%= grunt.template.today("yyyy") %> */ \n',
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
          style: 'compact',
          banner : '<%= banner %>'
        },
        files: {
            'css/<%= pkg.name %>.css': 'css/main.scss'
        }
      } 
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },
    watch: {
      css: {
        files: ['css/*.scss'],
        tasks: ['sass','cssmin'],
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'watch', ]);

};