var express = require('express');
var    app = express();
var    session = require('express-session');
var    bodyParser = require('body-parser');

app.use('/', express.static(__dirname + "/public"));

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "admin" && req.session.admin)
    return next();
  else
    //return res.sendStatus(401);
    res.sendFile(__dirname + '/login.html');
};
 
// Login endpoint
app.post('/login', function (req, res) {
  if(req.body.uname === 'admin' && req.body.psw ==='12345' )
  {
      req.session.user = "admin";
      req.session.admin = true;
      res.status(200).redirect('/about');
  } 
  else
  {
    res.status(200).redirect('/content');
  }
 
});
//about
//Logout endpoint
app.get('/about', function (req, res) {
  if(req.session.admin === true)
  {
    res.sendFile(__dirname + '/about.html');
  }
  else
  {
    res.status(200).redirect('/content');
  }
  
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.status(200).redirect('/content');

});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");