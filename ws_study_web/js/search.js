"use strict";
window.onload=function () {
    var user={
        "id":JSON.parse(window.sessionStorage.getItem("id")),
        "tel":JSON.parse(window.sessionStorage.getItem("tel"))
    };

    // 筛选条件
    var condition={
        search_con:'',
        page:1,
        // page_items:5, // 一页多少个课程
        page_items:30, // 一页多少个课程
        flag:0 // flag==0 时间降序；flag==1 选课人数；flag==2 收藏量
    };
    condition.search_con=decodeURI(location.search).slice(1).split('=')[1];
    if (condition.search_con)
        document.querySelector('title').innerText=condition.search_con+'搜索';

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


    //********************** main的搜索框 ********************************
    var main_search_text=document.querySelector('#main_search_text');
    var main_search_button=document.querySelector('#main_search_button');
    main_search_text.value=condition.search_con;
    main_search_button.onclick=function () {
        condition.search_con=main_search_text.value;
        if (condition.search_con)
            document.querySelector('title').innerText=condition.search_con+'搜索';
        get_courses();
        get_pages();
    };



    var dis_article=document.querySelector('.dis_article');/* 课程 */
    var dis_page=document.querySelector('.dis_page ul');/* 页码 */


    // *************************【跳转到该页面：】***************************************
    // 开始获取到全部课程
    get_courses();
    // 获取到页码数
    get_pages();
    // ********************************************************************************

    // *************************【header事件：】***************************************
    // var header_left_ul=document.querySelector('header .header .header_left .nav ul');
    // ********************************************************************************

    // 根据condition筛选课程
    function get_courses(){
        let server=ip_config+'/search/courses/';
        ajax(server,condition,'GET',null,function (res) {
            show_course(res);
        });
    }
    // 显示课程
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
                <p class="integral">${(courses[i].integral>0)?'所需积分为：'+courses[i].integral:'免费'}</p>
            </div>
        </div>
    `;
        }
        var dis_article_c=document.querySelectorAll('.dis_article_c');
        for (let item of dis_article_c){
            item.onclick=function () {
                location.href='./course_description.html'+'?course_id='+item.id;
            }
        }
    }

    // 根据condition筛选页码
    function get_pages(){
        let server=ip_config+'/search/pages/';
        ajax(server,condition,'GET',null,function (res) {
            console.log(res);
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
        condition.page=1;
        condition.flag=2;
        get_courses();
        get_pages();
    };

    // **************************************************************
    // **************************************************************



};