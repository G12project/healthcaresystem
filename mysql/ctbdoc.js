var con = require('./db.js');
var sql = "CREATE TABLE doc (reg VARCHAR(50) Not Null, docname VARCHAR(50) Not Null, spl varchar(50) Not Null, Primary Key(reg), Foreign Key(spl) References dept(dname))";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table created");
});