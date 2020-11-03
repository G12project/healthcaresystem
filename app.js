var express=require('express');
var app=express();
const expressEjsLayout = require('express-ejs-layouts');
var session = require('express-session');

app.use(session({
  secret: 'f26910bd209018829s',
  resave: true,
  saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var userRouter = require('./routes/user.js');
app.use('/',userRouter);

app.listen(8080, () => {
  console.log('Example app listening at http://localhost:8080');
})

