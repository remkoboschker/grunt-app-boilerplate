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
          'build/debug/scripts/vendors.js': [
            'www_root/vendor/jquery/jquery.js',
            'www_root/vendor/handlebars/handlebars.js'
           ],
          'build/debug/scripts/main.js': ['www_root/{templates,scripts,modules}/**/*.js']
        }
      },
      styles: {
        files: {
          'build/debug/styles/vendors.css': [
            'www_root/vendor/normalize-css/normalize.css'
          ],
          'build/debug/styles/main.css': ['www_root/{styles,modules}/**/*.css']
        }
      }      
    },

    uglify: {
      release: {
        expand: true,
        cwd: 'build/debug/',
        src: ['scripts/vendors.js', 'scripts/main.js'],
        dest: 'build/release/',
        ext: '.min.js'
      }
    },

    mincss: {
      release: {
        expand: true,
        cwd: 'build/debug/',
        src: ['styles/vendors.css', 'styles/main.css'],
        dest: 'build/release/',
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
        options: {
          scripturl:true
        },
        src: 'Gruntfile.js'
      },
      app: {
        src: ['www_root/{scripts,modules}/**/*.js']
      }
    },

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
      install: {
        options: { 
          targetDir: 'www_root/vendor/',
          cleanup: true
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
          "build/debug/index.html": "www_root/index.html"
        }
      },
      release: {
        files: {
          "build/release/index.html": "www_root/index.html"
        }
      }          
    },

    clean: {
      dev: ["www_root/{scripts,styles,templates,vendor}/"],
      components: ["components/"],
      debug: ["build/debug/"],
      release: ["build/release/"]
    },

    copy: {
     debug: {
        files: [{ 
          expand: true, 
          cwd: 'www_root/', 
          src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess'], 
          dest: "build/debug/" 
        }]
      },
     release: {
        files: [{ 
          expand: true, 
          cwd: 'www_root/', 
          src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess'], 
          dest: "build/release/" 
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
          base: 'build/debug'
        }
      },
      release: {
        options: {
          port: 9003,
          base: 'build/release'
        }
      },
      mocha : {
        options: {
          port: 9004,
          base: 'tests/mocha'
        }        
      }            
    },

    casperjs: {
      all: 'tests/casperjs/**/*.coffee'
    },

    mocha: {
        // This variant auto-includes 'bridge.js' so you do not have
        // to include it in your HTML spec file. Instead, you must add an
        // environment check before you run `mocha.run` in your HTML.
        local: {
            src: [ 'tests/mocha/index.html' ],
            options: {
                mocha: {
                    //ignoreLeaks: false,
                    //grep: 'food'
                },

                // Indicates whether 'mocha.run()' should be executed in 
                // 'bridge.js'. If you include `mocha.run()` in your html spec, you
                // must wrap it in a conditional check to not run if it is opened
                // in PhantomJS
                run: true
            }
        },

        remote: {
            options: {
                mocha: {
                    //ignoreLeaks: false,
                    //grep: 'food'
                },

                // URLs passed through as options
                urls: [ 'http://localhost:' + "<%= connect.mocha.options.port %>" + '/index.html' ],

                // Indicates whether 'mocha.run()' should be executed in 'bridge.js'
                run: true
            }
        }
    }

  });

  // "official" tasks
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

  // "unofficial" tasks
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-mocha');

  // define aliases for scripts/styles/templates tasks
  grunt.registerTask('scripts', ['coffee', 'jshint']);
  grunt.registerTask('styles', ['sass']);
  grunt.registerTask('templates', ['handlebars']);
  grunt.registerTask('vendor', ['bower']);

  // default build task
  grunt.registerTask('default', ['clean:dev', 'scripts', 'templates', 'styles', 'vendor']);

  // build tasks, dependent on "default" task
  grunt.registerTask('build:debug', ['clean:debug', 'concat:scripts', 'concat:styles', 'targethtml:debug', 'copy:debug']);
  grunt.registerTask('build:release', ['clean:release', 'uglify', 'mincss', 'targethtml:release', 'copy:release']);

  // debug build + test
  grunt.registerTask('run:debug', ['default', 'build:debug', 'test:casperjs']);
  // release build + server
  grunt.registerTask('run:full', ['run:debug', 'build:release', 'server:release']);

  // server tasks
  grunt.registerTask('server', ['connect:dev:keepalive']);
  grunt.registerTask('server:debug', ['connect:debug:keepalive']);
  grunt.registerTask('server:release', ['connect:release:keepalive']);
  grunt.registerTask('server:mocha', ['connect:mocha:keepalive']);

  // CasperJS tests
  grunt.registerTask('test:casperjs', ['connect:debug', 'casperjs']);

  // Mocha tests
  grunt.registerTask('test:mocha:local', ['mocha:local']);
  grunt.registerTask('test:mocha:remote', ['connect:mocha', 'mocha:remote']);
  grunt.registerTask('test:mocha', ['test:mocha:local', 'test:mocha:remote']);
};
