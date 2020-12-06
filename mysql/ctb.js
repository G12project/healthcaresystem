var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "*******",
  database: "database_name"
});

var sql = "CREATE TABLE hospital (id int Primary Key Not Null AUTO_INCREMENT, name VARCHAR(255) Not Null, address VARCHAR(255) Not Null, contact1 varchar(15) Not Null, contact2 varchar(15), email VARCHAR(100) Not Null, descp VARCHAR(500), Beds varchar(15), Amb varchar(15), Password varchar(500) Not Null)";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var sql = "CREATE TABLE dept (dname varchar(50) Primary Key Not Null)";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var sql = "CREATE TABLE doc (reg VARCHAR(50) Not Null, docname VARCHAR(50) Not Null, spl varchar(50) Not Null, Primary Key(reg), Foreign Key(spl) References dept(dname))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var sql = "CREATE TABLE schd (sid int Not Null AUTO_INCREMENT, id int Not Null, dname VARCHAR(50) Not Null, reg VARCHAR(50) Not Null, start VARCHAR(5) Not Null, end int Not Null, day int Not Null, capf int, capcnt int, Primary Key(sid, id, dname, reg, start, end, day), Foreign Key(id) References hospital(id), Foreign Key(reg) References doc(reg),Foreign Key(dname) References dept(dname))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var sql = "CREATE TABLE appnts (sid int Not Null, email VARCHAR(50) Not Null, fn VARCHAR(20) Not Null, ln VARCHAR(20) Not Null, prob VARCHAR(500), pno varchar(15), no int Not Null AUTO_INCREMENT, Primary Key(sid, email, no), Foreign Key(sid) References schd(sid))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var sql = "CREATE TABLE verification (email VARCHAR(50) Not Null, pass varchar(500) Not Null, fn VARCHAR(20) Not Null, ln VARCHAR(20) Not Null, prob VARCHAR(500), pno varchar(15), ctime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, Primary Key(email))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
