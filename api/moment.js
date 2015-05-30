var route=require('../route.js').create();
var moment_dao=require('../dao/moment.js');
module.exports=function(app){
	route.attach(app);
};
function list(req,res){	
	var userid=req.cookies["WeChatUserID"];
	moment_dao.get_moment_list(userid).then(function(result){
     res.json({
           status:"ok",
           data:result
     });
	},function(ex){
		res.json({
			status:"failed",
			faults:ex
		})
	});	
}

route.get('/moment/list',list);