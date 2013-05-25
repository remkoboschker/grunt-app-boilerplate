[![Build Status](https://travis-ci.org/abahdanovich/grunt-app-boilerplate.png?branch=master)](https://travis-ci.org/abahdanovich/grunt-app-boilerplate)

Requirements
============

NodeJS + NPM


About
=====

This project is a simple boilerplate for javascript browser-based applications. The main goal is to provide simple build system as well as basic application structure.

Under the hood, following projects are used:

* GruntJS (building process)
* Bower by Twitter
* HTML5 Boilerplate (.htaccess, robots.txt and other "trimmings" :)
* Coffescript
* SASS
* Handlebars

Set up
======

Install required NPM packages (grunt runner, bower package manager, documentation generating tool etc.):

```
npm install -g grunt-cli
npm install -g bower
```

Extra (doc and tests):
```
npm install -g codo

npm install -g mocha
npm install chai
npm install selenium-webdriver

npm install -g coffee-script
npm install -g karma

```

From application folder, run:

```
npm install
bower install
```

Now, we can run 

```
grunt
```

to compile our "hello world" project.

Usage
=====

Look at `Gruntfile.js` to see all available tasks (should be self-descriptive)

__Note__: at the moment "build" tasks should be run after "default" build task. Also, "server" tasks should be run after "build:debug" task.

There is no dependency defined as it makes no sense to repeat "build:debug" when no files were modifies since last test run.

Documentation
=============

Coffeescript api documentation is generated with `codo` tool. You should make code annotations according to specification on tool's home page: https://github.com/netzpirat/codo/

Folders structure
=================

* app - application files (sources)
* build - distribution files
	* debug - files concatenated
	* release - files concatemated and minified
* doc - documentation
* node_modules - node modules
* public - development www root
* tests - unit and integrational tests
    * casperjs - integrational tests
    * mocha - unit tests

Tests
=====

Karma tests:
```
karma start tests/karma/
```

Selenium tests:
```
#phantomjs --wd
#grunt server:debug
BROWSERS="phantomjs" mocha -R list --compilers coffee:coffee-script tests/selenium-mocha/
```

Paths and ports
===============

dev:
	path: "http://localhost:9001"

debug:
	path: "http://localhost:9002"

release:
	path: "http://localhost:9003"

test:
	path: "http://localhost:9004"

doc:
	path: "http://localhost:9005"