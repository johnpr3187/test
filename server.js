//web server app with Express
//run as: nodemon server.js 
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express(); 

hbs.registerPartials(__dirname + '/views/partials');
console.log(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {  var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
  	console.log(log);  
	fs.appendFile('server.log', log + '\n', (err) => {  if (err) {    console.log('Unable to append to server.log.')  } });

	next(); }); 

hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear() });

hbs.registerHelper('screamIt', (text) => {  return text.toUpperCase(); }); 

app.get('/', (req, res) => {  
	res.render('home.hbs', 
	{    
		pageTitle: 'Home Page1',    
		welcomeMessage: 'Welcome to my website1',    
		currentYear: new Date().getFullYear()  
	}) 
}); 

app.get('/home', (req, res) => {  
	res.render('home.hbs', 
	{    
		pageTitle: 'Home Page',    
		welcomeMessage: 'Welcome to my website',    
		currentYear: new Date().getFullYear()  
	}) 
}); 

app.get('/about', (req, res) => {  res.render('about.hbs', {    pageTitle: 'About Page',    currentYear: new Date().getFullYear()  }); }); 

app.get('/bad', (req, res) => {  res.send({    errorMessage: 'Unable to handle request'  }); });





/*
call app.listen. The app.listen function will bind the application to a port on our machine. In this case, for our local 
host app, we will use port 3000, a really common port for developing locally. 
*/
// local only version
// app.listen(3000, () => {  console.log('Server is up on port 3000'); }); 
//Azure version
app.listen(port, () => {  console.log(`Server is up on port ${port}`); }); 