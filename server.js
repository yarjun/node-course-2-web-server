var express = require("express");
var app = express();
var hbs = require("hbs");
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getcurrentyear',function(){
  return new Date().getFullYear();
});
hbs.registerHelper('screamit',function(text){
  return text.toUpperCase();
});

app.set("view engine","hbs")


app.use(function(req,res,next){
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',function(err){
    if(err){
      console.log('unable to append');
    }
  });
  next();
});


// app.use(function(req,res,next){
//   res.render("maintenance");
// });

app.use(express.static(__dirname+'/public'));

app.get("/",function(req,res){
  res.render("home",
                    {pagetitle:"home page",
                     welcomemessage: "welcome to my website"
                   });
});
app.get("/about",function(req,res){
  res.render("about",{pagetitle: "about page",
                      pagebody: "xyz"});
});

app.get('/projects',function(req,res){
  res.render('projects.hbs',{pagetitle: 'projects'});
});

app.listen(port,function(){
  console.log(`server is running on port ${port}`);
});
