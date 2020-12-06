var con=require('./db.js');

var sql = "CREATE TABLE verification (email VARCHAR(50) Not Null, pass varchar(500) Not Null, fn VARCHAR(20) Not Null, ln VARCHAR(20) Not Null, prob VARCHAR(500), pno varchar(15), ctime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, Primary Key(email))";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table created");
});