var con = require('./db.js');
var sql = "CREATE TABLE schd(sid int Not Null AUTO_INCREMENT, id int Not Null, dname VARCHAR(50) Not Null, reg VARCHAR(50) Not Null, start VARCHAR(5) Not Null, end int Not Null, day int Not Null, capf int, capcnt int, Primary Key(sid, id, dname, reg, start, end, day), Foreign Key(id) References hospital(id), Foreign Key(reg) References doc(reg),Foreign Key(dname) References dept(dname))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
