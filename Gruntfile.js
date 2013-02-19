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
          'dist/debug/scripts/vendors.js': ['www_root/bower/{jquery,underscore,handlebars}/*.js'],
          'dist/debug/scripts/main.js': ['www_root/{templates,scripts,modules}/**/*.js']
        }
      },
      styles: {
        files: {
          'dist/debug/styles/vendors.css': ['www_root/vendor/h5bp/css/normalize.css', 'www_root/vendor/h5bp/css/main.css'],
          'dist/debug/styles/main.css': ['www_root/{styles,modules}/**/*.css']
        }
      }      
    },

    uglify: {
      release: {
        expand: true,
        cwd: 'dist/debug/',
        src: ['scripts/vendors.js', 'scripts/main.js'],
        dest: 'dist/release/',
        ext: '.min.js'
      }
    },

    mincss: {
      release: {
        expand: true,
        cwd: 'dist/debug/',
        src: ['styles/vendors.css', 'styles/main.css'],
        dest: 'dist/release/',
        ext: '.min.css'
      }
    },

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
        src: ['www_root/{scripts,modules}/**/*.js']
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
        files: 'app/<%= coffee.dev.src %>',
        tasks: ['scripts']
      },
      app_styles: {
        files: 'app/<%= sass.dev.files[0].src %>',
        tasks: ['styles']
      },
      app_templates: {
        files: 'app/<%= handlebars.dev.files[0].src %>',
        tasks: ['templates']
      }            
    },

    bower: {
      dev: {
        dest: 'www_root/bower/',
        options: {
          basePath: 'components',
          stripJsAffix: true
        }
      }
    },

    coffee: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['{scripts,modules}/**/*.coffee'],
        dest: "www_root/",
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
          cwd: 'app/',
          src: ['{styles,modules}/**/*.scss'],
          dest: "www_root/",
          ext: '.css'
        }]
      }
    },

    handlebars: {
      dev: {
        options: {
          namespace: "app.templates",
          processName: function(filename) {
              // trim "app/tempaltes" from path
              filename = filename.substring(filename.indexOf('/')+1);
              filename = filename.substring(filename.indexOf('/')+1);

              // trim extension
              return filename.substring(0, filename.lastIndexOf('.'));
          }          
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: ["{templates,modules}/**/*.hbs"],
          dest: "www_root/",
          ext: '.js'
        }]
      }
    },

    targethtml: {
      debug: {
        files: {
          "dist/debug/index.html": "www_root/index.html"
        }
      },
      release: {
        files: {
          "dist/release/index.html": "www_root/index.html"
        }
      }          
    },

    clean: {
      dev: ["www_root/{scripts,styles,templates}/"],
      debug: ["dist/debug/"],
      release: ["dist/release/"]
    },

    copy: {
     debug: {
        files: [{ 
          expand: true, 
          cwd: 'www_root/', 
          src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess'], 
          dest: "dist/debug/" 
        }]
      },
     release: {
        files: [{ 
          expand: true, 
          cwd: 'www_root/', 
          src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess'], 
          dest: "dist/release/" 
        }]
      }      
    },

    connect: {
      dev: {
        options: {
          port: 9001,
          base: 'www_root'
        }
      },
      debug: {
        options: {
          port: 9002,
          base: 'dist/debug'
        }
      },
      release: {
        options: {
          port: 9003,
          base: 'dist/release'
        }
      }            
    },

    casperjs: {
      files: 'tests/casperjs/**/*.coffee'
    }          

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-mincss');

  //grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-casperjs');

  grunt.registerTask('scripts', ['coffee', 'jshint']);
  grunt.registerTask('styles', ['sass']);
  grunt.registerTask('templates', ['handlebars']);

  grunt.registerTask('default', ['clean:dev', 'scripts', 'templates', 'styles']);
  grunt.registerTask('dist:debug', ['clean:debug', 'concat:scripts', 'concat:styles', 'targethtml:debug', 'copy:debug']);
  grunt.registerTask('dist:release', ['clean:release', 'uglify', 'mincss', 'targethtml:release', 'copy:release']);
  
  grunt.registerTask('server', ['connect:dev:keepalive']);
  grunt.registerTask('server:debug', ['connect:debug:keepalive']);
  grunt.registerTask('server:release', ['connect:release:keepalive']);

  grunt.registerTask('test:casperjs', ['dist:debug', 'connect:debug', 'casperjs']);
};
