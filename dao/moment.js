var Promise = require('promise');
var mysqlp=require('./mysqlp.js');
/**
*get moments which are visible to specific user
**/

var get_friends_sql=" select to_userid as userid from friendship where from_userid=:userid"
+" union distinct "
+" select from_userid from friendship where to_userid=:userid ";


function get_moment_list(userid){
	return new Promise(function(resolve,reject){

    var sql="select * from moment where userid =:userid or userid in ( "
      +get_friends_sql
      +" )";
  mysqlp.query(sql,{userid:userid}).then(function(result){
    resolve(result.rows);
  },function(ex){
   reject(ex);
 });
});
}

/**
* get comments of moments which are visible to specific user.
**/
function get_moment_comment_list(userid){
  return new Promise(function(resolve,reject){

   var sql="select mc.* from moment_comment mc "
   +"join moment m on mc.momentid=m.momentid and mc.userid in ( "
     +get_friends_sql
     +")"
  +"where m.userid=:userid or m.userid in ("
    +get_friends_sql+")"

  mysqlp.query(sql,{userid:userid}).then(function (result) {
   resolve(result.rows);
 },function(ex){
  reject(ex);
});
});
}

function get_moment_user_list(userid){
  return new Promise(function(resolve,reject){
    var sql="select * from user u "
    +"where u.userid =:userid or u.userid in ("
      
      +")";
});
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
	get_moment_list:get_moment_list,
  get_moment_comment_list:get_moment_comment_list,
  get_moment_user_list:get_moment_user_list
}