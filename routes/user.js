var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var alert= require('alert');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var nodemailer = require('nodemailer');
var crypto=require('crypto');

var con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "**********",
  database: "WMP"
});
con.query("Set global event_scheduler=ON", function(err){
  if(err) throw err;
  console.log("scheduler is on");
});
router.get('/', function (req, res) {
  res.render('search');
});
router.post('/find', function (req, res) {
  var op=req.body.cat;
  var kw=req.body.sch;
  var tm=parseInt(req.body.currt);
  var dy=parseInt(req.body.day1);
  var cd=parseInt(req.body.currd);
  if(op=="Hospitals")
  {
    var sqll2="Select name, address from hospital where name=?";
    con.query(sqll2, [kw], function(err, data40, fields){
      if(err) throw err;
      req.session.ans1=data40;
      res.redirect("/searchresult2");
    });
  }
  else if(dy=='8')
  {
    var s10="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.end>=? and schd.day=? and schd.reg=doc.reg and schd.id=hospital.id";
    if(op=="Doctors")
    s10="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.docname=? and schd.end>=? and schd.day=? and schd.reg=doc.reg and schd.id=hospital.id";
    con.query(s10, [kw, tm, cd], function(err, d101, fields){
      console.log(d101);
      req.session.ans=d101;
      req.session.ans2=[];
      req.session.ans3=[];
      res.redirect("/searchresult1");
    });
  }
  else if(dy=='0')
  {
    var s11="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.end>=? and schd.day=? and schd.reg=doc.reg and schd.id=hospital.id";
    var s12="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.day>? and schd.reg=doc.reg and schd.id=hospital.id";
    var s13="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.day<? and schd.reg=doc.reg and schd.id=hospital.id";
    if(op=="Doctors"){
    s11="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.docname=? and schd.end>=? and schd.day=? and schd.reg=doc.reg and schd.id=hospital.id";
    s12="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.docname=? and schd.day>? and schd.reg=doc.reg and schd.id=hospital.id";
    s13="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.docname=? and schd.day<? and schd.reg=doc.reg and schd.id=hospital.id";
    }
    con.query(s11, [kw, tm, dy], function(err, d102, fields){
      if(err) throw err;
      req.session.ans=d102;
    });
    con.query(s12, [kw, dy], function (err, d103, fields) {
      req.session.ans2=d103;
    });
    con.query(s13, [kw, dy], function (err, d104, fields) {
      req.session.ans3=d104;
      res.redirect("/searchresult1");
    });
  }
  else
  {
    var s15="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.dname=? and schd.day=? and schd.reg=doc.reg and schd.id=hospital.id";
    if(op=="Doctors")
    s15="Select schd.sid, schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.docname=? and schd.day=? and schd.reg=doc.reg and schd.id=hospital.id";
    con.query(s15, [kw, dy], function(err, d105, fields){
      req.session.ans=d105;
      req.session.ans2=[];
      req.session.ans3=[];
      res.redirect("/searchresult1");
    });
  }
});
router.get('/searchresult1', function(req, res){
  res.render('searchresult1', {user10: req.session.ans, user20: req.session.ans2, user30: req.session.ans3});
});
router.get('/searchresult2', function (req, res) {
  res.render('searchresult2', { user2: req.session.ans1 });
});
router.post('/details', function(req, res){
  var hn=req.body.hos;
  var add=req.body.add;
  var sqlll="Select doc.docname, schd.sid, schd.dname, schd.start, schd.end from doc, schd where schd.id=(select id from hospital where name= ? and address= ?) and doc.reg=schd.reg";
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
router.post('/appointment', function (req, res) {
  var sd = parseInt(req.body.si);
  var sqqq = "Select schd.dname, schd.start, schd.end, schd.day, schd.capcnt, doc.docname, hospital.name, hospital.address, hospital.contact1, hospital.contact2 from schd, doc, hospital where schd.sid=? and schd.reg=doc.reg and schd.id=hospital.id";
  con.query(sqqq, [sd], function (err, dat, fields) {
    if (err) throw err;
    req.session.adeet = dat[0];
    req.session.app = sd;
    res.redirect('/appointmentform');
  });
});
router.get('/appointmentform', function(req, res){
  res.render('appointmentform', {data1: req.session.adeet});
});
router.post('/appointmentver', function(req, res){
  var ml=req.body.email;
  var token = crypto.randomBytes(3).toString('hex');
  var fn=req.body.fname;
  var ln=req.body.lname;
  var pb=req.body.pb;
  var pn=req.body.pn;
  var sqq0="INSERT INTO verification(email, pass, fn, ln, prob, pno) values ?";
  var v0=[
    [ml, token, fn, ln, pb, pn]
  ];
  con.query(sqq0, [v0], function(err, dta){
    if(err) throw err;
    console.log('inserted');
  });
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'connectus199@gmail.com',
    pass: 'jyotishna'
  }
});
var mailOptions = {
  from: 'connectus199@gmail.com',
  to: ml,
  subject: 'Verify email',
  text: 'Your Verification code is '+ token
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  req.session.mail=ml;
  res.redirect('/userverify');
});
router.get('/userverify', function(req, res){
  res.render('userverify', {em: req.session.mail, data: req.session.adeet});
});
router.post('/verification', function(req, res){
  var pass=req.body.otp;
  var sl = "delete from verification where pass Not in(?) and email=?";
  con.query(sl, [pass, req.session.mail], function(err, p){
    if(err) throw err;
  });
  var sl1="Select email, fn, ln, prob, pno from verification where email=? and pass=?";
  con.query(sl1, [req.session.mail, pass], function(err, d11, fields){
    if(err) throw err;
    if(d11.length==0)
    {
      alert("Wrong OTP");
      res.redirect('/appointmentform');
    }
    else
    {
      con.query("update schd set capcnt=capcnt-1 where sid=?", [req.session.app], function(err, dt){
        if(err) throw err;
        console.log("updated");
      });
      var vl=[[d11[0].email, d11[0].fn, d11[0].ln, d11[0].prob, d11[0].pno, req.session.app]];
      con.query("insert into appnts(email, fn, ln, prob, pno, sid) values ?", [vl], function(err, dta){
        if(err) throw err;
        console.log("inserted");
      });
      var dt1011=req.session.adeet;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'connectus199@gmail.com',
          pass: 'jyotishna'
        }
      });
      var mailOptions = {
        from: 'connectus199@gmail.com',
        to: req.session.mail,
        subject: 'Appointment Confirmed',
        text: 'Dear User,'+'\n'+'Your appointment is scheduled.'+'\n'+'Details: '+dt1011.name+'\n'+dt1011.dname+'\n'+dt1011.docname+'\n'+dt1011.day+'\n'+dt1011.start+'-'+dt1011.end+'\n'+'Regards,'+'\n'+'ConnectUs Team.'
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    con.query("delete from verification where email=?", [req.session.mail], function(err, hs){
      if(err) throw err;
      req.session.destroy();
      res.redirect('/');
    });
    }
  });
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
router.post('/editselect', function(req, res){
  var sq1="Select Distinct dname from schd where id=?";
  con.query(sq1, [req.session.user.id], function(err, dep, fields){
    req.session.dept=dep;
    res.redirect('editselect');
  });
});
router.get('/editselect', function(req, res){
  if (req.session.log)
  res.render('editselect',{ dept: req.session.dept});
  else
  res.redirect('/login');
});
router.post('/edit', function (req, res) {
  var depname = req.body.deptn;
  var sql30 = "select schd.sid, schd.day,schd.reg,schd.start,schd.end,doc.docname FROM schd,doc where schd.id=? and schd.dname=? and schd.reg=doc.reg order by day, start";
  con.query(sql30, [req.session.user.id, depname], function (err, sds, fields) {
    if (err) throw err;
    req.session.ed = sds;
    req.session.dpt=depname;
    res.redirect('/editp');
  });
});
router.get('/editp', function (req, res) {
  if (req.session.log)
  res.render('editp', { user20: req.session.ed });
  else
  res.redirect('/login');
});
router.post('/editit', function(req, res){
  var x=parseInt(req.body.si);
  var ind=parseInt(req.body.sno);
  var dy=parseInt(req.body.tday);
  var dnm=req.body.docname;
  var rn=req.body.regno;
  var ss=req.body.ss;
  var se=parseInt(req.body.se);
  var c=parseInt(req.body.but);
  if(c==1)
  {
    var sq="delete from schd where sid=?";
    con.query(sq, [x], function(err, data){
      if(err) throw err;
      console.log("deleted");
    });
  }
  else{
    var sq = "INSERT IGNORE INTO doc(docname, reg, spl) VALUES ?";
    var va=[
      [dnm, rn, req.session.dpt]
    ];
    con.query(sq, [va], function (err, data) {
      console.log("doc is inserted");
    });
    if(dy==0)
    dy=req.session.ed[ind-1].day;
    var sq2 = "update schd set reg=? where sid=?";
    con.query(sq2, [rn, x], function(err, data1){
      if(err) throw err;
      console.log(rn);
    });
    var sq21 = "update schd set start=? where sid=?";
    con.query(sq21, [ss, x], function (err, data1) {
      if (err) throw err;
      console.log(ss);
    });
    var sq22 = "update schd set end=? where sid=?";
    con.query(sq22, [se, x], function (err, data1) {
      if (err) throw err;
      console.log(se);
    });
    var sq23 = "update schd set day=? where sid=?";
    con.query(sq23, [dy, x], function (err, data1) {
      if (err) throw err;
      console.log("updatedd");
    });
  }
  var sq3 = "select schd.sid, schd.day,schd.reg,schd.start,schd.end,doc.docname FROM schd,doc where schd.id=? and schd.dname=? and schd.reg=doc.reg order by day, start";
  con.query(sq3, [req.session.user.id, req.session.dpt], function(err, rlt, fields){
    if(err) throw err;
    req.session.ed=rlt;
    res.redirect('/editp');
  });
});
router.get('/editp', function (req, res) {
  res.render('editp', { user20: req.session.ed });
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
  var cap=req.body.cap;
  for(var i=0; i<c; i++){
    var dn=docname[i];
    var r=regno[i]+gstate[i];
    var s=(startp[i]);
    var e=parseInt(endp[i]);
    var d=parseInt(day[i]);
    var cp=parseInt(cap[i]);
    if(c==1)
    {
      dn=docname;
      r=regno+gstate;
      s=(startp);
      e=parseInt(endp);
      d=parseInt(day);
      cp=parseInt(cap);
    }
    var sql7 = "INSERT IGNORE INTO doc(docname, reg, spl) VALUES ?";
    var values4 = [
        [dn, r, dep]
        ];
        con.query(sql7, [values4], function (err, data) {
          console.log("doc is inserted");
        });
  var sql5 = "INSERT IGNORE INTO schd (id, dname, reg, start, end, day, capf, capcnt) VALUES ?";
  var values3 = [
    [req.session.user.id, dep, r, s, e, d, cp, cp]
  ];
  con.query(sql5, [values3], function (err, data) {
    if (err) throw err;
    console.log("schd is inserted");
  });
  }
  alert("Your Data is Inserted. Go back to home to finish");
  res.redirect('/department');
});
module.exports = router;
