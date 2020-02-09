var user={
    "id":JSON.parse(window.sessionStorage.getItem("id")),
    "tel":JSON.parse(window.sessionStorage.getItem("tel"))
};
var condition={
    page_index:1
};
var page_size=5;
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
                login_yes.firstElementChild.src=`${img_config}/${res.icon_img}`;
                var user_img=document.querySelector('#headers img');
                user_img.src=`${img_config}/${res.icon_img}`;
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
        window.sessionStorage.clear();
        location.href='./hoom.html'
        // location.reload();
    }
})();
//**************************************************************


var change=document.querySelector('#change');
var open=document.querySelector('#headers');
var panel=document.querySelector("#panel");
var close=document.querySelector("#close");
var btn_sub=document.querySelector('#btn_sub');
var content_eva=document.querySelector('#content_eva');
// form 表单 模态框
var revise=document.querySelector('#div01');
var exit=document.querySelector('#exit');
var btn=document.querySelector('#btn');
// 不同内容的class层
var course=document.querySelector('.course_content');
var personal=document.querySelector('.personal_content');
var collect_course=document.querySelector('.collect_course');
var not_finished=document.querySelector('.not_finished');
var finished=document.querySelector('.finished');
var install=document.querySelector('.install');
var account=document.querySelector('.account');
// 左侧点击 class 层
var person=document.querySelector('.personal');
var total=document.querySelector('.total');
var collect=document.querySelector('.collect');
var on=document.querySelector('.on');
var over=document.querySelector('.over');
var left=document.querySelector('.left');
//选课内容class
var bottom=document.querySelector('#b02');
var bottom_three=document.querySelector('#b03');
var bottom_four=document.querySelector('#b04');
var bottom_five=document.querySelector('#b05');
//form 表单模态框 input 框 id
var ipt01=document.querySelector('#ipt01');
var sex=document.querySelector('#sex');
var ipt03=document.querySelector('#ipt03');
var ipt04=document.querySelector('#ipt04');
var ipt05=document.querySelector('#ipt05');

var self=document.querySelector('.self');

var grade = document.querySelector('.p01');
var count = document.querySelector('.p02');
//账号 邮箱
var accounts = document.querySelector('.p03');
// 箭头
var up = document.querySelector('.up');
var down = document.querySelector('.down');

// ******************************
ajax(ip_config+'/user/information/',{"id":user.id}, 'post', null, function (result){
        show_information(result)
    }
);

display_user_info();
function display_user_info(){
    // 用户积分
    ajax(ip_config+'/user/integral/', {"id":user.id}, 'post', null, function (result) {
        show_integral(result);
    });
    function show_integral(data) {
        grade.innerHTML = '';
        grade.innerHTML = `<span>${data['num']?data['num']:0}</span>`
    }
// 用户笔记数
    ajax(ip_config+'/user/get_note_num/', {"id":user.id}, 'post', null, function (result) {
        show_note_num(result)
    });
    function show_note_num(data) {
        count.innerHTML = '';
        count.innerHTML = `<span>${data['num']?data['num']:0}</span>`
    }
}
// ************** 计算学习时长 *************
count_study_time();
function count_study_time(){
    ajax(ip_config+'/user/count_study_time/',{"id":user.id},'GET',null,function (res) { // sum_study_time
        show_study_time(res)
    });
    function show_study_time(res) {
        let study_time=res.sum_study_time; // 秒
        let hh=~~(study_time/(60*60));
        let mm=~~(study_time%(60*60)/60);
        let ss=~~(study_time%60);
        document.querySelector('#study_time').innerText=study_time?(hh+":"+mm+":"+ss):('00:00:00');
    }
}
// *******************************



//点击头像上传
open.onclick=function(){
    panel.style.display='block';
};
// 点击关闭头像框
close.onclick=function () {
    panel.style.display="none";
};
//点击确定上传头像框
btn_sub.onclick=function(){
    panel.style.display="none";
    content_eva.value='';
};
//点击修改资料弹出模态框
change.onclick=function () {
    revise.style.display='block';
};
//点击❌退出
exit.onclick=function () {
    revise.style.display='none';
};
//form 表单提交
btn.onclick=function () {
    revise.style.display='none';
    // var user_info={
    //     user_id:7
    // };
    var user_info={"name":ipt01.value,"sex":sex.value?sex.value:1,"identity":ipt03.value,"address":ipt04.value,"introduce":ipt05.value,"id":user.id};
    console.log(user_info);
    let server=`${ip_config}/user/update/`;
    ajax(server,user_info, 'post', null, function (result){
        if (result && result.code == '1030'){
            let server=`${ip_config}/user/information/`;
            // var user={"id":user_info.user_id};
            ajax(server,{"id":user.id}, 'post', null, function (result){
                    show_information(result)
                }
            )
        }else{
            // alert('修改失败')
        }
    });
};
function show_information(data) {
    self.innerHTML=``;
    self.innerHTML+=`<li class="common">昵称:${data.user_name ? data.user_name:''}</li>
                      <li class="common">性别:${(data.user_sex == 1) ? '男' : '女'}</li>
                      <li class="common">身份:${data.identity ?data.identity:''}</li>
                      <li class="common">地址:${data.address?data.address:''}</li>
                      <li class="common">简介:${data.introduce?data.introduce:''}</li>`
    ipt01.value=`${data.user_name ? data.user_name:''}`;
    // sex.value=`${data.user_sex}`;
    if (data.user_sex==1)
        sex.children[1].style.checked='trus';
    else
        sex.children[2].style.checked='trus';
    ipt03.value=`${data.identity ? data.identity:''}`;
    ipt04.value=`${data.address ? data.address:''}`;
    ipt05.value=`${data.introduce ? data.introduce:''}`;
}
//个人资料点击
person.onclick=function () {
    personal.style.display='block';
    course.style.display='none';
    collect_course.style.display='none';
    not_finished.style.display='none';
    finished.style.display='none';
    install.style.display='none';
};

// 遍历所有前兄弟节点
function previousElementSiblings(obj,callback) {
    let obj_pre=obj.previousElementSibling;
    while(obj_pre){
        callback(obj_pre);
        obj_pre=obj_pre.previousElementSibling
    }
}
// 遍历所有后兄弟节点
function nextElementSiblings(obj,callback) {
    let obj_next=obj.nextElementSibling;
    while(obj_next){
        callback(obj_next);
        obj_next=obj_next.nextElementSibling;
    }
}
// 全部课程点击
total.onclick=get_total;
function get_total() {
    total.classList.add('selected');
    previousElementSiblings(total,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });
    nextElementSiblings(total,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });

    personal.style.display='none';
    course.style.display='block';
    collect_course.style.display='none';
    not_finished.style.display='none';
    finished.style.display='none';
    install.style.display='none';
    // var user={"tel":"13512345678"};
    let server=`${ip_config}/user/total/`;
    ajax(server,{"user_id":user.id,"page_index":condition.page_index}, 'post', null, function (result){

        ajax(ip_config+'/user/get_total_page/', {"user_id":user.id}, 'post', null, function (result){
            show_pages(result.num)
        });
        show(result);
    });
    function show(data){
        bottom.innerHTML='';
        for( var item of data ){
            bottom.innerHTML+=`<div class="bottom-one" id="${item.id}">
                        <div class="img">
                            <img src="${img_config}/images/course${item.course_icon}" alt="" style="width: 220px;height: 135px">
                        </div>
                        <div class="content">
                            <p>${item.name}</p>
                            <p>${(item.integral) > 0 ? '所需积分为:' + item.integral : '免费'}</p>
                        </div>
                        <div class="time">
                            <span>${item.publish_time}</span>
                        </div>
                    </div>`
        }
        let b02_bottom_one=document.querySelectorAll('#b02 .bottom-one');
        for (let item of b02_bottom_one) {
            item.onclick=function () {
                location.href=`./course_description.html?course_id=${item.id}`;
            }
        }
    }
}


function show_pages(num) {
    if (condition.page_index > 1 && condition.page_index < Math.ceil(num / page_size)) {
        up.style.display='block';
        down.style.display='block';
        up.onclick = function () {
            condition.page_index = condition.page_index - 1;
            get_total()
        }
        down.onclick = function () {
            condition.page_index = condition.page_index + 1;
            get_total()
        }
    }else if(condition.page_index==1){
        up.style.display='none'
        down.style.display='block'
        down.onclick = function () {
            condition.page_index = condition.page_index + 1;
            get_total()
        }
    }else if(condition.page_index==Math.ceil(num / page_size)){
        up.style.display='block'
        down.style.display='none'
        up.onclick = function () {
            condition.page_index = condition.page_index - 1;
            get_total()
        }
    }
}






// 收藏课程点击
collect.onclick=function () {
    collect.classList.add('selected');
    previousElementSiblings(collect,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });
    nextElementSiblings(collect,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });


    collect_course.style.display='block';
    personal.style.display='none';
    course.style.display='none';
    not_finished.style.display='none';
    finished.style.display='none';
    install.style.display='none';
    // var user={"tel":"13512345678"};
    let server=`${ip_config}/user/collect/`;
    ajax(server,{"tel":user.tel}, 'post', null, function (result){
        show(result)
    })
    function show(data){
        bottom_three.innerHTML='';
        for( var item of data ){
            bottom_three.innerHTML+=`<div class="bottom-one" id="${item.id}">
                        <div class="img">
                            <img src="${img_config}/images/course${item.course_icon}" alt="" style="width: 220px;height: 135px">
                        </div>
                        <div class="content">
                            <p>${item.name}</p>
                            <p>${(item.integral) > 0 ? '所需积分为:' + item.integral : '免费'}</p>
                        </div>
                        <div class="time">
                            <span>${item.publish_time}</span>
                        </div>
                    </div>`
        }
        let b03_bottom_one=document.querySelectorAll('#b03 .bottom-one');
        for (let item of b03_bottom_one) {
            item.onclick=function () {
                location.href=`./course_description.html?course_id=${item.id}`;
            }
        }

    }

}
//正在进行点击
on.onclick=function () {

    on.classList.add('selected');
    previousElementSiblings(on,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });
    nextElementSiblings(on,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });

    collect_course.style.display='none';
    personal.style.display='none';
    course.style.display='none';
    not_finished.style.display='block';
    finished.style.display='none';
    install.style.display='none';
    // var user={"tel":"13512345678","complete":0};
    let server=`${ip_config}/user/on/`;
    ajax(server,{"tel":user.tel,"complete":0}, 'post', null, function (result){
        show(result)
    })
    function show(data){
        bottom_four.innerHTML='';
        for( var item of data ){
            bottom_four.innerHTML+=`<div class="bottom-one" id="${item.id}">
                        <div class="img">
                            <img src="${img_config}/images/course${item.course_icon}" alt="" style="width: 220px;height: 135px">
                        </div>
                        <div class="content">
                            <p>${item.name}</p>
                            <p>${(item.integral) > 0 ? '所需积分为:' + item.integral : '免费'}</p>
                        </div>
                        <div class="time">
                            <span>${item.publish_time}</span>
                        </div>
                    </div>`
        }
        let b04_bottom_one=document.querySelectorAll('#b04 .bottom-one');
        for (let item of b04_bottom_one) {
            item.onclick=function () {
                location.href=`./course_description.html?course_id=${item.id}`;
            }
        }
    }
}
// 已结束点击
over.onclick=function () {

    over.classList.add('selected');
    previousElementSiblings(over,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });
    nextElementSiblings(over,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });

    collect_course.style.display='none';
    personal.style.display='none';
    course.style.display='none';
    not_finished.style.display='none';
    finished.style.display='block';
    install.style.display='none';
    // var user={"tel":"13512345678","complete":1};
    let server= `${ip_config}/user/finish/`;
    ajax(server,{"tel":user.tel,"complete":1}, 'post', null, function (result){
        show(result)
    });
    function show(data){
        bottom_five.innerHTML='';
        for( var item of data ){
            bottom_five.innerHTML+=`<div class="bottom-one" id="${item.id}">
                        <div class="img">
                            <img src="${img_config}/images/course${item.course_icon}" alt="" style="width: 220px;height: 135px">
                        </div>
                        <div class="content">
                            <p>${item.name}</p>
                            <p>${(item.integral) > 0 ? '所需积分为:' + item.integral : '免费'}</p>
                        </div>
                        <div class="time">
                            <span>${item.publish_time}</span>
                        </div>
                    </div>`
        }
        let b05_bottom_one=document.querySelectorAll('#b05 .bottom-one');
        for (let item of b05_bottom_one) {
            item.onclick=function () {
                location.href=`./course_description.html?course_id=${item.id}`;
            }
        }
    }
}
// 账号设置点击
account.onclick=function () {

    account.classList.add('selected');
    previousElementSiblings(account,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });
    nextElementSiblings(account,function (res) {
        if (res.classList.contains('selected')) {
            res.classList.remove('selected');
        }
    });

    collect_course.style.display='none';
    personal.style.display='none';
    course.style.display='none';
    not_finished.style.display='none';
    finished.style.display='none';
    install.style.display='block';


    ajax(ip_config+'/user/get_account/', {"user_id":user.id}, 'post', null, function (result) {
        show_account(result)
    });

    function show_account(data) {
        accounts.innerHTML = '';
        accounts.innerHTML = `<span>${data['tel']?data['tel']:''}</span>`;
        var now_mail_span=document.querySelector('.now_mail span');
        now_mail_span.innerText='';
        now_mail_span.innerText=`${data['email']?data['email']:''}`
    }

    change.onclick = function () {
        location.href = './login.html'
    }
};
// ****************** 七牛云 ************************************
// var user={
//     id:17,
//     tel:"17864207686",
//     token:"cs"
// };
content_eva.onchange=function (event) {
    var local_file=event.target.files[0];
    var local_file_name=local_file.name;
    let server=ip_config+'/upload_token/';
    ajax(server,{"local_file_name":local_file_name},'GET',null,function (res) {
        let upload_token=res.upload_token;
        let new_file_name=res.new_file_name;
        let new_file=new File([local_file],new_file_name);
        var config={
            useCdnDomain: false, // 是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false
            disableStatisticsReport:true, // 是否禁用日志报告，为布尔值，默认为false
            retryCount:6, // 上传自动重试次数（整体重试次数，而不是某个分片的重试次数）
            region: qiniu.region.z2 // 选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
        };
        var putExtra = {
            fname: "", // 文件原文件名
            params: {}, // 用来放置自定义变量
            mimeType: ["image/png", "image/jpeg", "image/gif"] // 限制上传文件类型
        };
        putExtra.params["x:name"]=new_file_name.split('.')[0];
        // qiniu.upload 返回一个 observable 对象用来控制上传行为，同时返回一个 subscription 对象
        var observable = qiniu.upload(local_file, new_file_name, upload_token, putExtra, config); // 上传的文件 + 文件资源名 + token + putExtra + config
        // observable 对象通过 subscribe 方法可以被 observer 所订阅，订阅同时会开始触发上传
        var subscription=observable.subscribe({
            next(res){

            },
            error(res){
                console.log(res)
            },
            complete(res){
                // alert('上传成功');
                // 调用ajax将文件名发给后台
                var qiniu_url=img_config;
                var img_url=qiniu_url+'/'+res.key;
                document.querySelector('#user_img').src=img_url;
                document.querySelector('.login_yes').firstElementChild.src=img_url;
                add_user_icon(res.key);
            }
        });  // 上传开始

    })
};
function add_user_icon(src){
    let server=ip_config+'/user/icon/';
    let date={
        "img_url":src,
        "tel":user.tel
    };
    ajax(server,date,"POST",null,function (result) {
        if (result) {
            // console.log(result);
            ajax()
        }
    })
}
