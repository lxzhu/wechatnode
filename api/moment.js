var route=require('../route.js').create();
var moment_dao=require('../dao/moment.js');
var async=require('async');

module.exports=function(app){
	route.attach(app);
};

function list(req,res){	
	var userid=req.cookies["WeChatUserID"];
	var tasks={};
	tasks.get_moment_list=function (callback){
		moment_dao.get_moment_list(userid).done(function(result){
			console.log('get_moment_list result'+JSON.stringify(result));
			callback(null,result);
		},function(ex){
			callback(ex);
		});
	};

	tasks.get_comment_list=function(callback){
		moment_dao.get_moment_comment_list(userid).done(function(result){
			console.log('get_comment_list result'+JSON.stringify(result));
			callback(null,result);
		},function(ex){
			callback(ex);
		});
	};
	
	async.parallel(tasks,function(err,result){
		if(err){
			res.json({
				status:"failed",
				faults:err
			});
		}else{			
			res.json({
				status:"ok",
				data:{
					moments:result.get_moment_list,
					comments:result.get_comment_list
				}
			});
		}
	});	
}

route.get('/moment/list',list);