sql_dict={
    # 获取所有方向
    "get_all_directions":"select * from direction",
    # 点击某一分类获取方向
    "get_direction_by_classify":"select * from direction where id=(select direction_id from type where id={id})",
    # 根据方向名获取方向id
    "get_direction_id_by_name":"select * from direction where name like '%{direction}%'",
    # 获取所有分类
    "get_all_types":"select * from type",
    # 根据方向id获取分类
    "get_types":"select * from type where direction_id={direction_id}",

    # # 获取课程
    # "get_courses":"select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' limit {page},{page_items}",
    # 根据时间降序获取课程
    "get_all_courses":"select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' order by publish_time desc limit {page},{page_items}",
    # 根据选课人数降序获取课程
    "get_all_courses_by_sc":"select t.* ,count(1) as select_nums from (select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%') as t left join select_course as sc on t.cid=sc.course_id group by t.cid order by select_nums desc limit {page},{page_items}",
    # 根据收藏量降序获取课程
    "get_all_course_by_collection":"select t.*,count(1) as col_nums from (select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%') as t left join collection as col on t.cid=col.course_id group by t.cid order by col_nums desc limit {page},{page_items}",


    # 获取精品课程
    # "get_uniquecourse":"select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%'and integral!=0 limit {page},{page_items}",
    # 根据时间降序获取精品课程
    "get_uniquecourse": "select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' and integral!=0 order by publish_time desc limit {page},{page_items}",
    # 根据选课人数降序获取精品课程
    "get_uniquecourse_by_sc": "select t.* ,count(1) as select_nums from (select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' and integral!=0) as t left join select_course as sc on t.cid=sc.course_id group by t.cid order by select_nums desc limit {page},{page_items}",
    # 根据收藏量降序获取精品课程
    "get_uniquecourse_by_collection": "select t.*,count(1) as col_nums from (select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%'and integral!=0) as t left join collection as col on t.cid=col.course_id group by t.cid order by col_nums desc limit {page},{page_items}",

    # 获取免费课程
    # "get_free_course":"select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%'and integral=0  limit {page},{page_items}",
    # 根据时间降序获取免费课程
    "get_free_course": "select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' and integral=0  order by publish_time desc limit {page},{page_items}",
    # 根据选课人数降序获取免费课程
    "get_free_course_by_sc": "select t.* ,count(1) as select_nums from (select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' and integral=0 ) as t left join select_course as sc on t.cid=sc.course_id group by t.cid order by select_nums desc limit {page},{page_items}",
    # 根据收藏量降序获取免费课程
    "get_free_course_by_collection": "select t.*,count(1) as col_nums from (select * from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%' and integral=0 ) as t left join collection as col on t.cid=col.course_id group by t.cid order by col_nums desc limit {page},{page_items}",

    # 获取课程个数
    "get_pages": "select count(1) as total from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%'",
    # 获取精品课程个数
    "get_uniquepages": "select count(1) as total from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%'and integral!=0",
    # 获取免费课程个数
    "get_free_pages": "select count(1) as total from course_info where direction like '%{direction}%' and type like '%{type}%' and difficulty like '%{difficulty}%'and integral=0"

}
