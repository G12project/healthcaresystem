var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "WMP"
});
router.get('/login', function(req, res) {
	res.render('login');
});
router.post('/auth', function(req, res){
	var username=req.body.un;
	var password=req.body.pass;
	var sql="SELECT * FROM hospital where id=? and Password=?";
	con.query(sql, [username,password], function (err, data1,fields) {
    	 	if (err) throw err;
		if (data1.length>0){
			 req.session.loggedin= true;
			 req.session.user=data1[0];
			 res.redirect('/home');
		}
		else{
			res.send('Incorrect Username and/or Password!');
			res.redirect('/login');
		 }
	});
});
router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/create', function(req, res) {


  	const userDetails=req.body;
      var name= req.body.fname;
      var address= req.body.address;
      var contact1= (req.body.contact1);
      var contact2= (req.body.contact2);
      var email=req.body.email;
      var descp=req.body.descp;
      var Beds=(req.body.Beds);
      var Amb=(req.body.Amb);
      var pass=(req.body.password);
  		var sql = "INSERT INTO hospital (name, address, contact1, contact2, email, descp, Beds, Amb, Password) VALUES ?";
    		var values = [
      [name, address, contact1, contact2, email, descp, Beds, Amb, pass]
    ];
    con.query(sql, [values], function (err, data) {
      if (err) throw err;
      console.log("1 record inserted.");
    });
    var sql2="Select LAST_INSERT_ID() As 'hid'";
    con.query(sql2, function(err, data, fields){
      req.session.uname=data[0].hid;
      console.log(data);
      res.redirect('/welcome');
    });
  });
router.get('/welcome', function (req, res) {
  res.render('welcome', { Uname: req.session.uname});
});
router.get('/department', function (req, res) {
  res.render('department');
});
router.post('/created', function(req, res) {
	var dep=req.body.d;
	var docname=req.body.docname;
	var regno=((req.body.reg)+(req.body.gstate));
	var startp=req.body.startp;
	var endp=req.body.endp;
		var sql3= "INSERT INTO R2 (id,dname) VALUES ?";
	var values1=[
		[req.sesssion.user.id,dep]
		];
	con.query(sql3, [values1], function (err, data) {
      if (err) throw err;
      console.log("r2 is inserted");
    });
		var sql4= "INSERT INTO R1 (id,reg) VALUES ?";
	var values2=[
		[req.sesssion.user.id,regno]
		];
	con.query(sql4, [values2], function (err, data) {
      if (err) throw err;
      console.log("r1 is inserted");
});
module.exports = router;
