'use strict';
var user={
    "id":JSON.parse(window.sessionStorage.getItem("id")),
    "tel":JSON.parse(window.sessionStorage.getItem("tel"))
};

//********************** header ********************************
/* 点击跳到主页 */
var logo_img=document.querySelector('header .header .header_left .logo_img div');
logo_img.onclick=function () {
    location.href='./hoom.html'
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
                if(res.icon_img){
                    login_yes.firstElementChild.src=`${img_config}/${res.icon_img}`;
                    document.querySelector('#note_user_icon').src=`${img_config}/${res.icon_img}`;
                }
                document.querySelector('#note_user_name').innerText=`${res.user_name}`;
                document.querySelector('#note_user_name2').innerText=`${res.user_name}`;
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



var note=document.querySelector('.right-down');


//获取笔记
function get_notes() {
    let server = ip_config + '/note/select_note/';
    ajax(server, user,'POST', null, function (res) {
        console.log(res);
        show_notes(res);
    });
}
get_notes();
//显示个人笔记

function show_notes(notes) {
    console.log(notes);
    note.innerHTML = '';
    for (var item of notes) {
        note.innerHTML += `
            <div class="right-down-one" id="${item.id}">
                <div class="down-a">
                    <div class="item-one"></div>
                    <span><h3>${item.title}</h3></span>
                </div>
                <div class="down-b">
                    <p>${item.content_editor}</p>
                </div>
                <div class="down-c">
                    <div class="down-c-left">
                        <ul>
                            <li>${item.publish_date}</li>
                            <li>  |   阅读数  18928</li>
                            <li>  |   评论数  18928</li>
                        </ul>
                    </div>
                    <div class="down-c-right">
                        <ul>
                            <li style="color: #0099FF">置顶 |</li>
                            <li style="color: #0099FF" class="editor">编辑 |</li>
                            <li style="color: red" class="delete"> 删除</li>
                        </ul>
                    </div>
                </div>
            </div>

        `;
    }
    var doc = document.querySelectorAll('.right-down-one');
    var ppt=document.querySelectorAll('.editor');
    var dele=document.querySelectorAll('.delete');
    show_note(doc);
    change_note(ppt);
    delete_note(dele);
}
//显示编辑删除
function show_note(doc) {
    for (let item of doc) {
        item.onmouseover=function () {
            let editer=this.lastElementChild.lastElementChild;
            editer.style.display='block'
        };
        item.onmouseout=function () {
            let editer=this.lastElementChild.lastElementChild;
            editer.style.display='none'
        };
        item.querySelector('.down-a').onclick=function () {
            location.href=`./edit_note.html?note_id=${item.id}`
        }
    }
}
//编辑笔记
function change_note(ppt) {
    for (let item of ppt) {
        item.onclick=function () {
            let pt=this.parentElement.parentElement.parentElement.parentElement;
            // location.href=`./djf?note_id=${note.id}`
            /*根据id编辑对应笔记*/
            location.href=`./edit_note.html?note_id=${pt.id}`

        }
    }

}
//删除笔记
function delete_note(dele){
    for (let item of dele){
        item.onclick=function () {
            let del=this.parentElement.parentElement.parentElement.parentElement;
            confirm_del(del);
        }
    }
}
/* 删除确认提示框 */
function confirm_del(del) {
    var panel=document.querySelector("#panel");
    var close=document.querySelector("#close");
    var btn_can=document.querySelector('#btn_can');
    panel.style.display="block";
    close.onclick=function () {
        panel.style.display="none";
    };
    btn_can.onclick=function () {
        panel.style.display="none";
    };
    var btn_sub=document.querySelector('#btn_sub');
    btn_sub.onclick=function () {
        del_note_sql(del.id);
        del.remove();
        panel.style.display="none";
    }
}

//删除后台数据
function del_note_sql(id) {
    let server = ip_config + '/note/delete_note/';
    let date={
        "note_id":id
    };
    ajax(server, date,'get', null, function (res) {
        if (res.code=='1001') {
            // console.log(res.description);
            return res.description
        }else{
            // console.log(res.description);
            return res.description

        }
    });
}

