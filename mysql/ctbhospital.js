var con=require('./db.js');

var sql = "CREATE TABLE hospital (id int Primary Key Not Null AUTO_INCREMENT, name VARCHAR(255) Not Null, address VARCHAR(255) Not Null, contact1 varchar(15) Not Null, contact2 varchar(15), email VARCHAR(100) Not Null, descp VARCHAR(500), Beds varchar(15), Amb varchar(15), Password varchar(500) Not Null)";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});




