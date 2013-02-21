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

Install required NPM packages (grunt runner + bower package manager):

```
npm install -g grunt-cli
npm install -g bower
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

Folders structure
=================

* app - application files (sources)
* components - bower stores all installed files there
* build - distribution files
	* debug - files concatenated
	* release - files concatemated and minified
* node_modules - node modules
* tests - unit and integrational tests
	* casperjs - integrational tests
	* mocha - unit tests
* www_root - development www root