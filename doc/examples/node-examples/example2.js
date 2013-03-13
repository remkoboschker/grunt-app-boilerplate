var fs = require('fs');
var events = require('events');
var util = require('util');

var Buffer = require('buffer').Buffer;

Buffer.prototype.randomize = function() {
    var fd = fs.openSync('/dev/random', 'r');
    fs.readSync(fd, this, 0, this.length, 0);
    fs.closeSync(fd);
    return this;
}

Eventer = function(){
  events.EventEmitter.call(this);

  this.run = function(len){
  	var self = this;

  	process.nextTick(function() {
  		console.log((new Date()).getTime() + ' randomizing ' + len);
    	var data = new Buffer(len).randomize();
    	self.emit('data'+len, data);
    });
  }
};

util.inherits(Eventer, events.EventEmitter);

var eventer = new Eventer();

var logger = function(data) {
	console.log((new Date()).getTime() + ' ' + data.length);
}

eventer.on('data100', logger);
eventer.on('data100000', logger);
eventer.on('data10', logger);
eventer.on('data10000', logger);
eventer.on('data1000', logger);

eventer.run(100);
eventer.run(100000);
eventer.run(10);
eventer.run(10000);
eventer.run(1000);
