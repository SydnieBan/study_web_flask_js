"use strict";
window.onload=function () {
    var user={
        "id":JSON.parse(window.sessionStorage.getItem("id")),
        "tel":JSON.parse(window.sessionStorage.getItem("tel"))
    };
    // 筛选条件
    var condition={
        integral:1,
        direction:'',
        classify:'',
        difficulty:'',
        page:1,
        // page_items:5, // 一页多少个课程
        page_items:30, // 一页多少个课程
        flag:0 // flag==0 时间降序；flag==1 选课人数；flag==2 收藏量
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

    var direction_content=document.querySelector('.direction .content ul'); /* 方向 */
    var classify_content=document.querySelector('.classify .content ul'); /* 分类 */
    var difficulty_content=document.querySelector('.difficulty .content ul'); /* 难度 */
    var dis_article=document.querySelector('.dis_article');/* 课程 */
    var dis_page=document.querySelector('.dis_page ul');/* 页码 */
    var classify=document.querySelector('.classify');
    var classify_copy=document.querySelector('.classify_copy');

    // *************************【页面刚一打开：】***************************************
    // 获取到全部方向
    (function () {
            let server=ip_config+'/course/directions/';
            ajax(server,null,'GET',null,function (res) {
                show_dirction(res)
            })
        }
    )();
    // 获取到全部分类
    get_classifys();
    // 显示全部难度
    show_difficulty();
    // 开始获取到全部课程
    get_courses();
    // 获取到页码数
    get_pages();
    // ********************************************************************************

    // *************************【header事件：】***************************************
    // var header_left_ul=document.querySelector('header .header .header_left .nav ul');
    // ********************************************************************************


    // 显示方向
    function show_dirction(directions){
        direction_content.innerHTML='<li><a href="javascript:void 0" class="selected">全部</a></li>';
        for (let i=0;i<directions.length;i++){
            direction_content.innerHTML+=`
                <li><a href="javascript:void 0" id="dir${directions[i].id}">${directions[i].name}</a></li>
            `
        }
    }
    // 点击方向时触发函数
    direction_content.onclick=function (event) {
        let obj=event.target;
        if (this==obj.parentElement.parentElement){
            obj.className="selected";
            previousElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=""
            });
            nextElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=""
            });

            let dir_name=obj.innerText;
            condition.direction=(dir_name=="全部")?"":dir_name;
            condition.classify="";
            condition.difficulty="";
            condition.page=1;
            get_classifys();
            show_difficulty();
            get_courses();
            get_pages();
        }
    };

    // 根据condition的方向筛选分类
    function get_classifys() {
        let server=ip_config+'/course/types/';
        ajax(server,{"direction":condition.direction},'GET',null,function (res) {
            show_type(res);
        })
    }

    // 根据condition筛选课程
    function get_courses(){
        let server=ip_config+'/course/free_courses/';
        ajax(server,condition,'GET',null,function (res) {
            show_course(res);
        });
    }
    // 显示精品课程
    function show_course(courses) {
        dis_article.innerHTML='';
        for (let i=0;i<courses.length;i++){
            dis_article.innerHTML+=`

        <div class="dis_article_c" id="${courses[i].cid}">
            <div class="dis_article_c_inner">
                <img src="${img_config}/images/course${courses[i].course_icon}" alt="" style="z-index: 1000">
                <h3>${courses[i].cname}</h3>
                <p>${courses[i].difficulty}</p>
                <p class="p_intro">${courses[i].introduce}</p>
                <p class="integral">${(courses[i].integral=0)?'所需积分为：'+courses[i].integral:'免费'}</p>
            </div>
        </div>
    `;
        }

        // **************************************************************
        // ************************【 跳转到具体详情页面 】******************************
        var dis_article_c=document.querySelectorAll('.dis_article_c');
        for (let item of dis_article_c){
            item.onclick=function () {
                location.href=`./course_description.html?course_id=${item.id}`
            }
        }

    }
    // 根据condition筛选页码
    function get_pages(){
        let server=ip_config+'/course/free_pages/';
        ajax(server,condition,'GET',null,function (res) {
            show_page(Math.ceil(res/condition.page_items));
        });
    }
    // 显示页码
    function show_page(pages) {
        dis_page.innerHTML=`<li><input class="input1" type="button" value="首页"></li>
                        <li><input class="input1" type="button" value="上一页"></li>
                        <li><input class="input1" type="button" value="下一页"></li>
                        <li><input class="input1" type="button" value="尾页"></li>`;
        let t=document.createElement("li");
        for (let i=pages;i>=1;i--) {
            let tt=t.cloneNode();
            tt.innerHTML=`<input type="button" value="${i}" id="page${i}">`;
            if (i==1){
                tt.firstElementChild.className="selected";
            }
            dis_page.insertBefore(tt,dis_page.children[2]);
        }
    }

    // 点击分类时触发函数
    classify_content.onclick=function (event) {

        classify.className='classify';
        classify_copy.style.display='none';
        classify.onmouseover=function () {};
        classify.onmouseout=function () {};

        /* 改变分类的样式 */
        let obj=event.target;
        if (this==obj.parentElement.parentElement){
            obj.className="selected";
            previousElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=""
            });
            nextElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=""
            });
            let classify_name=obj.innerText;
            let classify_id=~~obj.id.slice(4);
            if (condition.direction==""){ /* 方向为空，即全部*/
                if (classify_name!='全部') {
                    condition.classify=classify_name;
                    get_direction_by_classify(classify_id);
                }
            } else{ /* 方向不为空 */
                condition.classify=(classify_name!='全部')?classify_name:"";
                condition.difficulty="";
                condition.page=1;
                show_difficulty();
                get_courses();
                get_pages();
            }
        }
    };
    // 根据分类改变方向。。。
    function get_direction_by_classify(classify_id){
        let server=ip_config+'/course/get_direction_by_classify_id/';
        ajax(server,{"classify_id":classify_id},'GET',null,function (res) {
            /* 改变方向样式 */
            condition.direction=res[0].name; /* 方向的name */
            let dir_id=res[0].id; /* 方向id */
            /* 对应方向的li标签 */
            let obj_direction=(function(){
                let objs=document.querySelectorAll('.direction .content ul li');
                let i;
                for (i of objs){
                    if(i.firstElementChild.innerText==res[0].name){
                        break;
                    }
                }
                return i
            })();
            /* 改变对应方向的样式 */
            obj_direction.firstElementChild.className="selected";
            previousElementSiblings(obj_direction,function (res) {
                res.firstElementChild.className=""
            });
            nextElementSiblings(obj_direction,function (res) {
                res.firstElementChild.className=""
            });

            /* 根据方向id获取分类 */ /* 刷新分类 */
            let server1=ip_config+'/course/types_by_direction_id/';
            ajax(server1,{"direction_id":dir_id},'GET',null,function (res) {

                classify_content.innerHTML=' <li><a href="javascript:void 0">全部</a></li>';
                for (let i=0;i<res.length;i++){
                    if (res[i].id==classify_id) {
                        classify_content.innerHTML+=`<li><a href="javascript:void 0" id="type${res[i].id}" class="selected">${res[i].name}</a></li>`
                    }else{
                        classify_content.innerHTML+=`<li><a href="javascript:void 0" id="type${res[i].id}">${res[i].name}</a></li>`
                    }
                }

            });
            show_difficulty();
            get_courses();
            get_pages();
        });
    }

    // ***********************************************************************************

    // 点击难度时触发函数
    difficulty_content.onclick=function (event) {
        let obj=event.target;
        if (this==obj.parentElement.parentElement){
            obj.className="selected";
            previousElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=""
            });
            nextElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=""
            });

            let dif_name=obj.innerText;
            condition.difficulty=(dif_name=="全部")?"":dif_name;
            condition.page=1;
            get_courses();
            get_pages();
        }
    };
    // 点击页码时触发函数
    dis_page.onclick=function (event) {
        let obj=event.target;
        if (this==obj.parentElement.parentElement && obj.className!="input1"){
            obj.className="selected";
            previousElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=(res.firstElementChild.className=="input1")?"input1":""
            });
            nextElementSiblings(obj.parentElement,function (res) {
                res.firstElementChild.className=(res.firstElementChild.className=="input1")?"input1":""
            });

            let page_id=~~obj.id.slice(4);
            condition.page=page_id;
            get_courses();
        }
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

    // 显示分类
    function show_type(types){
        classify_content.innerHTML=' <li><a href="javascript:void 0" class="selected">全部</a></li>';
        for (let i=0;i<types.length;i++){
            classify_content.innerHTML+=`
                <li><a href="javascript:void 0" id="type${types[i].id}">${types[i].name}</a></li>
            `
        }
        // **************【分类列表多余隐藏】*********************
        // let classify=document.querySelector('.classify');
        // let classify_copy=document.querySelector('.classify_copy');
        let classify_content_h=classify_content.offsetHeight;
        let classify_copy_h=classify_copy.firstElementChild.value;
        if (classify_content_h>classify_copy_h){
            classify.onmouseover=function(){
                classify.classList.add('classify_hover');
                classify_copy.style.display='block';
            };
            classify.onmouseout=function(){
                classify.classList.remove('classify_hover');
                classify_copy.style.display='none';
            };
        }else{
            classify.onmouseover=function () {};
            classify.onmouseout=function () {};
        }
        // *******************************************************

    }
    function show_difficulty() {
        difficulty_content.innerHTML=`<li><a href="javascript:void 0" class="selected">全部</a></li>`;
        difficulty_content.innerHTML+=`<li><a href="javascript:void 0" id="dif1">入门</a></li>
                            <li><a href="javascript:void 0" id="dif2">初级</a></li>
                            <li><a href="javascript:void 0" id="dif3">中级</a></li>
                            <li><a href="javascript:void 0" id="dif4">高级</a></li>`;
    }

    // **************************************************************
    // ************************【排序】******************************

    var sort_btn_time=document.getElementById('sort_btn_time');
    var sort_btn_select=document.getElementById('sort_btn_select');
    var sort_btn_collection=document.getElementById('sort_btn_collection');
    sort_btn_time.onclick=function(){
        sort_btn_time.className="sort_btn_on";
        sort_btn_select.className="sort_btn";
        sort_btn_collection.className="sort_btn";
        condition.page=1;
        condition.flag=0;
        get_courses();
        get_pages();
    };
    sort_btn_select.onclick=function(){
        sort_btn_time.className="sort_btn";
        sort_btn_select.className="sort_btn_on";
        sort_btn_collection.className="sort_btn";
        condition.page=1;
        condition.flag=1;
        get_courses();
        get_pages();
    };
    sort_btn_collection.onclick=function () {
        sort_btn_time.className="sort_btn";
        sort_btn_select.className="sort_btn";
        sort_btn_collection.className="sort_btn_on";
        sort_btn_collection.className="sort_btn_on";
        condition.page=1;
        condition.flag=2;
        get_courses();
        get_pages();
    };






};