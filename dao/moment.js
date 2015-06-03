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

    var sql="call wsp_get_moment_list(:userid,0,20);"
    mysqlp.query(sql,{userid:userid}).then(function(result){
      resolve(result.rows);
    },function(ex){
     reject(ex);
   });
  });
}

function post_moment_text(userid,content){
  return new Promise(function(resolve,reject){
   var sql="insert into moment(userid,content) values(:userid,:content);";
   mysqlp.query(sql,{userid:userid,content:content}).then(function(result){
    console.log("insert moment result:",result);
    resolve({
      momentid:result.rows.insertId
    });
  },function(ex){
    reject(ex);
  });
 });  
}

function post_moment_image(momentid,files){
  var sql="insert into media(mimeid,file_path,image_width,image_height,file_size_bytes,create_datetime) "
  +"values(1,:path,:width,:height,:size, current_timestamp());";
}

module.exports={
	get_moment_list:get_moment_list,
  post_moment_text:post_moment_text
}