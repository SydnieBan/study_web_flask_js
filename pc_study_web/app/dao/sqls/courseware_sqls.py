sql_dict={
    "get_course_name":"SELECT course_id,course_name FROM ware_info WHERE id={id}",
    "get_course_ware": "SELECT id,ware_name,chapter_id,chapter_name FROM ware_info WHERE course_id={id}",
    "get_ware_content": "SELECT name,content FROM courseware where id={id}",
    "get_ware_question": "SELECT id,content,qc_date,user_name,icon_img FROM ware_question_info where courseware_id={id}",
    "add_ware_question":"INSERT INTO question_courseware(content,courseware_id,user_id,qc_date)VALUES('{0}',{1},{2},{3})"
}