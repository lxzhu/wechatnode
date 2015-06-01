create or replace view wvi_friend_list as
	select from_userid, to_userid from friendship
	union distinct
	select to_userid,from_userid from friendship
;