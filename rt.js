var config = {
	website : {},
	
	maxFileSize:2*1024*1024,
	
	paths:{
		uploadImagePath:'store/images'
	},
	mysql : {
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : 'N0rikos123',
		database : 'wechat'
	}
};
config.website = {
	domain : "wechat.lxzhu.net",
	port : "12000"
}

module.exports = {
	config : config
};