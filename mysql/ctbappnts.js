var con = require('./db.js');

var sql="CREATE TABLE appnts(sid int Not Null, email VARCHAR(50) Not Null, fn VARCHAR(20) Not Null, ln VARCHAR(20) Not Null, prob VARCHAR(500), pno varchar(15), no int Not Null AUTO_INCREMENT, Primary Key(sid, email, no), Foreign Key(sid) References schd(sid))";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table created");
});