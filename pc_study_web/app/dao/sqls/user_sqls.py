sql_dict = {
    # 插入 用户
    "insert_user":"insert into user({key},register_time) values('{value}',{regist_date})",
    "get_password_by_id":"select * from user where tel = '{0}' limit 1",
    # 根据 tel 获取用户信息
    # "get_user_by_id":"select * from user where tel = '{0}' limit 1",
    "get_user_by_tel":"select user_info.user_name,user.id,user.tel,icon.icon_img from user inner join user_info on user_info.user_id=user.id inner join icon on icon.id=user_info.user_icon where user.tel = '{0}' limit 1",

    # "add_collect_id": "INSERT INTO collect(user_id,position_id)VALUES({0},{1})",
    # "del_collcet_id": "DELETE FROM collect where user_id={0} and position_id={1}",

    # 修改用户密码
    "chance_password_id": "UPDATE user set psw='{0}' where tel='{1}'",

    # 添加用户信息
    "insert_change":"insert into user_info(user_name,user_id,user_icon) values('{user_name}',{user_id},{user_icon})",
    # 修改用户信息
    "update_change":"update user_info set user_name='{0}',user_sex={1},identity='{2}',address='{3}',introduce='{4}' where user_id={5}",
    # 更新头像
    "update_icon": "update users set user_icon='{icon}' where tel='{tel}'",
    # 获取全部课程
    "total_course":"select course.id,name,integral,course_icon,publish_time from course,select_course as sc where sc.course_id=course.id and user_id={id} order by publish_time limit {index},5",
    # 获取页数
    "get_total_num":"select count(*) as num from course,select_course as sc where sc.course_id=course.id and user_id={id}",
    # 未完成课程
    "on_course": "select course.id,name,course_icon,integral,publish_time from user,select_course as sc,course where `user`.id=sc.user_id and sc.course_id=course.id and tel='{tel}'and iscomplete={complete} limit 8",
    # 完成的课程
    "finished_course": "select course.id,name,course_icon,integral,publish_time from user,select_course as sc,course where `user`.id=sc.user_id and sc.course_id=course.id and tel='{tel}' and iscomplete={complete} limit 8",
    # 收藏课程
    "collect_course": "select course.id,tel,name,course_icon,integral,publish_time from user,collection,course where `user`.id=collection.user_id and collection.course_id=course.id and tel='{tel}'",
    # 获取用户信息
    "get_information":"select user_id,user_name,user_sex,identity,address,introduce from user_info where user_id={id}",

    # 用户签到
    "insert_check_in":"insert into check_in(check_date,user_id) values(NOW(),{user_id})",

    # 获取用户积分
    "get_integral":"select SUM(integral) as num from user_integral as ui where ui.user_id={0}",
    # 获取笔记个数
    "get_notes":"select count(*) as num from note where user_id={0}",
    # 获取用户电话\邮箱
    "get_number":"select tel,email from user WHERE id={id}",

    # 计算学习时长--视频
    "select_study_time_video":"select progress from user_video where user_id={user_id}",
    # 计算学习时长--课件
    "select_study_time_courseware":"select courseware_time from courseware where id in ( 	select courseware_id from user_courseware where user_id={user_id})",
    #添加图片名称到icon表里
    "add_img_to_icon":"INSERT into icon(icon_img) VALUES('{img_url}')",
    # 更新头像
    "update_icon": "UPDATE user_info set user_icon=(SELECT id FROM icon WHERE icon_img='{img_url}') where user_id=(SELECT id FROM user WHERE tel='{tel}')",



}