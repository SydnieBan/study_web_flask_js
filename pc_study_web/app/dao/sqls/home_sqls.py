sql_dict={
    # 获取最新发布的新手课程
    "get_part_courses":"SELECT cid,course_icon,cname,integral FROM course_info WHERE integral=0 ORDER BY publish_time DESC LIMIT 8",
    # 获取新上好课
    "get_gd_courses":"SELECT cid,course_icon,cname,integral FROM course_info WHERE integral!=0 ORDER BY publish_time DESC LIMIT 8",
    # 获取精品课程
    "get_head_uniquecourse": "select cid,cname,course_icon,integral from course_info where integral!=0 ORDER BY integral DESC LIMIT 8",
    # 获取技术提升课程
    "get_promate": "select cid,cname,course_icon,difficulty from course_info where difficulty like '高级' limit 8",
    # 获取实战课程
    "get_promatelessons": "SELECT cid,course_icon,cname,integral,difficulty FROM course_info WHERE type='Python' ORDER BY publish_time DESC LIMIT 8;",
    # 获取老师
    "get_teacher":"select t.id,t.name,t.introduce,icon.icon_img,sex.sex_name,ti.identity from teacher as t inner join icon on icon.id=t.teacher_icon inner join sex on sex.id=t.teacher_sex inner join teacher_identity ti on ti.id=t.identity where t.id>={start_id} and t.id<={end_id}"
}
