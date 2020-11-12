var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var alert= require('alert');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "WMP"
});
router.get('/', function (req, res) {
  res.render('search');
});
router.post('/find', function (req, res) {
  var op=req.body.cat;
  var kw=req.body.sch;
  var tm=req.body.currt;
  var dy=parseInt(req.body.day1);
  if(op=="Speciality")
  {
    if(dy!=0)
    var sqll = "Select schd.dname, schd.start, schd.end, schd.day, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.end>=? and schd.day=? and doc.reg=schd.reg and hospital.id=schd.id order by schd.start";
    else{
      var sqll="Select schd.dname, schd.start, schd.end, schd.day, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.end>=? and schd.day>=? and doc.reg=schd.reg and hospital.id=schd.id order by schd.start";
      dy=parseInt(req.body.currd);
    }
    con.query(sqll, [kw, tm, dy], function(err, data20, fields){
      if (err) throw err;
      req.session.ans=data20;
      res.redirect('/searchresult1');
    });
  }
   else if(op=="Doctors")
  {
    var sqll1 = "Select schd.dname, schd.start, schd.end, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.reg IN (Select reg from doc where doc.docname= ? ) and schd.end>=? and doc.reg=schd.reg and hospital.id=schd.id order by schd.start";
    con.query(sqll1, [kw, tm], function(err, data30, fields){
      if(err) throw err;
      req.session.ans=data30;
      res.redirect('/searchresult1');
   });
  }
  else if(op=="Hospitals")
  {
    var sqll2="Select name, address from hospital where name=?";
    con.query(sqll2, [kw], function(err, data40, fields){
      if(err) throw err;
      req.session.ans1=data40;
      res.redirect('/searchresult2');
    });
  }
});
router.get('/searchresult2', function(req, res){
  res.render('searchresult2', {user2: req.session.ans1});
});
router.get('/searchresult1', function(req, res){
  res.render('searchresult1', {user1: req.session.ans});
});
router.post('/details', function(req, res){
  var hn=req.body.hos;
  var add=req.body.add;
  var sqlll="Select doc.docname, schd.dname, schd.start, schd.end from doc, schd where schd.id=(select id from hospital where name= ? and address= ?) and doc.reg=schd.reg";
  con.query(sqlll, [hn, add], function(err, data50, fields){
    if(err) throw err;
    req.session.moreinfo=data50;
  });
  var sqlll1="Select name, address, contact1, contact2, email, descp, Beds, Amb From hospital where name=? and address=?";
  con.query(sqlll1, [hn, add], function(err, data60, fields){
    if(err) throw err;
    req.session.moreinfo2=data60;
    res.redirect('/searchmoreinfo');
  });
});
router.get('/searchmoreinfo', function(req, res){
  res.render('searchmoreinfo', {user4: req.session.moreinfo2, user3:req.session.moreinfo});
});
router.get('/login', function(req, res) {
	res.render('login');
});
router.post('/auth', function (req, res) {
  var username = req.body.un;
  var password = req.body.pass;
    var sql = "SELECT * FROM hospital where id=?";
    con.query(sql, [username], function (err, data1, fields) {
      if (err) throw err;
        bcrypt.compare(password, data1[0].Password, function (err, result) {
        if (result == true) {
          req.session.user=data1[0];
          req.session.log=true;
          res.redirect('/home');
        } else {
          alert("Wrong Username/Password");
          res.redirect('/login');
        }
      });
    });
  });
router.get('/home', function(req, res){
  if(req.session.log)
  res.render('home', { user: req.session.user});
  else
  res.redirect('/login');
});
router.post('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
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
      var pass = (req.body.password);
      bcrypt.hash(pass, saltRounds, function (err, hash){
  		var sql = "INSERT INTO hospital (name, address, contact1, contact2, email, descp, Beds, Amb, Password) VALUES ?";
    var values = [
      [name, address, contact1, contact2, email, descp, Beds, Amb, hash]
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
});
router.get('/welcome', function (req, res) {
  res.render('welcome', { Uname: req.session.uname});
});
router.get('/department', function (req, res) {
  if(req.session.log)
  res.render('department');
  else
  res.redirect('/login');
});
router.post('/created', function (req, res) {
  var dep = req.body.d;
  var docname = req.body.docname;
  var regno = (req.body.reg)
  var gstate=(req.body.gstate);
  var startp = (req.body.startp);
  var endp = req.body.endp;
  var day=req.body.day;
  var c=req.body.cnt;
  for(var i=0; i<c; i++){
    var dn=docname[i];
    var r=regno[i]+gstate[i];
    var s=(startp[i]);
    var e=parseInt(endp[i]);
    var d=parseInt(day[i]);
    if(c==1)
    {
      dn=docname;
      r=regno+gstate;
      s=(startp);
      e=parseInt(endp);
      d=parseInt(day);
    }
    var sql7 = "INSERT IGNORE INTO doc(docname, reg, spl) VALUES ?";
    var values4 = [
        [dn, r, dep]
        ];
        con.query(sql7, [values4], function (err, data) {
          console.log("doc is inserted");
        });
  var sql5 = "INSERT IGNORE INTO schd (id, dname, reg, start, end, day) VALUES ?";
  var values3 = [
    [req.session.user.id, dep, r, s, e, d]
  ];
  con.query(sql5, [values3], function (err, data) {
    if (err) throw err;
    console.log("schd is inserted");
  });
  }
  alert("Your Data is Inserted. Go back to home to finish");
  res.redirect('/department');
});
router.post('/edit', function(req, res){
 var depname=req.body.deptn;
 var sql30="select schd.day,schd.reg,schd.start,schd.end,doc.docname FROM schd,doc where schd.dname=? and schd.reg=doc.reg";
	con.query(sql30,[depname],function(err,sds,fields){
		if (err) throw err;
		req.session.ed=sds;
		res.redirect('/editp');
	});
});
router.get('/editp', function (req, res) {
  res.render('editp', { user20: req.session.ed});
});
module.exports = router;
