var rt=require('../rt.js');
var route=require('../route.js').create();
var moment_dao=require('../dao/moment.js');
var formidable=require('formidable');
var async=require('async');

module.exports=function(app){
	route.attach(app);
};

/**
**/
function list(req,res){	
	var userid=req.cookies["WeChatUserID"];
	var tasks={};
	tasks.get_moment_list=function (callback){
		moment_dao.get_moment_list(userid).done(function(result){
			console.log('get_moment_list result'+JSON.stringify(result));
			
			var moments=result[0];			
			var comments=result[1];
			var users=result[2];

			moments.forEach(function(moment,momentIndex){
				moment.comments=comments.filter(function(comment,commentIndex){
					return moment.momentid===comment.momentid && comment.parent_commentid === 0;
				});				
			});

			callback(null,{
				moments:moments,
				users:users
			});
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

/**
**/
function add(req,res){
	var userid=req.cookies["WeChatUserID"];
	var content=req.body.content;
	moment_dao.post_moment_text(userid,content).done(function(result){
		res.json({
			momentid:result.momentid
		});
	},function(ex){
		res.json({
			status:"failed",
			faults:err
		});
	});
}

route.get('/moment/list',list);
route.post('/moment/add',add);