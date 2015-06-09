var rt=require('../rt.js');
var route=require('../route.js').create();
var moment_dao=require('../dao/moment.js');
var formidable=require('formidable');
var async=require('async');
var path=require('path');
var fs=require('fs');
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

function attach(req,res){
	var userid=req.cookies["WeChatUserID"];
	var form=new formidable.IncomingForm();
	form.encoding="utf-8";
	form.multiples=true;    
	form.uploadDir="/var/www/wechatnode/store/images";
	form.parse(req,function(err,fields,files){
		var momentid=parseInt(fields.momentid);
		console.log("files",files);
		var tasks=[];
		function rename(file){

			return function(callback){			
				
				var filedir=path.dirname(file.path);  
				console.log("filedir",filedir);
				console.log("filename",file.name);   	
				var newpath=path.join(filedir,file.name);
				fs.rename(file.path,newpath,callback);
			};
		}

		for(var prop in files){
			if(files.hasOwnProperty(prop)){
				var file=files[prop];
				tasks.push(rename(file));
			}
		}

		async.parallel(tasks,function(err,result){
			res.json({
				status:"OK"
			});
		});


	});
}

route.get('/moment/list',list);
route.post('/moment/add',add);
route.post('/moment/attach',attach);