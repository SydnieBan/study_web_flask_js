sql_dict={
    # 查询个人笔记
    "get_notes_by_id":"SELECT id,title ,content_editor,publish_date FROM note WHERE user_id={user_id} ORDER BY publish_date DESC limit 6",
    "delete_notes_by_id":"DELETE FROM note WHERE id={id}",
    "add_personal_notes":"INSERT INTO note(title,content_html,content_editor,publish_date,user_id,type,mold) VALUES ('{0}','{1}','{2}',{3},{4},'{5}','{6}') ",
    "display_note_by_noteid":"select * from note where id={note_id}"
}