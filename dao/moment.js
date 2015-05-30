var Promise = require('promise');
var mysqlp=require('./mysqlp.js');
/**
*get moment list posted by specific user.
**/
function get_moment_list(userid){
	return new Promise(function(resolve,reject){
        var sql="select * from moment where userid=?";
        mysqlp.query(sql,[userid]).then(function(result){
          resolve(result.rows);
        },function(ex){
        	reject(ex);
        })
	});
}

/**
*get moment list posted by friends of specific user.
**/
function get_moment_list_of_friends(userid){

}

/**
* 创建新的moment.
**/
function post_moment(userid,content){
  return new Promise(function(resolve,reject){
  	var sql="insert into moment(userid,content,create_datetime) values(?,?,current_timestamp()); select last_insert_id() as momentid;";
  	mysqlp.query(sql,[userid,content]).then(function(result){
      resolve({
      	momentid:result.rows[0].momentid
      });
  	},function(ex){
  		reject(ex);
  	})
  });
}

/**
* 上传图片到moment
**/
function post_moment_images(userid,momentid,image_file_paths){
 
}

module.exports={
	get_moment_list:get_moment_list
}