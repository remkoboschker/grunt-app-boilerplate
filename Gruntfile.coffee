#global module:false
module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    
    # Metadata.
    pkg: grunt.file.readJSON("package.json")
    banner: "/**\n * <%= pkg.name %> - v<%= pkg.version %> - " + "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + "<%= pkg.homepage ? \" * \" + pkg.homepage + \"\\n\" : \"\" %>" + " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author %>\n" + "<%= pkg.license ? \" * Licensed: \" + pkg.license + \"\\n\" : \"\" %> */\n\n"
    
    # concatenate files
    concat:
      options:
        banner: "<%= banner %>"
        stripBanners: true

      
      # scripts: {
      #   files: {
      #     'build/debug/scripts/vendor.js': [
      #       'public/vendor/jquery/jquery.js',
      #       'public/vendor/handlebars/handlebars.js'
      #      ],
      #     'build/debug/scripts/main.js': [
      #       'public/modules/**/{templates,scripts}/**/*.js',
      #       'public/{templates,scripts}/**/*.js'
      #     ]
      #   }
      # },
      styles:
        files:
          "build/debug/styles/vendor.css": ["public/vendor/normalize-css/normalize.css"]
          "build/debug/styles/main.css": ["public/modules/**/styles/**/*.css", "public/styles/**/*.css"]

    
    # build minimized JS files
    # uglify: {
    #   release: {
    #     expand: true,
    #     cwd: 'build/debug/',
    #     src: ['scripts/vendor.js', 'scripts/main.js'],
    #     dest: 'build/release/',
    #     ext: '.min.js'
    #   }
    # },
    
    # build minimized CSS files
    cssmin:
      release:
        expand: true
        cwd: "build/debug/"
        src: ["styles/vendor.css", "styles/main.css"]
        dest: "build/release/"
        ext: ".min.css"

    
    # JSHint sources
    jshint:
      options:
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: false
        unused: true
        boss: true
        eqnull: true
        browser: true
        globals: {}

    
    # gruntfile: {
    #   options: {
    #     scripturl:true
    #   },
    #   src: 'Gruntfile.js'
    # },
    # app: {
    #   src: [
    #     'public/scripts/**/*.js',
    #     'public/modules/**/scripts/**/*.js',
    #   ]
    # }
    
    # monitor source files for changes and fire compile and reload tasks when some file changes
    watch:
      
      #gruntfile: {
      #        files: '<%= jshint.gruntfile.src %>',
      #        tasks: ['jshint:gruntfile']
      #      },
      app_scripts:
        files: ["app/scripts/**/*.coffee", "app/modules/**/scripts/**/*.coffee"]
        tasks: ["scripts", "reload"]

      app_styles:
        files: ["app/styles/**/*.scss", "app/modules/**/styles/**/*.scss"]
        tasks: ["styles", "reload"]

      app_templates:
        files: ["app/templates/**/*.hbs", "app/modules/**/templates/**/*.hbs"]
        tasks: ["templates", "reload"]

      
      # dummy task for keeping server connection alive
      dummy:
        files: ["README.md"]
        tasks: []

    
    # compile CoffeeScripts into JavaScripts
    coffee:
      options:
        bare: true

      dev:
        files: [
          expand: true
          cwd: "app/"
          src: ["scripts/**/*.coffee", "modules/**/scripts/**/*.coffee"]
          dest: "public/"
          ext: ".js"
        ]

      tests_mocha:
        files: [
          {
            expand: true
            cwd: "tests/mocha/src/"
            src: ["runner/*.coffee"]
            dest: "tests/mocha/build/"
            ext: ".js"
          },
          {
            expand: true
            cwd: "tests/mocha/src/"
            src: ["spec/**/*.coffee"]
            dest: "tests/mocha/build/"
            ext: ".test.js"
          }
        ]
    
    #compile SASS files into CSS
    sass:
      dev:
        options:
          style: "expanded"
          
          #debugInfo: true          
          lineNumbers: true

        files: [
          expand: true
          cwd: "app/"
          src: ["styles/**/*.scss", "modules/**/styles/**/*.scss"]
          dest: "public/"
          ext: ".css"
        ]

    
    # produce pre-compiled templates
    handlebars:
      dev:
        options:
          namespace: false
          amd: true
          processName: (filename) ->
            
            # Return new array with duplicate values removed
            Array::unique = ->
              a = []
              l = @length
              i = 0

              while i < l
                j = i + 1

                while j < l
                  
                  # If this[i] is found later in the array
                  j = ++i  if this[i] is this[j]
                  j++
                a.push this[i]
                i++
              a

            
            # trim extension
            filename = filename.substring(0, filename.lastIndexOf("."))
            parts = filename.split("/")
            
            # remove "app" part
            parts.shift()
            
            # remove "templates" part
            parts = parts.filter((part) ->
              part isnt "templates"
            )
            parts.unique().join "/"

        files: [
          expand: true
          cwd: "app/"
          src: ["templates/**/*.hbs", "modules/**/templates/**/*.hbs"]
          dest: "public/"
          ext: ".js"
        ]

    
    # process conditionals in "public/undex.html" and build apropriate debug/release version
    targethtml:
      debug:
        files:
          "build/debug/index.html": "public/index.html"

      release:
        files:
          "build/release/index.html": "public/index.html"

    
    # clean up folders
    clean:
      dev: ["public/{scripts,styles,templates}/"]
      debug: ["build/debug/"]
      release: ["build/release/"]
      tests_mocha: ["tests/mocha/build/"]
    
    # copy additional files (ex. icons, robots.txt) into "build" folder
    copy:
      debug:
        files: [
          expand: true
          cwd: "public/"
          src: ["*.png", "*.txt", "*.xml", "*.ico", "404.html", ".htaccess"]
          dest: "build/debug/"
        ]

      release:
        files: [
          expand: true
          cwd: "public/"
          src: ["*.png", "*.txt", "*.xml", "*.ico", "404.html", ".htaccess"]
          dest: "build/release/"
        ]

    
    # connect middleware (http server serving static files)
    connect:
      options:
        middleware: (connect, options) ->
          modRewrite = require("connect-modrewrite")
          [modRewrite(["^/#/.*$ /index.html [L]"]), connect.static(options.base)]

      dev:
        options:
          port: 9001
          base: "public"

      debug:
        options:
          port: 9002
          base: "build/debug"

      release:
        options:
          port: 9003
          base: "build/release"

      mocha:
        options:
          port: 9004
          base: "tests/mocha"

    
    # casper.js functional tests (using phantom.js headless webkit browser)
    casperjs:
      all: "tests/casperjs/**/*.coffee"

    
    # mocha unit tests
    mocha:
      
      # This variant auto-includes 'bridge.js' so you do not have
      # to include it in your HTML spec file. Instead, you must add an
      # environment check before you run `mocha.run` in your HTML.
      local:
        src: ["tests/mocha/index.html"]
        options:
          mocha: {}
          
          #ignoreLeaks: false,
          #grep: 'food'
          
          # Indicates whether 'mocha.run()' should be executed in 
          # 'bridge.js'. If you include `mocha.run()` in your html spec, you
          # must wrap it in a conditional check to not run if it is opened
          # in PhantomJS
          run: false

      remote:
        options:
          mocha: {}
          
          #ignoreLeaks: false,
          #grep: 'food'
          
          # URLs passed through as options
          urls: ["http://localhost:" + "<%= connect.mocha.options.port %>" + "/index.html"]
          
          # Indicates whether 'mocha.run()' should be executed in 'bridge.js'
          run: false

    
    # open page in browser when http server starts
    open:
      dev:
        path: "http://localhost:9001"

      debug:
        path: "http://localhost:9002"

      release:
        path: "http://localhost:9003"

      test:
        path: "http://localhost:9004"

      doc:
        path: "./doc/codo/index.html"

      doc_selenium:
        path: "./doc/selenium-webdriver/index.html"
    
    # reload page when files change
    reload:
      
      # reverse proxy port
      port: 8001

    
    #port: 35729,  // default LiveReload chrome extension port
    #liveReload: {}
    
    # require.js module loader
    requirejs:
      options:
        mainConfigFile: "public/scripts/main.js"
        include: ["vendor/almond/almond"]
        name: "scripts/main"

      debug:
        options:
          optimize: "none"
          out: "build/debug/scripts/main.js"

      release:
        options:
          out: "build/release/scripts/main.min.js"

    # code documentation (codo) configuration
    codo:
      source_files: ['./app/']
      extra_files: ['TODO.md']
      options:
        ###
        available options:
          readme      The readme file used                                [default: "README.md"]
          name        The project name used                               [default: "Codo"]
          quiet       Show no warnings                                    [boolean]  [default: false]
          output-dir  The output directory                                [default: "./doc"]
          analytics   The Google analytics ID                             [default: false]
          verbose     Show parsing errors                                 [boolean]  [default: false]
          debug       Show stacktraces and converted CoffeeScript source  [boolean]  [default: false]
          help        Show the help
          cautious    Don't attempt to parse singleline comments          [boolean]  [default: false]
          server      Start a documentation server
          private     Show private methods                                [boolean]  [default: true]
          title                                                           [default: "CoffeeScript API Documentation"]  
        ###
        name: '<%= pkg.name %>'
        "output-dir": "./doc/codo/"
        private: true
        title: "<%= pkg.name %> project api documentation"
        verbose: true
        debug: true

    # exec "codo" documentation generator with options specified in "codo" config section
    exec:
      codo:
        cmd: ->
          cmds = ["codo"]
          config = @config.get('codo')

          Object.keys(config.options).forEach (opt) ->
            cmds.push "--" + opt + " " + config.options[opt]

          cmds.push config.source_files.join(',')
          cmds.push ' - '
          cmds.push config.extra_files.join(',')

          cmds.join(" ")

      selenium:
        cmd: (browser) ->
          command = "mocha -R list --compilers coffee:coffee-script tests/selenium-mocha/"
          if browser then "BROWSERS=#{browser} #{command}" else command

  # "official" tasks
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  
  #grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-handlebars"
  grunt.loadNpmTasks "grunt-contrib-connect"
  
  #grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-requirejs"
  
  # "unofficial" tasks
  grunt.loadNpmTasks "grunt-targethtml"
  grunt.loadNpmTasks "grunt-casperjs"
  grunt.loadNpmTasks "grunt-mocha"
  grunt.loadNpmTasks "grunt-bump"
  grunt.loadNpmTasks "grunt-open"
  grunt.loadNpmTasks "grunt-reload"
  #grunt.loadNpmTasks "grunt-devtools"
  grunt.loadNpmTasks 'grunt-exec'
  
  # define aliases for scripts/styles/templates tasks
  grunt.registerTask "scripts", ["coffee:dev"] #, 'jshint'
  grunt.registerTask "styles", ["sass"]
  grunt.registerTask "templates", ["handlebars"]
  
  # default build task
  grunt.registerTask "default", ["clean:dev", "scripts", "templates", "styles"]
  
  # build tasks, dependent on "default" task
  grunt.registerTask "build:debug", ["clean:debug", "requirejs:debug", "concat:styles", "targethtml:debug", "copy:debug"]
  grunt.registerTask "build:release", ["clean:release", "requirejs:release", "cssmin", "targethtml:release", "copy:release"]
  
  # debug build + test
  grunt.registerTask "run:debug", ["default", "build:debug", "test:mocha", "test:casperjs"]
  
  # release build + server
  grunt.registerTask "run:full", ["run:debug", "build:release", "server:release"]
  
  # server tasks
  grunt.registerTask "server", ["connect:dev", "reload", "open:dev", "watch"]
  grunt.registerTask "server:debug", ["connect:debug", "open:debug", "watch:dummy"]
  grunt.registerTask "server:release", ["connect:release", "open:release", "watch:dummy"]
  grunt.registerTask "server:mocha", ["connect:mocha", "open:test", "watch:dummy"]
  
  # CasperJS tests
  grunt.registerTask "test:casperjs", ["connect:debug", "casperjs"]
  
  # Mocha tests
  grunt.registerTask "test:mocha:rebuild", ["clean:tests_mocha", "coffee:tests_mocha"]
  grunt.registerTask "test:mocha:local", ["mocha:local"]
  grunt.registerTask "test:mocha:remote", ["connect:mocha", "mocha:remote"]
  grunt.registerTask "test:mocha", ["test:mocha:rebuild", "test:mocha:local"]

  # Selenium tests
  grunt.registerTask "test:selenium:chrome", ["connect:debug", "exec:selenium:chrome"]
  grunt.registerTask "test:selenium:firefox", ["connect:debug", "exec:selenium:firefox"]
  grunt.registerTask "test:selenium", ["connect:debug", "exec:selenium"]

  # all tests
  grunt.registerTask "test", ["test:mocha", "test:casperjs"]

  # documentation
  grunt.registerTask "codo", ["exec:codo"]
  grunt.registerTask "doc", ["codo", 'open:doc']
  grunt.registerTask "doc:selenium", ['open:doc_selenium']

