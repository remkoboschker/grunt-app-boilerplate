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

    // concatenate files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      // scripts: {
      //   files: {
      //     'build/debug/scripts/vendor.js': [
      //       'public/vendor/jquery/jquery.js',
      //       'public/vendor/handlebars/handlebars.js'
      //      ],
      //     'build/debug/scripts/main.js': [
      //       'public/modules/**/{templates,scripts}/**/*.js',
      //       'public/{templates,scripts}/**/*.js'
      //     ]
      //   }
      // },
      styles: {
        files: {
          'build/debug/styles/vendor.css': [
            'public/vendor/normalize-css/normalize.css'
          ],
          'build/debug/styles/main.css': [
            'public/modules/**/styles/**/*.css',
            'public/styles/**/*.css'
          ] 
        }
      }      
    },

    // build minimized JS files
    // uglify: {
    //   release: {
    //     expand: true,
    //     cwd: 'build/debug/',
    //     src: ['scripts/vendor.js', 'scripts/main.js'],
    //     dest: 'build/release/',
    //     ext: '.min.js'
    //   }
    // },

    // build minimized CSS files
    mincss: {
      release: {
        expand: true,
        cwd: 'build/debug/',
        src: ['styles/vendor.css', 'styles/main.css'],
        dest: 'build/release/',
        ext: '.min.css'
      }
    },

    // JSHint sources
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
      // gruntfile: {
      //   options: {
      //     scripturl:true
      //   },
      //   src: 'Gruntfile.js'
      // },
      // app: {
      //   src: [
      //     'public/scripts/**/*.js',
      //     'public/modules/**/scripts/**/*.js',
      //   ]
      // }
    },

    // monitor source files for changes and fire compile and reload tasks when some file changes
    watch: {
      /*gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },*/
      app_scripts: {
        files: [
          'app/scripts/**/*.coffee',
          'app/modules/**/scripts/**/*.coffee'
        ],
        tasks: ['scripts', 'reload']
      },
      app_styles: {
        files: [
          'app/styles/**/*.scss',
          'app/modules/**/styles/**/*.scss'
        ],
        tasks: ['styles', 'reload']
      },
      app_templates: {
        files: [
          "app/templates/**/*.hbs",
          "app/modules/**/templates/**/*.hbs"
        ],
        tasks: ['templates', 'reload']
      },

      // dummy task for keeping server connection alive
      dummy: {
        files: [],
        tasks: []
      }            
    },    

    // compile CoffeeScripts into JavaScripts
    coffee: {
      options: {
        bare: true
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: [
            'scripts/**/*.coffee',
            'modules/**/scripts/**/*.coffee'
          ],
          dest: "public/",
          ext: '.js'
        }]
      }
    },

    //compile SASS files into CSS
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
          src: [
            'styles/**/*.scss',
            'modules/**/styles/**/*.scss'
          ],
          dest: "public/",
          ext: '.css'
        }]
      }
    },

    // produce pre-compiled templates
    handlebars: {
      dev: {
        options: {
          namespace: false,
          amd: true,
          processName: function(filename) {
            // Return new array with duplicate values removed
            Array.prototype.unique =
              function() {
                var a = [];
                var l = this.length;
                for(var i=0; i<l; i++) {
                  for(var j=i+1; j<l; j++) {
                    // If this[i] is found later in the array
                    if (this[i] === this[j])
                      j = ++i;
                  }
                  a.push(this[i]);
                }
                return a;
              };

              // trim extension
              filename = filename.substring(0, filename.lastIndexOf('.'));

              var parts = filename.split('/');

              // remove "app" part
              parts.shift(); 

              // remove "templates" part
              parts = parts.filter(function(part){
                return (part !== 'templates');
              });
              
              return parts.unique().join('/');
          }          
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: [
            "templates/**/*.hbs",
            "modules/**/templates/**/*.hbs"
          ],
          dest: "public/",
          ext: '.js'
        }]
      }
    },

    // process conditionals in "public/undex.html" and build apropriate debug/release version
    targethtml: {
      debug: {
        files: {
          "build/debug/index.html": "public/index.html"
        }
      },
      release: {
        files: {
          "build/release/index.html": "public/index.html"
        }
      }          
    },

    // clean up folders
    clean: {
      dev: ["public/{scripts,styles,templates}/"],
      debug: ["build/debug/"],
      release: ["build/release/"]
    },

    // copy additional files (ex. icons, robots.txt) into "build" folder
    copy: {
     debug: {
        files: [{ 
          expand: true, 
          cwd: 'public/', 
          src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess', 'vendor/requirejs/require.js'], 
          dest: "build/debug/" 
        }]
      },
      release: {
        files: [{ 
          expand: true, 
          cwd: 'public/', 
          src: ['*.png', '*.txt', '*.xml', '*.ico', '404.html', '.htaccess', 'vendor/requirejs/require.js'], 
          dest: "build/release/" 
        }]
      }      
    },

    // connect middleware (http server serving static files)
    connect: {
      options: {
        middleware: function(connect, options) {
          var modRewrite = require('connect-modrewrite');

          return [
            modRewrite([
              '^/#/.*$ /index.html [L]'
            ]),
            connect.static(options.base)
          ]
        }
      },      
      dev: {
        options: {
          port: 9001,
          base: 'public'
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

    // casper.js functional tests (using phantom.js headless webkit browser)
    casperjs: {
      all: 'tests/casperjs/**/*.coffee'
    },

    // mocha unit tests
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
    },

    // open page in browser when http server starts
    open : {
      dev : {
        path: 'http://localhost:9001'
      },    
      debug : {
        path: 'http://localhost:9002'
      },
      release : {
        path: 'http://localhost:9003'
      },
      test: {
        path: 'http://localhost:9004'
      }
    },

    // reload page when files change
    reload: {
        // reverse proxy port
        port: 8001,
        //port: 35729,  // default LiveReload chrome extension port
        //liveReload: {}
    },

    // require.js module loader
    requirejs: {
      options: {
        mainConfigFile: "public/scripts/main.js",
        wrap: false,
        name: "main"
      },
      debug: {
        options: {
          optimize: "none",
          out: "build/debug/scripts/main.js"
        }
      },
      release: {
        options: {
          out: "build/release/scripts/main.min.js"
        }
      }      
    }                

  });

  // "official" tasks
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-connect');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // "unofficial" tasks
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-reload');

  // define aliases for scripts/styles/templates tasks
  grunt.registerTask('scripts', ['coffee'/*, 'jshint'*/]);
  grunt.registerTask('styles', ['sass']);
  grunt.registerTask('templates', ['handlebars']);

  // default build task
  grunt.registerTask('default', ['clean:dev', 'scripts', 'templates', 'styles']);

  // build tasks, dependent on "default" task
  grunt.registerTask('build:debug', ['clean:debug', 'requirejs:debug', 'concat:styles', 'targethtml:debug', 'copy:debug']);
  grunt.registerTask('build:release', ['clean:release', 'requirejs:release', 'mincss', 'targethtml:release', 'copy:release']);

  // debug build + test
  grunt.registerTask('run:debug', ['default', 'build:debug', 'test:casperjs']);
  // release build + server
  grunt.registerTask('run:full', ['run:debug', 'build:release', 'server:release']);

  // server tasks
  grunt.registerTask('server', ['connect:dev', 'reload', 'open:dev', 'watch']);
  grunt.registerTask('server:debug', ['connect:debug', 'open:debug', 'watch:dummy']);
  grunt.registerTask('server:release', ['connect:release', 'open:release', 'watch:dummy']);
  grunt.registerTask('server:mocha', ['connect:mocha', 'open:test', 'watch:dummy']);

  // CasperJS tests
  grunt.registerTask('test:casperjs', ['connect:debug', 'casperjs']);

  // Mocha tests
  grunt.registerTask('test:mocha:local', ['mocha:local']);
  grunt.registerTask('test:mocha:remote', ['connect:mocha', 'mocha:remote']);
  grunt.registerTask('test:mocha', ['test:mocha:local', 'test:mocha:remote']);
};
