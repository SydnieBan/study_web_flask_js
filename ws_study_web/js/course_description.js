
var url = ip_config+"/courseDetails";

var user={
    "id":JSON.parse(window.sessionStorage.getItem("id")),
    "tel":JSON.parse(window.sessionStorage.getItem("tel"))
};

//课程id
var condition = {
    course_id: '',
    user_id: JSON.parse(window.sessionStorage.getItem("id")),
    isCollection: 0,
    is_select_course:0
};

condition.course_id=location.search.slice(1).split('=')[1];

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
        location.reload();
    }
})();
//**************************************************************
//**************************************************************




var work_list = document.querySelector('#work_list');//视频，章节，评论列表ul

var course_video = document.querySelector('#course_video');//视频章节li
var course_ware = document.querySelector('#course_ware');//课件章节li
var course_evaluate = document.querySelector('#course_evaluate');//评价li

var chapters = document.querySelector('#chapters');//show视频div
var ware = document.querySelector('#ware');//show章节div
var evaluate = document.querySelector('#evaluate');//show评论div

var collection = document.querySelector('#collection');//收藏ul

var is_free = document.querySelector('#is_free');//是否免费button
var introduce = document.querySelector('#introduce');//介绍p
var btn_release = document.querySelector('#btn_release');//发布评论按钮

var token = window.localStorage.getItem('token');//获取token

var title_back=document.querySelector('#title_back');//标题背景图片

//判断用户是否收藏过该课程
(function () {
    let img=collection.firstElementChild.firstElementChild;
    if (token) {
        ajax(url+'/iscollection/',{"user_id":user['id'],"course_id":condition.course_id},'GET',null,function (res) {
            condition.isCollection=res["iscollection"];//获取用户是否收藏该课程
            if (condition.isCollection==1){
                img.src="./logo/yes_collection.svg"
            } else {
                img.src="./logo/collection.svg"
            }
        });
    }
})();

//获取课程方向，分类，课程名，
(function () {
    let nav_info = document.querySelector('#nav_info');
    let min_top = document.querySelector('#min_top');
    let difficult = document.querySelector('#difficult');
    let notice = document.querySelector('#notice');
    let show_img = document.querySelector('#show_img');
    // let is_free=document.querySelector('#is_free');

    let server = url + '/courseInfo';
    ajax(server, condition, 'get', null, function (result) {
        //写入课程方向，分类，课程名
        nav_info.innerHTML = `
        <li><a href="javascript:void 0" id="redirect">课程</a></li>
        <li><span> \\ </span></li>
        <li><a href="javascript:void 0" id="redirect_direction">${result.direction}</a></li>
        <li><span> \\ </span></li>
        <li><a href="javascript:void 0" id="redirect_type">${result.type}</a></li>
        <li><span> \\ </span></li>
        <li><a href="javascript:void 0" id="this_page">${result.cname}</a></li>
        `;

        nav_info.querySelector('#redirect').onclick=function(){
            location.href='./course.html'
        };
        nav_info.querySelector('#redirect_direction').onclick=function(){
            location.href=`./course.html?direction=${result.direction}`;
        };
        nav_info.querySelector('#redirect_type').onclick=function(){
            location.href=`./course.html?direction=${result.direction}&type=${result.type}`;
        };
        nav_info.querySelector('#this_page').onclick=function(){
            location.reload();
        };

        //写入大标题
        min_top.innerHTML = `
        <h1>${result.cname}</h1>
        `;

        //写入课程图片
        show_img.innerHTML = `
            <img src="${img_config}/images/course${result.course_icon}" >
        `

        //写入难度
        difficult.innerHTML = `
        难度：${result.difficulty}
        `;

        //写入简介
        introduce.innerHTML = `
        ${result.introduce}
        `;

        //写入课程须知
        notice.innerHTML = `
        ${result.notice}
        `;
        // *********************判断用户是否选择课程*********************
        ajax(url+'/is_select_course/',{"user_id":user.id,"course_id":condition.course_id},'GET',null,function (res) {
            condition.is_select_course=res["is_select_course"];//获取用户是否收藏该课程
            if (condition.is_select_course==1){
                is_free.innerHTML = `
                    <input type="button" value="已参与，进入学习" >
                 `;
            } else {
                //判断课程是否免费
                if (result.integral) {
                    is_free.innerHTML = `
                    <input type="button" value="${result.integral}积分兑换" >
                    `;
                } else {
                    is_free.innerHTML = `
                    <input type="button" value="进入学习">
                        `;
                }
                is_free.firstElementChild.classList.add('input_hover');
            }
        });

        // ***************************************************
    })


})();

//获取课程选择人数
(function () {
    let select_num = document.querySelector('#select_num');

    let server = url + '/selectNum';
    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            select_num.innerHTML = `
            学习人数：${result.select_num}
            `
        }
    })
})();

//获取课程收藏人数
(function () {
    let collect_num = document.querySelector('#collect_num');

    let server = url + '/collectionNum';
    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            collect_num.innerHTML = `
            收藏量：${result.collection_num}
            `
        }
    })
})();

get_video();

// 显示课程视频总章节和小章节
function get_video() {
    let server = url + '/getVideo';
    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            let video = result.pop();//返回视频的时间
            let video_time = video.sum_date;
            for (let item of result) {
                chapters.innerHTML += `
                    <div class="chapter" id="${item.chapter_id}video">
                        <h3>${item.chapter_name}</h3>
                    </div>`;
            }
            for (let item of result) {
                var that = `${item.chapter_id}video`;
                var text = document.getElementById(that);
                for (let item_video of item.video_name) {
                    text.innerHTML += `
                    <div class="section" id="${item_video.video_id}">${item_video.video_name}</div>

                    `
                }
            }
            let video_section=document.querySelectorAll('#chapters .chapter .section');
            for (let sitem of video_section){
                sitem.onclick=function () {
                    location.href=`./video.html?course_id=${condition.course_id}&video_id=${sitem.id}`;

                    // # ************************************************************************
                    // # *************** 点击视频，添加 user_video ******************************
                    ajax(ip_config+'/courseDetails/add_user_video/',{"video_id":sitem.id,"user_id":user.id},'GET',null,function (res) {
                        if (res.code=='1030'){
                            // alert('添加user_video成功')
                        } else{
                            // alert('添加user_video失败')
                        }
                    });
                }
            }
            get_course_ware(video_time);
        }
    })
}

// 显示课程课件总章节和小章节，默认隐藏
function get_course_ware(video_time) {
    let server = url + '/getWare';
    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            let ware_t = result.pop();//返回视频的时间
            let ware_time = ware_t.sum_date;
            for (let item of result) {
                ware.innerHTML += `
                    <div class="chapter" id="${item.chapter_id}ware">
                        <h3>${item.chapter_name}</h3>
                    </div>`;
            }
            for (let item of result) {
                var that = `${item.chapter_id}ware`;
                var text = document.getElementById(that);
                for (let item_ware of item.ware_name) {
                    text.innerHTML += `
                    <div class="section" id="${item_ware.ware_id}">${item_ware.ware_name}</div>
                    `
                }
                let courseware_section=document.querySelectorAll('#ware .chapter .section');
                for (let sitem of courseware_section){
                    sitem.onclick=function () {
                        location.href=`./courseware.html?course_id=${condition.course_id}&courseware_id=${sitem.id}`;
                        // # ************************************************************************
                        // # *************** 点击课件，添加 user_courseware ******************************
                        ajax(ip_config+'/courseDetails/add_user_courseware/',{"courseware_id":sitem.id,"user_id":user.id},'GET',null,function (res) {
                            if (res.code=='1030'){
                                // alert('添加user_courseware成功')
                            } else{
                                // alert('添加user_courseware失败')
                            }
                        });
                    }
                }

            }
            get_all_time(video_time, ware_time);
        }
    })
};

//显示课程评论，默认隐藏
(function () {
    let server = url + '/courseEvaluation';
    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            for (let item of result) {
                evaluate.innerHTML += `
            <div class="chapter" id="${item.id}eva">
                      <div class="user_info">
                              <div class="user_img">
                                   <img src="${img_config}/${item.icon_img}" alt="">
                              </div>
                              <div class="user_name">${item.user_name}</div>
                      </div>
                      <div class="content"><span>${item.content}</span></div>
            </div>
            `;
            }
        }
    })
})();

// 显示完成这门课程所需的时间
function get_all_time(video_time, ware_time) {
    let learn_time = document.querySelector('#learn_time');
    let sum_time = +video_time + (+ware_time);
    show_learn_time(sum_time);
    let hour = parseInt(sum_time / 3600);
    let minute = parseInt((sum_time % 3600) / 60);

    learn_time.innerHTML = `
    时长:${hour}分钟${minute}
    `
};

//显示已完成的课程进度
function show_learn_time(sum_time){
    let server = url + '/getStudyLearn';
    let alr_learn=document.querySelector('#alr_learn');
    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            let already_learn=parseInt(result.all_date);
            let percentage;
            if (sum_time)
                percentage=parseInt((already_learn/sum_time)*100);
            else
                percentage=0;
            alr_learn.innerHTML=`
            <h2>已学${percentage}%</h2>
            <meter max="100" min="0" value="${percentage}" style="border-radius: 20px;width:250px;margin-left: 30px;margin-top: 10px"></meter>
            `
        }
    })
};

//单击视频，章节，用户评价显示选中效果功能
work_list.onclick = function (event) {
    let obj = event.target;
    let pre = previousElementSiblings(obj);
    let nex = nextElementSiblings(obj);
    if (obj != this && obj.parentElement != this) {
        obj.className = 'a_style';
        for (let item of pre) {
            item.className = ''
        }
        for (let item of nex) {
            item.className = ''
        }
        //实现单击分栏显示不同的数据
        let res = obj.parentElement.id;
        if (res == 'course_video') {
            chapters.style.display = 'block';//视频显示
            ware.style.display = 'none';//课件隐藏
            evaluate.style.display = 'none';//评论隐藏
            introduce.style.display = 'block';//介绍显示
            btn_release.style.display = 'none';//发布按钮隐藏
        } else if (res == 'course_ware') {
            chapters.style.display = 'none';//视频隐藏
            ware.style.display = 'block';//课件显示
            evaluate.style.display = 'none';//评论隐藏
            introduce.style.display = 'block';//介绍显示
            btn_release.style.display = 'none';//发布按钮隐藏
        } else if (res == 'course_evaluate') {
            chapters.style.display = 'none';//视频隐藏
            ware.style.display = 'none';//课件隐藏
            evaluate.style.display = 'block';//评论显示
            introduce.style.display = 'none';//介绍隐藏
            btn_release.style.display = 'block';//发布按钮显示
        }


    }
};

//单击收藏图标
collection.onclick = function () {
    let img = this.firstElementChild.firstElementChild;
    if (condition.isCollection) { // 已收藏,单击取消
        delCollection();
    } else { // 未收藏,单击收藏
        addCollection();
    }
};

// 添加收藏功能
function addCollection() {
    let img=collection.firstElementChild.firstElementChild;
    let server = url + '/addCollect';
    ajax(server, {"user_id":user.id,"course_id":condition.course_id}, 'get', null, function (result) {
        if (result.code == '1007') {
            img.src = "./logo/yes_collection.svg";
            condition.isCollection = 1;
        }
    })
}

//取消收藏功能
function delCollection() {
    let img=collection.firstElementChild.firstElementChild;
    let server = url + '/delCollect';
    ajax(server, {"user_id":user.id,"course_id":condition.course_id}, 'get', null, function (result) {
        if (result.code == '1008') {
            img.src = "./logo/collection.svg";
            condition.isCollection = 0;
        }
    })
}

//单击开始学习按钮
is_free.onclick = function () {
    if (condition.is_select_course==0) {
        let need_integral=0;
        if (is_free.firstElementChild.value=='进入学习')  need_integral=0;
        else need_integral = parseInt(is_free.firstElementChild.value);//所需积分
        addCourse(need_integral);
    }
};
//用户添加课程功能
function addCourse(need_integral) {
    if (need_integral==0){ // 免费,则直接选课
        ajax(url+'/addCourse_free/', {"user_id":user.id,"course_id":condition.course_id}, 'get', null, function (result) {
            if (result.code == '1023') {
                        is_free.innerHTML = `
                        <input type="button" value="已参与,进入学习" style="background: #6cadff;">
                    `;
            } else {
                alert('添加免费课程失败')
            }
        })
    } else{ // 不免费,判断
        //先判断积分是否够，扣除积分 + 添加课程 原子操作
        ajax(url+'/get_user_integral/',{"user_id":user.id},'GET',null,function (res) {
            if (res && res.hasOwnProperty("sum_integral")){ // 获取用户积分成功

                if (res.sum_integral>=need_integral){ // 用户积分够
                    ajax(url+'/addCourse_unique/',{"user_id":user.id,"course_id":condition.course_id,"need_integral":need_integral},'GET',null,function (res) {
                        if (res && res.code=='1022'){
                            // alert('添加积分课程成功')
                            is_free.innerHTML = `
                                <input type="button" value="已参与,进入学习" style="background: #6cadff;">
                            `;
                        } else{
                            alert('添加积分课程失败')
                        }
                    })

                } else{ // 用户积分不够
                    confirm('积分不够,请获得更多积分后再进入学习');
                }
            } else{ // 获取用户积分失败
                alert('获取用户积分失败')
            }
        });
    }
}

// 不在一个父节点下
//找到item前所有兄弟结点,返回一个结点列表
function previousElementSiblings(item) {
    var list = [];

    function f(item) {
        var res_par_pre = item.parentElement.previousElementSibling;
        if (res_par_pre) {
            var res = res_par_pre.firstElementChild;
            list.push(res);
            return f(res);
        }
        return list;
    }

    return f(item);
};

//找到item后所有兄弟结点,返回一个结点列表
function nextElementSiblings(item) {
    var list = [];

    function f(item) {
        var res_par_next = item.parentElement.nextElementSibling;
        if (res_par_next) {
            var res = res_par_next.firstElementChild;
            list.push(res);
            return f(res);
        }
        return list;
    }

    return f(item);
};

//推荐课程
(function () {
    let ci_right_recommend = document.querySelector('.ci_right_recommend');

    let server = url + '/courseRecommended/';

    ajax(server, condition, 'get', null, function (result) {
        if (result) {
            for (let item of result) {
                if (item.integral) {
                    ci_right_recommend.innerHTML += `
                    <div class="recommend_course" id="${item.id}course">
                        <div class="img">
                            <img src="http://pxebavmp1.bkt.clouddn.com/images/teacher${item.course_icon}" class="img_icon" alt="">
                        </div>
                        <div class="text">
                            <p>${item.course_name}</p>
                            <p>${item.dif_name} | ${item.integral}积分兑换</p>
                        </div>
                    </div>
                `;
                }else {
                    ci_right_recommend.innerHTML += `
                    <div class="recommend_course" id="${item.id}course">
                        <div class="img">
                            <img src="./course_img/${item.course_icon}" alt="">
                         </div>
                        <div class="text">
                            <p>${item.course_name}</p>
                            <p>${item.dif_name} | 免费</p>
                        </div>
                    </div>
                `;
                }
                /* 跳转到具体详情页 */
                var recommend_course=document.querySelectorAll('.recommend_course');
                for (let item of recommend_course){
                    item.onclick=function () {
                        location.href=`./course_description.html?course_id=${parseInt(item.id)}`
                    }
                }
            }
        }
    })
})();

//模态框事件
// var btn_release=document.querySelector("#btn_release");
var panel = document.querySelector("#panel");//中心面板
var close = document.querySelector("#close");//关闭按钮
var btn_sub = document.querySelector('#btn_sub');//提交按钮
var content_eva = document.querySelector('#content_eva');//textarea的内容

//单击显示发布按钮事件
btn_release.onclick = function () {
    panel.style.display = "block";
};

//单击关闭按钮事件
close.onclick = function () {
    panel.style.display = "none";
};

//单击发布按钮事件
btn_sub.onclick = function () {
    let text = content_eva.value;
    addEvaluation(text);
    panel.style.display = "none";
    content_eva.value = '';
    //页面刷新
    location.reload();
};

//添加评论事件
function addEvaluation(text) {
    condition.content=text;

    let server = url + '/addEvaluation';
    ajax(server, condition, 'get', null, function (result) {
        if (result.code == '1006') {
            // console.log(result.description);
        } else {
            // console.log(result.description);
        }
    })
};
