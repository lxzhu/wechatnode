use wechat;
truncate table media;
insert into media(mimeid,file_path,image_width,image_height,file_size_bytes,create_datetime)
	values(2,'images/1E30E924.jpg',0,0,0,current_timestamp());

insert into media(mimeid,file_path,image_width,image_height,file_size_bytes,create_datetime)
	values(2,'images/71CFAF5D.jpg',0,0,0,current_timestamp());

insert into media(mimeid,file_path,image_width,image_height,file_size_bytes,create_datetime)
	values(2,'images/314E21F5.jpg',0,0,0,current_timestamp());

insert into media(mimeid,file_path,image_width,image_height,file_size_bytes,create_datetime)
	values(2,'images/8644EBF8.jpg',0,0,0,current_timestamp());

insert into media(mimeid,file_path,image_width,image_height,file_size_bytes,create_datetime)
	values(2,'images/B03533FA.jpg',0,0,0,current_timestamp());

-- users
truncate table user;
insert into user(username,password,name,thumbnail_imageid,create_datetime)
	values('lxzhu',md5('NPasswordOfLxzhu'),'zhu liangxiong',1,current_timestamp());

insert into user(username,password,name,thumbnail_imageid,create_datetime)
	values('david',md5('NPasswordOfDavid'),'david white',2,current_timestamp());

insert into user(username,password,name,thumbnail_imageid,create_datetime)
	values('john',md5('NPasswordOfJohn'),'john black',3,current_timestamp());

insert into user(username,password,name,thumbnail_imageid,create_datetime)
	values('jim',md5('NPasswordOfJim'),'jim green',4,current_timestamp());

insert into user(username,password,name,thumbnail_imageid,create_datetime)
	values('bill',md5('NPasswordOfBill'),'bill pink',5,current_timestamp());

-- friends
insert into friendship(from_userid,to_userid,create_datetime) values(1,2,current_timestamp());

-- simple moment
truncate table moment;
truncate table moment_like;
truncate table moment_comment;

insert into moment(userid,content,create_datetime)
	values(1,"天气好热啊",'2015-05-31 00:04:00');
insert into moment_like(momentid,userid)
	values(1,2);
insert into moment_link(momentid,userid)
	values(1,3);

insert into moment_comment(momentid,userid,content,parent_commentid,parent_comment_userid,create_datetime)
	values(1,2,'过几天更热!',0,0,'2015-05-31 00:08:00');
insert into moment_comment(momentid,userid,content,parent_commentid,parent_comment_userid,create_datetime)
	values(1,3,'再热就活不下去啦!',1,2,'2015-05-31 00:09:00');

insert into moment(userid,content,create_datetime)
	values(1,'马上就六一了哦','2015-05-31 00:04:00');

