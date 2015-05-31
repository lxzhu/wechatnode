var Promise = require('promise');
var mysql = require('mysql');
module.exports = {};
var options = {
	host : "localhost",
	port : "3306",
	user : "root",
	password : "N0rikos123",
	database : "wechat",
	multipleStatements : true
};
var pool = mysql.createPool(options);
pool.on('connection', function (connection) {
	connection.config.queryFormat = function (query, values) {
		if (!values) return query;
		return query.replace(/\:(\w+)/g, function (txt, key) {
			if (values.hasOwnProperty(key)) {
				return this.escape(values[key]);
			}
			return txt;
		}.bind(this));
	};
});

module.exports.query = function(sql, args) {
	return new Promise(function(resolve, reject) {
		console.log("sql:"+sql);
		console.log("args:"+JSON.stringify(args));
		pool.query(sql, args, function(ex, rows, fields) {
			if (ex) {
				reject(ex);
			} else {
				resolve({
					rows : rows,
					fields : fields
				})
			}
		});
	});
}
module.exports.insert = function(sql, args) {
	return new Promise(function(resolve, reject) {
		console.log("sql:"+sql);
		console.log("args:"+JSON.stringify(args));
		pool.query(sql, args, function(ex, result) {
			if (ex) {
				console.log("mysqlp.insert.reject");
				reject(ex);
			} else {
				console.log("mysqlp.insert.resolve");
				resolve(result);
			}
		});
	});
}
module.exports.trname = function(name) {
	return  name;
}
