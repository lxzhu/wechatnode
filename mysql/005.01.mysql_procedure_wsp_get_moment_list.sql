drop procedure if exists wsp_get_moment_list;

delimiter GO
create procedure wsp_get_moment_list(IN userid int, in offset int, in length int)
begin
#this procedure get friends of userid 
#then get moments of all friends and himself/herself.
#finally get moments in specified page.

#drop temporary table to avoid exception in last run
drop temporary table if exists recent_moment;
drop temporary table if exists recent_moment_comment;
drop temporary table if exists recent_moment_user;

#get recent moment.
create temporary table recent_moment
select m.* from moment m 
where m.userid =userid or m.userid in (
	select fl.to_userid from wvi_friend_list fl
	where fl.from_userid=userid
)
order by m.create_datetime desc
limit offset,length;

#get comments from my friends
create temporary table recent_moment_comment
select mc.* from moment_comment mc
join recent_moment rm where mc.momentid=rm.momentid and mc.userid=userid or mc.userid in (
	select to_userid from wvi_friend_list fl where fl.from_userid=userid
);

#get related users
create temporary table recent_moment_user
select distinct u.* from user u
where u.userid =userid or u.userid in (
	select rm.userid from recent_moment rm
	union 
	select rmc.userid from recent_moment_comment rmc
);
#select data from temporay table as result.
select * from recent_moment;
select * from recent_moment_comment;
select * from recent_moment_user;

#drop temporary tables to release memory
drop temporary table if exists recent_moment;
drop temporary table if exists recent_moment_comment;
drop temporary table if exists recent_moment_user;

end
GO


delimiter ;
