var user = require('../dao/user.js');
var route = require('../route.js').create();


module.exports = function(app){
	route.attach(app);
}

function login(req, res) {
	var buz = user.createBuz();

   
	buz.login(req.body.username, req.body.password).then(function(result) {
		res.cookie('WeChatUserID', result.userid, {
			httpOnly : true
		});
		res.json(result);
	}, function(ex) {
		res.json({
			status : "failed",
			fault : ex
		})
	}).done();

}

route.post('/user/login', login);