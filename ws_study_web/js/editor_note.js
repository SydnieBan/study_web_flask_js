var user={
    "id":JSON.parse(window.sessionStorage.getItem("id")),
    "tel":JSON.parse(window.sessionStorage.getItem("tel"))
};
var condition={
    note_id:null
};
condition.note_id=location.search.slice(1).split('=')[1];

//********************** header ********************************
/* 返回 */
var video_return=document.querySelector('#video_return');
video_return.onclick=function(){
    location.href=`./note.html`
};

/* 搜索 */
var search_text=document.querySelector('#search_text');
var search_button=document.querySelector('#search_button');
search_button.onclick=search;
search_text.onkeypress=function (event) {
    if (event.key.toLowerCase()=='enter'){
        search();
    }
};
function search() {
    let search_con=search_text.value;
    location.href=`./search.html?search_con=${search_con}`
}
/* 判断是否登录 */
(function () {
    var login_no=document.querySelector('.login_no');
    var login_yes=document.querySelector('.login_yes');
    var token=window.localStorage.getItem('token');
    if (token){
        /******/
        let server=ip_config+'/user/show/';
        ajax(server,user,'GET',token,function (res) {
            if (user.id){
                login_no.style.display='none';
                login_yes.style.display='block';
                if(res.icon_img)
                    login_yes.firstElementChild.src=`${img_config}/${res.icon_img}`;
            }else{
                login_no.style.display='block';
                login_yes.style.display='no';
            }
        })
    } else{
        login_no.style.display='block';
        login_yes.style.display='no';
    }
    document.querySelector('#login_yes_img').onclick=function(){
        location.href=`./my.html`
    };
    document.querySelector('.set').onclick=function(){
        location.href=`./my.html`
    };
    document.querySelector('.sign_out').onclick=function () {
        window.localStorage.clear();
        // location.reload();
        location.href='./hoom.html'
    }
})();
//**************************************************************
//**************************************************************

(function () {
    ajax(ip_config+'/note/display_note/',{"note_id":condition.note_id},'GET',null,function (res) {
        console.log('测试');
        console.log(res);
        document.querySelector('#div2').innerText=res[0].content_editor;
    })
})();









var E = window.wangEditor;
var editor = new E('#div1', '#div2'); // 两个参数也可以传入 elem 对象，class 选择器
editor.create();

// <!--    编辑器，查看主页效果-->
var item_a=document.querySelector('#item-a');
var edit_txt=document.querySelector('#edit_txt');
var item_b=document.querySelector('#item-b');
var txt_2=document.querySelector('#txt_2');

item_a.onmouseover=function () {
    item_a.style.backgroundColor='#93bbed';
    edit_txt.style.color='white';
};
item_a.onmouseout=function () {
    item_a.style.backgroundColor='white';
    edit_txt.style.color='black';
};
item_b.onmouseover=function () {
    item_b.style.backgroundColor='#93bbed';
    txt_2.style.color='white';
};
item_b.onmouseout=function () {
    item_b.style.backgroundColor='white';
    txt_2.style.color='black';
};

/*文章、评论、分类效果*/
var context=document.querySelectorAll('.context');
for (let item of context) {
    item.onmouseover=function () {
        item.style.backgroundColor= '#93bbed';
        item.style.color='white';
    };
    item.onmouseout=function () {
        item.style.backgroundColor= 'white';
        item.style.color='black';
    };
}

var txt_title=document.querySelector('#txt_title');//文章标题
var btn_sub=document.querySelector('#btn_sub');//发布按钮
var type_1=document.querySelector('#type_1');//文章分类
var type_2=document.querySelector('#type_2');//文章类型

btn_sub.onclick=function(){
    // let user_id=localStorage.getItem('user_id')
    var date={
        title:txt_title.value,
        content_html:editor.txt.html(),
        content_editor:editor.txt.text(),
        type:type_1.value,
        mold:type_2.value,
        user_id:17
    };
    if (!date.title) {
        alert('标题不能为空');
    }else if(!date.type){
        alert('文章分类不能为空');
    }else if(date.mold==0){
        alert('请选择文章类型');
    }else {
        add_note(date)
        alert('发布成功')
    //    发布会跳转
    }
};



//将笔记写入数据库
function add_note(date) {
    let server=ip_config+"/note/add_note/";
    ajax(server,date,'post',null,function (result) {
        if (result.code=='1024'){
            location.href='note.html'
        }else {
            console.log(result.description);
        }
    })
}