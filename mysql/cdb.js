var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "********"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE database_name", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
