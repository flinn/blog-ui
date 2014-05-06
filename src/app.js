//requirements
const crypto = require('crypto');
var express = require('express'),
	http = require('http'),
	https = require('https'),
	fs = require('fs'),
	path = require('path'),
	swig = require('swig'),
	controller = require('./controllers/_controllers');

//initialize express application
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(express.static(path.join(__dirname, 'static')));

//bind default route
app.get('/', controller.about.index);
app.get('/about', controller.about.index);
app.get('/blog', controller.blog.index);
app.get('/contact', controller.contact.index);
app.get('/icons', controller.static.icons);

//launch server
console.log("Running whoisflinn.com locally.")
app.listen(1337);