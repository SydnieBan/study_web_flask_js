'use strict';
window.onload = function () {
    var user={
        "id":JSON.parse(window.sessionStorage.getItem("id")),
        "tel":JSON.parse(window.sessionStorage.getItem("tel"))
    };
    //********************** header ********************************
    /* 点击跳到主页 */
    var logo_img=document.querySelector('header .header .header_left .logo_img div');
    logo_img.onclick=function () {
        location.reload();
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
    /* 轮播图按钮 */
    var login_btn=document.querySelector('#login_btn');
    var login_two_img=document.querySelector('.login-two a');
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
                    document.querySelector('.login-four').style.display='none';
                    if(res.icon_img)
                        login_yes.firstElementChild.src=`${img_config}/${res.icon_img}`;
                    /* 轮播图右侧头像 */
                    // login_two_img.href=`./my.html?user_id=${user.id}`;
                    login_two_img.href=`./my.html`;
                    if(res.icon_img)
                        login_two_img.firstElementChild.src=`${img_config}/${res.icon_img}`;
                    /* 轮播图右侧按钮 */
                    login_btn.value="我的课程";
                    login_btn.onclick=function () {
                        // location.href=`./my.html?user_id=${user.id}`;
                        location.href=`./my.html`;
                    };
                }else{
                    login_no.style.display='block';
                    login_yes.style.display='no';
                    /* 轮播图左侧头像 */
                    login_two_img.href="./login.html";
                    /* 轮播图左侧按钮 */
                    login_btn.value="登 录";
                    login_btn.onclick=function () {
                        location.href="./login.html"
                    };
                    document.querySelector('.login-four').style.display='block';
                }
            })
        } else{
            login_no.style.display='block';
            login_yes.style.display='no';
            /* 轮播图左侧头像 */
            login_two_img.href="./login.html";
            /* 轮播图左侧按钮 */
            login_btn.value="登 录";
            login_btn.onclick=function () {
                location.href="./login.html"
            };
            document.querySelector('.login-four').style.display='block';
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
    //************************** main ******************************

    /* 轮播图左侧 */
    var dis_line=document.querySelectorAll('.dis-li');
    for (let item of dis_line){
        item.onmouseover=function () {
            item.children[1].style.display='block';
        };
        item.onmouseout=function () {
            item.children[1].style.display='none';
        }
    }
    var dis_line_sect_item=document.querySelectorAll('.sect-one-a .item-one');
    for (let item of dis_line_sect_item){
        let con=item.firstElementChild.firstElementChild.firstElementChild.innerText;
        let server=ip_config+'/course/types/';
        ajax(server,{direction:con},'GET',null,function (res) {
            let obj=item.firstElementChild.nextElementSibling.firstElementChild;
            obj.innerHTML='';
            for (let j of res){
                obj.innerHTML+=`
                    <li>${j.name}</li>
                `;
            }
            let per_li=document.querySelectorAll('.item-one-mid li');
            for (let itej of per_li){
                itej.onclick=function () {
                    location.href=`./course.html?direction=${itej.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText}&type=${itej.innerText}`;
                }
            }
        })
    }


    /* 轮播图 */
//从数据库获取，
    var img_list=[
        {"img_url":"/images/hoom_top1.png","link":"http://localhost:63343/ws_study_web/course_description.html?course_id=242"},
        {"img_url":"/images/hoom_top2.png","link":"http://localhost:63343/ws_study_web/course_description.html?course_id=266"},
        {"img_url":"/images/hoom_top3.png","link":"http://localhost:63343/ws_study_web/course_description.html?course_id=228"},
        {"img_url":"/images/hoom_top4.png","link":"http://localhost:63343/ws_study_web/course_description.html?course_id=237"}
    ];
    var index=-1;
    var my_img=document.getElementById('som_adb_img');
    var my_link=document.getElementById('som_adb_link');
    var left_img=document.getElementById('som_adb_left_img');
    var right_img=document.getElementById('som_adb_right_img');
    var ul_list=document.getElementById('som_adb_ul_list');

    //添加4个i结点
    for (var i = 0; i < 4; i++) {
        ul_list.innerHTML += `<li class="dic_li"><i id="${i}"></i></li>`
    }

    //显示图片轮播函数
    function show_img() {
        index++;
        index<0?index=3:index;
        //图片的地址
        my_img.src=img_config+img_list[index%4].img_url;
        my_link.href=img_list[index%4].link;
        //按钮随图片改变而改变
        var that=`${index%4}`
        var x=document.getElementById(that);
        x.style.background='black';
        //调用方法改变改结点的所有兄弟结点的颜色
        show_ul_list(x);
    }

    show_img();

    //开启循环
    var inter=setInterval(show_img,1000);

    //鼠标移动到ul上
    ul_list.onmouseover=function () {
        clearInterval(inter);
    }

    //单机i结点事件，跳转到相应的图片
    ul_list.onclick=function(event){
        let obj=event.target;
        if (this != obj&& this !=obj.parentElement) {
            index=+(event.target.id)-1;
            show_img();
        }
    }

    //鼠标移动到图片
    my_img.onmouseover=function () {
        clearInterval(inter);
    }

    //鼠标离开图片
    my_img.onmouseout=function () {
        clearInterval(inter);//先清空
        inter=setInterval(show_img,1000);
    }

    //鼠标移动右按钮上面
    right_img.onmouseover=function(){
        clearInterval(inter);
    };

    //单机右按钮事件
    right_img.onclick=function () {
        show_img();
        // console.log('ok');
    };

    //鼠标移动左按钮上面
    left_img.onmouseover=function(){
        clearInterval(inter);
    };

    //单机左按钮事件
    left_img.onclick=function () {
        index-=2;
        show_img();
    };

    //按钮改变图片
    function show_ul_list(obj) {
        var pre=previousElementSiblings(obj);
        var nex=nextElementSiblings(obj);
        for (let item of pre) {
            item.style.background='white';
        }
        for (let item of nex) {
            item.style.background='white';
        }
    }

    //找到item前所有兄弟结点,返回一个结点列表
    function previousElementSiblings(item) {
        var list=[];
        function f(item) {
            var res_par_pre=item.parentElement.previousElementSibling;
            if (res_par_pre){
                var res=res_par_pre.firstElementChild;
                list.push(res);
                return f(res);
            }
            return list;
        }
        return f(item);
    }

    //找到item后所有兄弟结点,返回一个结点列表
    function nextElementSiblings(item) {
        var list=[];
        function f(item) {
            var res_par_next=item.parentElement.nextElementSibling;
            if (res_par_next) {
                var res=res_par_next.firstElementChild;
                list.push(res);
                return f(res);
            }
            return list;
        }
        return f(item);
    }

    // var login_btn=document.querySelector('#login_btn');
    // login_btn.onclick=function () {
    //     location.href="./login.html"
    // };


    //*******************新手入门
    var freecourse = document.querySelector('.sect-two-bottom-right-up');
    var two_top_bottom=document.querySelector('.two-top-bottom');
    two_top_bottom.onclick=function () {
        location.href='./course_free.html'
    };

    //拿到免费新手课程
    function get_courses() {
        let server = ip_config + '/home/newcourses/';
        ajax(server, null, 'GET', null, function (res) {
            show_course(res);
        });
    }

    get_courses();

    // 显示新手课程
    function show_course(courses) {
        freecourse.innerHTML = '';
        for (let item of courses) {
            freecourse.innerHTML += `
               <div class="up-one" id="${item.cid}">
                    <div><img src="${img_config}/images/course${item.course_icon}" alt="" ></div>
                     <div class="up-one-bottom">
                           <div class="fi">${item.cname}</div>
                           <div class="fir">${(item.integral = 0) ? '所需积分为：' + item.integral : '免费'}</div>
                     </div>
               </div>
            `;
        }
        var two_up_one=document.querySelectorAll('.sect-two-bottom-right-up .up-one');
        for (let item of two_up_one){
            item.onclick=function () {
                location.href='./course_description.html'+'?course_id='+item.id;
            }
        }
    }

    // ****************新上好课
    var good_course = document.querySelector('.sect-three-bottom-right-up');
    var three_top_bottom=document.querySelector('.three-top-bottom');
    three_top_bottom.onclick=function () {
        location.href='./course_unique.html'
    };

    //拿到新上课程
    function get_goodcourses() {
        let server = ip_config + '/home/good_courses/';
        ajax(server, null, 'GET', null, function (res) {
            show_goodcourse(res);
        });
    }

    get_goodcourses();

    // 显示新上课程
    function show_goodcourse(courses) {
        good_course.innerHTML = '';
        for (let i = 0; i < courses.length; i++) {
            good_course.innerHTML += `

               <div class="up-one" id="${courses[i].cid}">
                    <div><img src="${img_config}/images/course${courses[i].course_icon}" alt="" ></div>
                     <div class="up-one-bottom">
                           <div class="fi">${courses[i].cname}</div>
                            <div class="fir">${(courses[i].integral > 0) ? '所需积分为：' + courses[i].integral : '免费'}</div>
                     </div>
               </div>
            `;
        }
        var three_up_one=document.querySelectorAll('.sect-three-bottom-right-up .up-one');
        for (let item of three_up_one){
            item.onclick=function () {
                location.href='./course_description.html'+'?course_id='+item.id;
            }
        }
    }

    // ********************精品课程
    var four_top_bottom=document.querySelector('.four-top-bottom');
    four_top_bottom.onclick=function () {
        location.href='./course_unique.html'
    };

    //拿到精品课程
    function get_nicecourses() {
        let server = ip_config + '/home/head_unique/';
        ajax(server, null, 'GET', null, function (res) {
            show_nicecourse(res);
        });
    }

    get_nicecourses();

    //显示精品课程
    function show_nicecourse(courses) {
        //精品课程
        var nice_course = document.querySelector('.sect-four-bottom-right-up');
        nice_course.innerHTML='';
        for (var i = 0; i < courses.length; i++) {
            nice_course.innerHTML += `
               <div class="up-one" id="${courses[i].cid}">
                    <div><img src="${img_config}/images/course${courses[i].course_icon}" alt="" ></div>
                     <div class="up-one-bottom">
                           <div class="fi">${courses[i].cname}</div>
                            <div class="fir">${(courses[i].integral > 0) ? '所需积分为：' + courses[i].integral : '免费'}</div>
                     </div>
               </div>
            `;
        }
        var four_up_one=document.querySelectorAll('.sect-four-bottom-right-up .up-one');
        for (let item of four_up_one){
            item.onclick=function () {
                location.href='./course_description.html'+'?course_id='+item.id;
            }
        }
    }

    // *****************技术提升
    var five_top_bottom=document.querySelector('.five-top-bottom');
    five_top_bottom.onclick=function () {
        location.href='./course.html'
    };

    //拿到技术提升课程
    function get_skillcourses() {
        let server = ip_config+'/home/promote/';
        ajax(server, null, 'GET', null, function (res) {
            show_skillcourse(res);
        });
    }

    get_skillcourses();
    //显示技术提升课程
    function show_skillcourse(courses) {
        //技术提升课程
        var skill_course = document.querySelector('.sect-five-bottom-right-up');
        skill_course.innerHTML='';
        for (var i = 0; i < courses.length; i++) {
            skill_course.innerHTML += `
               <div class="up-one" id="${courses[i].cid}">
                    <div><img src="${img_config}/images/course${courses[i].course_icon}" alt=""></div>
                     <div class="up-one-bottom">
                           <div class="fi">${courses[i].cname}</div>
                            <div class="fir">${courses[i].difficulty}</div>
                     </div>
               </div>
            `;
        }
        var five_up_one=document.querySelectorAll('.sect-five-bottom-right-up .up-one');
        for (let item of five_up_one){
            item.onclick=function () {
                location.href='./course_description.html'+'?course_id='+item.id;
            }
        }
    }


    //拿到实战课程

    function get_combatcourses() {
        let server = ip_config+'/home/combat/';
        ajax(server, null, 'GET', null, function (res) {
            show_combatcourse(res);
        });
    }

    get_combatcourses();
    //显示实战课程
    function show_combatcourse(courses) {
        //实战课程
        var combat_course = document.querySelector('.sect-six-bottom-right-up');
        combat_course.innerHTML='';
        for (var i = 0; i < courses.length; i++) {
            combat_course.innerHTML += `
               <div class="up-one" id="${courses[i].cid}">
                    <div><img src="${img_config}/images/course${courses[i].course_icon}"></div>
                     <div class="up-one-bottom">
                           <div class="fi">${courses[i].cname}</div>
                            <div class="fir">${courses[i].difficulty}</div>
                     </div>
               </div>
            `;
        }
        var six_up_one=document.querySelectorAll('.sect-six-bottom-right-up .up-one');
        for (let item of six_up_one){
            item.onclick=function () {
                location.href='./course_description.html'+'?course_id='+item.id;
            }
        }
    }

    // 教师读取及动画
    var sect_seven_two_up=document.querySelector('.sect-seven-two-up');
    var sect_seven_two_bottom=document.querySelector('.sect-seven-two-bottom');
    (function get_teacher() {
        let server=ip_config+'/home/teacher/';
        ajax(server,null,'GET',null,function (res) {
            sect_seven_two_up.innerHTML+=``;
            sect_seven_two_bottom.innerHTML+=``;
            for (let i=0;i<5;i++){
                sect_seven_two_up.innerHTML+=`
                    <div class="up-up">
                            <ul>
                                <li class="move-img" id="moveimg1">
                                    <img src="${img_config}/images/${res[i].icon_img}" alt="" class="img_style_01">
                                    <div class="teacher_info">
                                        <h3>${res[i].name}</h3>
                                        <p>${res[i].identity}</p>
                                    </div>
                                    <p class="text_info" style="float: right">&nbsp;&nbsp;&nbsp;&nbsp;${res[i].introduce}</p>
                                </li>
                            </ul>
                       </div>
                `;
            }
            for (let j=5;j<10;j++){
                sect_seven_two_bottom.innerHTML+=`
                    <div class="up-up">
                            <ul>
                                <li class="move-img" id="moveimg1">
                                    <img src="${img_config}/images/${res[j].icon_img}" alt="" class="img_style_01">
                                    <div class="teacher_info">
                                        <h3>${res[j].name}</h3>
                                        <p>${res[j].identity}</p>
                                    </div>
                                    <p class="text_info" style="float: right">&nbsp;&nbsp;&nbsp;&nbsp;${res[j].introduce}</p>
                                </li>
                            </ul>
                        </div>
                `;
            }

            //教师动画
            var move=document.querySelectorAll('.up-up');
            for (let item of move){
                let img_01=item.querySelector('img');
                let div_info=item.querySelector('div');
                let text_info=item.querySelector('.text_info');
                item.onmouseover=function () {
                    img_01.className="img_style";
                    div_info.className="teacher_info_change";
                    text_info.style.display='block';
                };
                item.onmouseout=function () {
                    img_01.className="img_style_01";
                    div_info.className="teacher_info";
                    text_info.style.display='none';
                }
            }

        })
    })();

    /* 签到 */
    var check_in=document.querySelector('.return-top .return-top-up p');
    check_in.onclick=function () {
        if (check_in.classList.contains('uncheck')){
            let server=ip_config+'/user/check_in/';
            /* 判断是否有sessionStorage */
            ajax(server,user,'GET',null,function (res) {
                if (res.code=='1016') {
                    check_in.style.color='black';
                    check_in.style.cursor='default';
                    check_in.classList.remove('uncheck');
                }else{
                    location.href='./login.html'
                }
            })
        }
    };

    /* 返回顶部 */
    var app=document.querySelector('.return-top-down');
    // var t1=0;
    app.onclick=function () {
        // window.scrollTo(0,0);//直接返回顶部
        var scroll=document.documentElement.scrollTop || document.body.scrollTop;
        // alert(scroll)
        // if (scroll>200&&scroll>t1){
        //     app.style.display='none';
        // }else{
        //     app.style.display='block';
        // }
        // t1=scroll

        var inter=setInterval(()=> {
            scroll-=100;
            window.scrollTo(0,scroll);
            if (scroll<=0){
                clearInterval(inter);
            }

        },1)
    };

};

