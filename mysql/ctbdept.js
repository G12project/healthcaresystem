var con = require('./db.js');

var sql = "CREATE TABLE dept(dname varchar(50) Primary Key Not Null)";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table created");
});
