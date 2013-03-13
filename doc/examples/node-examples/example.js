var defer = require("node-promise").defer;
var when = require("node-promise").when;

var fs = require('fs');
var Buffer = require('buffer').Buffer;

Buffer.prototype.randomize = function() {
    var fd = fs.openSync('/dev/random', 'r');
    fs.readSync(fd, this, 0, this.length, 0);
    fs.closeSync(fd);
    return this;
}

function get_random_buf(len) {
	var deferred = defer();

	process.nextTick(function() {
		console.log((new Date()).getTime() + ' randomizing ' + len);
		var buf = Buffer(len).randomize();
		deferred.resolve(buf);
	});

	return deferred.promise;
}


var logger = function(data) {
	console.log((new Date()).getTime() + ' ' + data.length);
}

when(get_random_buf(100), logger);
when(get_random_buf(100000), logger);
when(get_random_buf(10), logger);
when(get_random_buf(10000), logger);
when(get_random_buf(1000), logger);