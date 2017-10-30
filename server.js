var path = require("path");
var express = require("express");

var logger = require("morgan");
var bodyParser = require("body-parser"); // simplifies access to request body

var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server

app.use(express.static(__dirname + '/assets'));
//app.use(express.static(__dirname + '/views'));

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine

// 2 create an array to manage our entries
var entries = [];
app.locals.entries = entries; // now entries can be accessed in .ejs files

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }));

// 4 handle http GET requests (default & /new-entry)
app.get("/", function (request, response) {
  response.render("GhimireSagar");
});
app.get("/GhimireSagar", function (request, response) {
  response.render("GhimireSagar");
});
app.get("/about", function (request, response) {
  response.render("GhimireSagar");
});
app.get("/Calculation", function (request, response) {
  response.render("Calculation");
});
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});
app.get("/guestbook", function (request, response) {
  response.render("index");
});
app.get("/contact", function (request, response) {
  response.render("Contact");
});
app.post("/contact", function(request, response){
  var api_key = 'key-74312157c53933271f5a26d4c152de4b';
  var domain = 'sandbox3d03a4d6b2424cdbacf855fba9988c02.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Mail Gun TustDady <postmaster@sandbox3d03a4d6b2424cdbacf855fba9988c02.mailgun.org>',
    to: 's525189@nwmissouri.edu',
    subject: request.body.userEmail,
    text: request.body.body
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error){
      response.send("Mail Sent");
    }
    else{
      response.send("Mail not sent");
    }
  });
});


// 4 handle http GET requests (default & /new-entry)
app.get("/", function (request, response) {
  response.render("index")//send the index page
})
app.get("/new-entry", function (request, response) { 
  response.render("new-entry")
})

//handle POST  REQUEST pUT THE BREAKPOINT IN CALLBACK FUNCTION
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.")
    return
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  })
  response.redirect("/guestbook")  // where to go next? Let's go to the home page :)
})
// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404")
})



// Listen for an application request on port 8081
http.listen(8081, function () {
  console.log('A03 project listening on http://127.0.0.1:8081/');
});