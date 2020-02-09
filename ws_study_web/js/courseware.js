var user={
    "id":JSON.parse(window.sessionStorage.getItem("id")),
    "tel":JSON.parse(window.sessionStorage.getItem("tel"))
};

var condition={
    // course_id:228,
    // ware_id:2001,
    // user_id:1
    course_id:null,
    ware_id:null,
    user_id:JSON.parse(window.sessionStorage.getItem("id")),
};

// ?course_id=...&courseware_id=...
let get_con_by_url=location.search.slice(1).split('&');
condition.course_id=get_con_by_url[0].split('=')[1];
condition.ware_id=get_con_by_url[1].split('=')[1];

//********************** header ********************************
/* 返回 */
var video_return=document.querySelector('#video_return');
video_return.onclick=function(){
    location.href=`./course_description.html?course_id=${condition.course_id}`
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

var show_left = document.querySelector('#show_left');//work图标
var show_comment = document.querySelector('#show_comment');//comment的img
var left_nav = document.querySelector('#left_nav');//左侧区域
var right_content = document.querySelector('#right_content');//右侧区域
var comment_area = document.querySelector('#comment_area');//评论区
var btn_close = document.querySelector('#btn_close');//关闭按钮
var top_title = document.querySelector('#top_title');//顶端标题
var article_area = document.querySelector('#article_area');//文章显示的div
var comment_inner_area = document.querySelector('#comment_inner_area');//问题显示的区域




var url = ip_config+"/courseWare";
var course_name = document.querySelector('#course_name');//课程名

//读取数据写入课程名
(function () {
    let server = url + '/courseName';

    ajax(server, condition, 'get', null, function (result) {
        let course_id = result.course_id;
        if (result) {
            course_name.innerHTML = `
                     <p class="h3_name" id="${result.course_id}course">${result.course_name}</p>
            `;
        }
        show_chapter_ware(course_id);
    })
})();

//显示课程的章节与小节内容
function show_chapter_ware(course_id) {
    let server = url + '/getWare';
    let show_list_ul = document.querySelector('#show_list_ul');

    let date = {
        course_id: course_id
    };
    ajax(server, date, 'get', null, function (result) {
        if (result) {
            for (let item of result) {
                show_list_ul.innerHTML += `
                    <li>
                            <div class="whole_row">
                                <i class="img_icon">
                                    <img src="./icon/right.svg" alt="">
                                </i>
                                <a href="javascript:void 0" class="a_title">${item.chapter_name}</a>
                            </div>  
                            <ul class="p_d_list" id="${item.chapter_id}chapter">
                            </ul>
                    </li> 
            `;

            }
            for (let item of result) {
                var that = `${item.chapter_id}chapter`;
                var text = document.getElementById(that);
                for (let item_ware of item.ware_name) {
                    text.innerHTML += `
                        <li id="${item_ware.ware_id}">
                            <div class="whole_row">
                                <a href="javascript:void 0" class="b_title">${item_ware.ware_name}</a>
                            </div>
                        </li>
                    `;
                }
            }
            pull_list();
        }
    })
};

//下拉列表函数
function pull_list() {
    var img_icon = document.querySelectorAll('.img_icon');

    //单击出现下拉列表
    for (let item of img_icon) {
        item.onclick = function () {
            let img = item.firstElementChild;
            let show = item.parentElement.nextElementSibling;
            if (show.className == 'active') {
                show.className = 'p_d_list';
                img.src = './icon/right.svg'
            } else {
                show.className = 'active';
                img.src = './icon/down.svg'
            }
            var active_li = document.querySelectorAll('.active');
            click_ware(active_li);
        }
    }
    ;
};

//单击小标题的li返回他的id
function click_ware(active_li) {
    for (let item of active_li) {
        item.onclick = function (event) {
            let wh_div = event.target.parentElement.parentElement;
            let li_id = event.target.parentElement.parentElement;
            if (this != event.target && wh_div != this) {
                var ware_id = li_id.id;
                show_ware(ware_id);//显示文章
                show_question(ware_id);//显示问题
                sub_question(ware_id);//提交问题
            }
        }
    }
};

//显示文章
function show_ware(ware_id) {
    let date = {
            ware_id: ware_id
        }
    ;
    let server = url + '/getWareContent';

    ajax(server, date, 'get', null, function (result) {
        if (result) {
            top_title.innerHTML = `
                ${result.name}
            `;
            article_area.innerHTML = `
                ${result.content}
            `
        }
    })
};

//显示问题
function show_question(ware_id) {
    let date = {
            ware_id: ware_id
        }
    ;
    let server = url + '/getWareQuestion';
    ajax(server, date, 'get', null, function (result) {
        if (result) {
            console.log(result);
            comment_inner_area.innerHTML='';
            for (let item of result) {
                comment_inner_area.innerHTML += `
                <div class="review" id="${item.id}que">
                            <div class="up_review">
                                <div class="left_img">
                                    <img src="${img_config}/${item.icon_img}" alt="" class="heard_img">
                                </div>
                                <div class="right_info">
                                    <div class="up_name">
                                        <sapn>${item.user_name}</sapn>
                                    </div>
                                    <div class="down_content">
                                        <p>${item.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="down_review">
                                <p>${item.qc_date}</p>
                            </div>
                    </div>`;
            }
            /*  左右两侧等高 */
            let left_height=left_nav.offsetHeight;
            let right_height=right_content.offsetHeight;
            left_nav.style.height=Math.max(left_height,right_height)+"px";
            right_content.style.height=Math.max(left_height,right_height)+"px";

            // ***********
        }
    })
}


//单击show_left左侧隐藏
show_left.onclick = function () {
    if (left_nav.className == 'left_nav') {
        left_nav.classList.add('no_active');
        right_content.classList.add('right_all');
    } else {
        left_nav.classList.remove('no_active');
        right_content.classList.remove('right_all');
    }
};

//单击show_comment显示评论区
show_comment.onclick = function () {
    comment_area.style.display = 'block';
};

//单击btn_close关闭评论区
btn_close.onclick = function () {
    comment_area.style.display = 'none';
};

//模态框功能
var btn_release = document.querySelector(".btn_release");//显示模态框按钮
var panel = document.querySelector("#panel");//底部遮挡面板
var close = document.querySelector("#close");//关闭按钮
var btn_sub = document.querySelector('#btn_sub');//提交按钮
var content_eva = document.querySelector('#content_eva');//提交区域

//单击发按钮
btn_release.onclick = function () {
    panel.style.display = "block";
};

//单击关闭按钮
close.onclick = function () {
    panel.style.display = "none";
};



//发布问题
function sub_question(ware_id) {
    let user_id=condition.user_id;
    let date={
        user_id:user_id,
        ware_id:ware_id,
    };
    //单击上传按钮获取数据
    btn_sub.onclick = function () {
        let text = content_eva.value;
        date.content=text;
        panel.style.display = "none";
        content_eva.value = '';
        add_question_date(date);
    };
}

//发布问题:上传数据函数
function add_question_date(date) {
    let server = url + '/addWareQuestion';

    ajax(server, date, 'get', null, function (result) {
        show_question(date.ware_id);
        // if (result.code == '1007') {
        //     console.log(result.description);
        // } else {
        //     console.log(result.description);
        // }
    })
};





