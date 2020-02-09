sql_dict={
    # 获取课程有多少章
    "get_chapters_by_course_id":"select * from chapter where course_id={course_id}",
    # 根据章id获取其小节信息
    "get_videos_by_chapter_id":"select * from video where chapter_id={chapter_id}",
    # 根据视频id获取其视频
    "get_video_by_video_id":"select * from video where id={video_id}",
    # 获取老师信息
    "get_teacher_by_course_id":"select * from teacher_info_percourse where cid={course_id}",
    # 获取该视频对应的问答
    "get_video_question_info_by_video_id":"select * from video_question_info where video_id={video_id}",

    # 点击某一分类获取方向
    "get_direction_by_classify":"select * from direction where id=(select direction_id from type where id={id})",
    # 根据方向名获取方向id
    "get_direction_id_by_name":"select * from direction where name like '%{direction}%'",
    # 获取所有分类
    "get_all_types":"select * from type",
    # 根据方向id获取分类
    "get_types":"select * from type where direction_id={direction_id}",
    # 用户添加课程问题
    "insert_video_question_info":"INSERT INTO question_video(content,video_id,user_id,qv_date)VALUES('{content}',{video_id},{user_id},{qv_date})",

    # 查看user_video的progress
    "select_user_video_progress":"select progress from user_video where video_id={video_id} and user_id={user_id}",
    # 修改user_video
    "update_user_video_progress":"update user_video set progress='{progress}' where video_id={video_id} and user_id={user_id}"



}
