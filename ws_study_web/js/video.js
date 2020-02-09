window.onload=function () {
    var user={
        "id":JSON.parse(window.sessionStorage.getItem("id")),
        "tel":JSON.parse(window.sessionStorage.getItem("tel"))
    };

    var condition={
        course_id:228,
        video_id:1003
    };
    // ?course_id=...&video_id=...
    let get_con_by_url=location.search.slice(1).split('&');
    condition.course_id=get_con_by_url[0].split('=')[1];
    condition.video_id=get_con_by_url[1].split('=')[1];

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
    //**************************************************************

    // ************************************************
    // ****************** 获取该视频对应的各种信息
    var video_title=document.querySelector('.video_title h3');
    (function () {
        let server=ip_config+'/video/get_video_by_id/';
        ajax(server,{'video_id':condition.video_id},'GET',null,function (res) {
            video_title.innerText=`${res.name}`;
            // player.src('https://baikebcs.bdimg.com/baike-other/big-buck-bunny.mp4');
            player.src(`${res.video_src}`);
        })
    })();

    //**************************************************************


    /* 左侧 */
    // 章节、点赞、问答按钮
    var vdl_chapter=document.querySelector('#vdl_chapter');
    var chapter_panel=document.querySelector('.chapter_panel');
    var chapter_panel_inner=document.querySelector('.chapter_panel .chapter_panel_inner');
    var chapter_chlik=false;
    var vdl_click=document.querySelector('#vdl_click');
    var clicked=false;
    var vdl_question=document.querySelector('#vdl_question');
    // *** 章节
    vdl_chapter.onclick=function () {
        if (chapter_chlik) {
            // chapter_panel.style.display='none';
            chapter_panel.style.width='0';
            chapter_panel_inner.style.display='none';
            chapter_chlik=!chapter_chlik;
        }else{
            // chapter_panel.style.display='block';
            chapter_panel.style.width='300px';
            chapter_panel_inner.style.display='block';
            chapter_chlik=!chapter_chlik;
        }
    };
    // *** 点赞
    vdl_click.onclick=function () {
        let this_fc=this.firstElementChild;
        if (clicked){
            this_fc.src="./logo/click_good.svg";
            this.style.opacity=0.3;
            clicked=!clicked;
        } else{
            this_fc.src="./logo/click_good_clicked.svg";
            this.style.opacity=1;
            clicked=!clicked;
        }

    };

    // ****************模态框**********************
    var panel=document.querySelector("#panel");

    var close=document.querySelector("#close");
    vdl_question.onclick=appear;
    close.onclick=disappear;

    var que_btn=document.querySelector('#que_btn');
    que_btn.onclick=appear;

    function appear() {
        panel.style.display="block";
    }
    function disappear() {
        panel.style.display="none";
    }

    var btn_sub=document.querySelector('#btn_sub');
    var content_eva=document.querySelector('#content_eva');
    btn_sub.onclick=function () {
        let text=content_eva.value;
        add_video_question(text);
        // console.log({"content":text});
        panel.style.display="none";
        // content_eva.value='';
    };
    //****************************************************
    //************************ 添加视频问答 ****************************

    function add_video_question(text) {
        ajax(ip_config+'/video/add_video_question_info/',{"content":text,"user_id":user.id,"video_id":condition.video_id},'GET',null,function (res) {
            get_video_question_info();
        })
    }
    // ********************************************************

    var video=document.querySelector('#video');

    /* 右侧 */
    // 关闭、打开按钮
    var vdr_close=document.querySelector('.vdr_close img');
    var vdr_open=document.querySelector('.video_div_right_hid img');
    // 右侧两个div
    var video_div_right=document.querySelector('.video_div_right');
    var video_div_right_hid=document.querySelector('.video_div_right_hid');
    /****************************/
    /* 右侧事件 */
    vdr_close.onclick=function () {
        video_div_right.style.display='none';
        video_div_right_hid.style.display='flex';
        video.style.width='1149px';
        player.width('1149');
    };
    vdr_open.onclick=function () {
        video_div_right.style.display='block';
        video_div_right_hid.style.display='none';
        video.style.width='900px';
        player.width('900');
    };

    //****************************************************
    //************************ 获取该视频所在课程对应的章节信息 ****************************
    get_chapter();
    function get_chapter() {
        let server=ip_config+'/video/get_chapters_video_by_course_id/';
        ajax(server,{"course_id":condition.course_id},'GET',null,function (res) {
            show_chapter(res);
        })
    }
    // chapter_panel
    function show_chapter(res) {
        chapter_panel_inner.innerHTML='';
        for (let ires in res){
            chapter_panel_inner.innerHTML+=`
                <h3>${ires}</h3>
            `;
            for (let j in res[ires]){
                chapter_panel_inner.innerHTML+=`
                    <p>${res[ires][j].name}&nbsp;(${res[ires][j].video_time})</p>
                 `;
            }
        }
    }
    //****************************************************
    //************************ 获取该视频所在课程对应的老师信息 ****************************
    var vdrt_img=video_div_right.querySelector('.vdr_top .vdr_top_img img');
    var vdrt_name=video_div_right.querySelector('.vdr_top .vdr_top_name h3');
    var vdrt_iden=video_div_right.querySelector('.vdr_top .vdr_top_name p');
    var vdrb_intro=video_div_right.querySelector('.vdr_bottom p');
    get_teacher();
    function get_teacher() {
        let server=ip_config+'/video/get_teacher/';
        ajax(server,{"course_id":condition.course_id},'GET',null,function (res) {
            show_teacher(res);
        })
    }
    function show_teacher(res) {
        vdrt_img.src=`${img_config}/images/${res.teacher_icon}`;
        vdrt_name.innerText=`${res.name}`;
        vdrt_iden.innerText=`${res.identity}`;
        vdrb_intro.innerText=`${res.introduce}`;
    }
    //****************************************************
    //************************ 获取该视频对应的问答 ****************************
    var que_container=document.querySelector('.que_container');
    get_video_question_info();
    function get_video_question_info() {
        let server=ip_config+'/video/get_video_question_info_by_video_id/';
        ajax(server,{"video_id":condition.video_id},'GET',null,function (res) {
            show_video_question_info(res);
        })
    }
    function show_video_question_info(res) {
        que_container.innerHTML='';
        for (let i=0;i<res.length;i++){
            que_container.innerHTML+=`
                <div class="que_article">
                    <div class="que_content">
                        <div class="que_icon">
                            <img src="http://pxebavmp1.bkt.clouddn.com/${res[i].user_icon}" alt="">
                        </div>
                        <div class="que_text">
                            <h3>${res[i].user_name}</h3>
                            <p>${res[i].content}</p>
                        </div>
                    </div>
                    <div class="que_time">
                        <span>2${res[i].qv_date}</span>
                    </div>
                </div>
            `;
        }
    }
    //****************************************************
    //************************ 推荐课程 ****************************
    var recommend=document.querySelector('.recommend');
    get_recommend();
    function get_recommend() {
        let server=ip_config+'/courseDetails/courseRecommended/';
        ajax(server,{"course_id":condition.course_id},'GET',null,function (res) {
            show_recommend(res);
        })
    }
    function show_recommend(res) {
        recommend.innerHTML = ' <h3>推荐课程</h3>';
        for (let i = 0; i < res.length; i++) {
            recommend.innerHTML += `
                    <div class="recommend_course" id="${res[i].id}">
                        <div class="img"><img src="http://pxebavmp1.bkt.clouddn.com/images/teacher${res[i].course_icon}" alt=""></div>
                        <div class="text">
                            <p>${res[i].course_name}</p>
                            <p>${res[i].dif_name}</p>
                        </div>
                    </div>
            `;
        }
        /* 跳转到具体详情页 */
        var recommend_course=document.querySelectorAll('.recommend_course');
        for (let item of recommend_course){
            item.onclick=function () {
                location.href=`./course_description.html?course_id=${item.id}`
            }
        }
    }
    //****************************************************
    //************************ 设置用户对该视频所看时间 ****************************
    ajax(ip_config+'/video/select_user_video/',{"user_id":user.id,"video_id":condition.video_id},'GET',null,function (res) {
        if (res && res.hasOwnProperty("progress")){ // {"progress":0:00:12}
            let progress=res.progress;
            let hh=parseInt(progress.split(":")[0]);
            let mm=parseInt(progress.split(":")[1]);
            let ss=parseInt(progress.split(":")[2]);
            let timestamp=hh*60*60+mm*60+ss;
            // console.log(timestamp);
            player.currentTime(timestamp); /* 设置当前用户所看视频时间 */
        } else{
            alert('查看用户进度失败')
        }
    });
    //****************************************************
    //************************ 设置用户对该视频所看时间 ****************************
//     player.on('pause',function () {
//         let timestamp=player.currentTime(); // 获取用户关闭页面时的时间
//         ajax(ip_config+'/video/update_user_video/',{"progress":timestamp,"user_id":user.id,"video_id":condition.video_id},'GET',null,function (res) {
//             console.log(res)
//         })
//     });
    document.querySelector('body').onbeforeunload=function(){
        let timestamp=player.currentTime(); // 获取用户关闭页面时的时间
        ajax(ip_config+'/video/update_user_video/',{"progress":timestamp,"user_id":user.id,"video_id":condition.video_id},'GET',null,function (res) {
            console.log(res)
        })
    };
};