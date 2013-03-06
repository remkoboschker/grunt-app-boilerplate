grunt.registerTask(
    'client-tests',
    'Run the client-side Mocha tests through PhantomJS',
    function() {
      var done = this.async();
      var mocha = grunt.util.spawn({
        cmd: 'node',
        args: [
          'node_modules/mocha-phantomjs/bin/mocha-phantomjs',
          '-R',
      
          // Use whichever reporter you want, or make it a configurable option...
          'dot',

          'http://localhost:8000/app/tests/'
        ]
      }, function(error, result, code) {
        done(!code);
      });
      mocha.stdout.pipe(process.stdout);
      mocha.stderr.pipe(process.stderr);
    });