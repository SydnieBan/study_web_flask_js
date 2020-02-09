sql_dict={

    # 根据搜索条件获取课程
    # 根据时间降序获取课程
    "get_all_courses":"select * from course_info where cname like '%{search_con}%' order by publish_time desc limit {page},{page_items}",
    # 根据选课人数降序获取课程
    "get_all_courses_by_sc":"select t.* ,count(1) as select_nums from (select * from course_info where cname like '%{search_con}%' ) as t left join select_course as sc on t.cid=sc.course_id group by t.cid order by select_nums desc limit {page},{page_items}",
    # 根据收藏量降序获取课程
    "get_all_course_by_collection":"select t.*,count(1) as col_nums from (select * from course_info where cname like '%{search_con}%') as t left join collection as col on t.cid=col.course_id group by t.cid order by col_nums desc limit {page},{page_items}",

    # 根据搜索条件获取课程个数
    "get_pages": "select count(1) as total from course_info where cname like '%{search_con}%'",

}
