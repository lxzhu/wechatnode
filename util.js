var crypto = require('crypto');
function md5(text){
	var hash = crypto.createHash('md5');
	return hash.update(text).digest('hex');
}

module.exports={
	md5:md5
};