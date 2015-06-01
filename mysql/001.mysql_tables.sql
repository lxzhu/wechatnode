
drop table user;
create table user(
	userid bigint auto_increment primary key,
	username nvarchar(100) not null,
	password nvarchar(36) not null,
	thumbnail_imageid bigint,
	name nvarchar(100) not null,
	create_datetime datetime not null
);
drop table login;
create table login(
	loginid nvarchar(36) not null,
	userid bigint not null,
	last_visit_datetime datetime,
	timeout_seconds int
);
drop table mime;
create table mime(
	mimeid int primary key,
	name nvarchar(100) not null,
	description nvarchar(400)
);

drop table media;
create table media(
	mediaid bigint auto_increment primary key,
	mimeid nvarchar(100) not null,
	file_path nvarchar(100) not null,
	image_width int,
	image_height int,
	stream_media_length_seconds int,
	file_size_bytes int,
	create_datetime datetime not null
);
drop table gallery;
create table gallery(
	galleryid bigint auto_increment primary key,
	userid bigint not null,
	title nvarchar(100) not null,
	create_datetime datetime
);
drop table gallery_media;

create table gallery_media(
	 galleryid bigint not null,
	 mediaid bigint not null,
	 display_index int not null,
	 create_datetime datetime
);

drop table device;
create table device(
	deviceid bigint auto_increment primary key,
	name nvarchar(100) not null,
	create_datetime datetime
);
drop table location;
create table location(
	locationid bigint auto_increment primary key,
	latitude int not null,
	longitude int not null,
	name nvarchar(200),
	create_datetime datetime
);

drop table link;
create table link(
	linkid bigint auto_increment primary key,
	url nvarchar(200) not null,
	title nvarchar(100) not null,
	thumbnail_imageid bigint,
	create_datetime datetime
);

drop table moment;
create table moment(
	momentid bigint auto_increment primary key,
	userid bigint not null,
    external_linkid bigint,
    content nvarchar(2000),
    galleryid bigint,
    deviceid bigint,
    locationid bigint,
    create_datetime datetime not null
);

drop table moment_like;
create table moment_like(
	momentid bigint not null,
	userid bigint not null,
	create_datetime datetime not null
);

drop table moment_comment;
create table moment_comment(
	commentid bigint auto_increment primary key,
	momentid bigint not null,
	userid bigint not null,
	content nvarchar(400) not null,
	parent_commentid bigint,
	parent_comment_userid bigint,
	create_datetime datetime not null
);
drop table friendship;
create table friendship(
	friendshipid bigint auto_increment primary key,
    from_userid bigint not null,
    to_userid bigint not null,
    create_datetime datetime
);

