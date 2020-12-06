var con = require('./db.js');

con.query("CREATE DATABASE database_name", function (err, result) {
	if (err) throw err;
	console.log("Database created");
});
