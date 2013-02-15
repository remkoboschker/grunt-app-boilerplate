/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      '<%= pkg.license ? " * Licensed: " + pkg.license + "\\n" : "" %> */\n\n',

    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      scripts: {
        files: {
          'dist/debug/scripts/vendors.js': ['vendor/{jquery,underscore}/*.js', 'vendor/**/*.js'],
          'dist/debug/scripts/main.js': ['dist/tmp/templates.js', 'app/{scripts,modules}/**/*.js']
        }
      },
      styles: {
        files: {
          'dist/debug/styles/vendors.css': ['vendor/h5bp/normalize.css', 'vendor/**/*.css'],
          'dist/debug/styles/main.css': ['app/{styles,modules}/**/*.css']
        }
      }      
    },

    /*uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },*/

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/{scripts,modules}/**/*.js']
      }
    },

/*    qunit: {
      files: ['test/**.html']
    },
*/
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app_scripts: {
        files: '<%= coffee.dev.src %>',
        tasks: ['coffee', 'jshint:app']
      },
      app_styles: {
        files: '<%= sass.dev.files[0].src %>',
        tasks: ['sass']
      }      
    },

    bower: {
      dev: {
        dest: 'vendor',
        options: {
          basePath: 'components',
          stripJsAffix: true
        }
      }
    },

    coffee: {
      dev: {
        expand: true,
        src: ['app/{scripts,modules}/**/*.coffee'],
        ext: '.js'
      }
    },

    sass: {                         
      dev: {                      
        options: {                
          style: 'expanded',
          //debugInfo: true          
          lineNumbers: true
        },
        files: [{
          expand: true,
          src: ['app/{styles,modules}/**/*.scss'],
          ext: '.css'
        }]
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },
        files: {
          "dist/tmp/templates.js": ["app/{templates,modules}/**/*.hbs"]
        }
      }
    },

    targethtml: {
      debug: {
        files: {
          "dist/debug/index.html": "app/index.html"
        }
      }    
    },

    clean: {
      debug: ["dist/debug"],
      tmp: ["dist/tmp"]
    },

    copy: {
     debug: {
        files: [
          { expand: true, cwd: 'app/', src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess'], dest: "dist/debug/" }
        ]
      }
    }    

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jst');
  //grunt.loadNpmTasks('grunt-contrib-mincss');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-targethtml');

  grunt.registerTask('scripts', ['coffee', 'jshint']);
  grunt.registerTask('styles', ['sass']);
  
  grunt.registerTask('default', ['scripts', 'styles']);
  grunt.registerTask('debug', ['default', 'clean:debug', 'handlebars', 'concat:scripts', 'concat:styles', 'targethtml:debug', 'copy:debug', 'clean:tmp']);

};
