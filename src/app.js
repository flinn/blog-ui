'use strict';
//requirements
var express = require('express'),
    path = require('path'),
    swig = require('swig'),
    controllers = require('./controllers/_controllers');

//initialize express application
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
swig.setDefaults({
    cache: false
});
app.use(express.static(path.join(__dirname, 'static')));

//bind default route
app.get('/', controllers.about.index);
app.get('/about', controllers.about.index);
app.get('/blog', controllers.blog.index);
app.get('/contact', controllers.contact.index);
app.get('/icons', controllers.static.icons);

//launch server
console.log('Express: Running Server @ localhost.whoisflinn.com');
app.listen(1337);