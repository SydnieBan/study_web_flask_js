sql_dict = {
    # 获取课程对应的信息
    "get_course_info": "select direction,type,cname,difficulty,introduce,notice,integral,course_icon from course_info where cid={id}",
    # 获取课程选课人数
    "get_course_num": "SELECT COUNT(1)as select_num FROM select_course WHERE course_id={id}",
    # 获取课程收藏人数
    "get_course_collect_num": "SELECT COUNT(1)as collection_num FROM collection WHERE course_id={id}",
    # 获取课程对应视频章节
    "get_course_video": "SELECT id,video_name,video_time,chapter_id,chapter_name,introduce FROM video_info WHERE course_id={id}",
    # 获取课程对应课件章节
    "get_course_ware": "SELECT id,ware_name,courseware_time,chapter_id,chapter_name,introduce FROM ware_info WHERE course_id={id}",
    # 获取课程评论
    "get_course_evaluation": "SELECT id,content,user_name,icon_img FROM evalution_info WHERE course_id={id} ORDER BY eva_date  DESC ",
    # 收藏课程
    "add_course_collect": "INSERT INTO collection(user_id,course_id)VALUES({user_id},{course_id})",
    "del_course_collect": "DELETE FROM collection WHERE user_id={user_id} and course_id={course_id}",

    # 获取用户对应积分
    "select_user_integral":"select sum(integral) as sum_integral from user_integral where user_id={user_id}",
    # 扣除用户积分
    "reduce_user_integral":"insert into user_integral(integral,user_id,get_date) values(-{integral},{user_id},{get_date})",
    # 添加用户选课
    "add_course_to_user": "INSERT INTO select_course(user_id,course_id,sc_date) values({0},{1},{2})",

    # 添加课程评论
    "add_course_evaluation": "INSERT INTO course_evaluation(content,course_id,user_id,eva_date)values('{0}',{1},{2},{3})",
    # 获取用户学习时长
    "get_user_course_video_progress": "SELECT progress from user_video_info where user_id={user_id} and course_id={course_id}",
    "get_user_course_ware_progress": "SELECT courseware_time from user_ware_info where user_id={user_id} and course_id={course_id}",
    # 推荐课程
    "get_pre_course": "SELECT c.id,c.name as course_name,c.course_icon,c.integral,d.name as dif_name FROM course as c INNER JOIN difficulty as d ON c.difficulty_id=d.id WHERE pre_course_id={course_id}",
    "get_same_type_course": "SELECT c.id,c.name as course_name,c.course_icon,c.integral,d.name as dif_name FROM course as c INNER JOIN difficulty as d ON c.difficulty_id=d.id WHERE c.type_id=(SELECT type_id  from course WHERE id={0}) and c.id!={1} ORDER BY publish_time DESC LIMIT {2}",
    # 判断用户是否收藏某门课
    "get_iscollection":"select count(1) from collection where user_id={user_id} and course_id={course_id}",
    # 判断用户是否选课
    "get_is_select_course":"select count(1) from select_course where user_id={user_id} and course_id={course_id}",

    # 添加 user_video
    "insert_user_video":"insert into user_video(progress,video_id,user_id) values(0,{video_id},{user_id})",
    # 添加 user_video
    "insert_user_courseware":"insert into user_courseware(iswatch,courseware_id,user_id) values(1,{courseware_id},{user_id})",
}
