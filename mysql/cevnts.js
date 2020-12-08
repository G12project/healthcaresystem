var con = require('./db.js');

var sql = "CREATE EVENT IF NOT EXISTS RSAT ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-07 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=6); update schd set capcnt=capf where day=7; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS RFRI ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-13 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=5); update schd set capcnt=capf where day=6; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS RTHU ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-12 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=4); update schd set capcnt=capf where day=5; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS RWED ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-11 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=3); update schd set capcnt=capf where day=4; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS RTUE ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-10 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=2); update schd set capcnt=capf where day=3; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS RMON ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-09 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=1); update schd set capcnt=capf where day=2; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS RSUN ON SCHEDULE EVERY 1 WEEK STARTS '2020-11-08 00:00:00' DO BEGIN delete from appnts where sid in(select sid from schd where day=7); update schd set capcnt=capf where day=1; END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
var sql = "CREATE EVENT IF NOT EXISTS EXPIREOTP ON SCHEDULE EVERY 2 MINUTE STARTS CURRENT_TIMESTAMP DO BEGIN delete from verification where ctime<((NOW())-INTERVAL 10 MINUTE); END";
con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("EVENT created");
});
