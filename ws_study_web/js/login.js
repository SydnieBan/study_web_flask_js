//显示登录界面按钮
var show_login = document.querySelector('#show_login');
//显示密码找回界面按钮
var show_res = document.querySelector('#show_register');
//显示注册界面按钮
var show_rsp = document.querySelector('#show_find_Pwd');
//**************************************************************************
//登录div
var user_login = document.querySelector('#user_login');
//注册div
var user_register = document.querySelector('#user_register');
//找回密码div
var retrieve_password = document.querySelector('#retrieve_password');
//**************************************************************************
//登录界面
// 手机号的input
var log_user_tel = document.querySelector('#log_user_tel');
//手机号验证错误div
var log_error_id = document.querySelector('#log_error_id');
// 密码的input
var log_user_pwd = document.querySelector('#log_user_pwd');
//密码验证错误div
var log_error_pwd = document.querySelector('#log_error_pwd');
//是否记住密码input
var log_remPwd = document.querySelector('#log_remPwd')
//登录按钮
var log_btn = document.querySelector('#log_btn');
//登录出现错误时时提示
var is_login_success = document.querySelector('#is_login_success');
//**************************************************************************
//注册界面
//手机号的input
var register_tel =document.querySelector('#register_tel');
//手机号验证错误div
var res_error_id = document.querySelector('#res_error_id');
// 密码的input
var res_new_pwd = document.querySelector('#res_new_pwd');
//密码验证错误div
var res_new_pwd_error = document.querySelector('#res_new_pwd_error');
// 确认密码的input
var res_pwd_again = document.querySelector('#res_pwd_again');
// 确认密码验证错误div
var res_pwd_again_error = document.querySelector('#res_pwd_again_error');
//输入验证码的input
var input_vc=document.querySelector('#res_check_code')
//发送验证码的btn
var get_vc=document.querySelector("#res_btn_check");
//验证码错误提示div
var res_ck_code_error=document.querySelector('#res_ck_code_error');
//注册按钮
var res_btn=document.querySelector('#res_btn');
//注册错误时的提示div
var res_error=document.querySelector('#res_error');
//**************************************************************************
//找回密码界面
//手机号的input
var rep_tel=document.querySelector('#rep_tel');
//手机号验证错误div
var rep_tel_error = document.querySelector('#rep_tel_error');
//输入验证码的input
var rep_check_code=document.querySelector('#rep_check_code')
//发送验证码的btn
var rep_btn_check=document.querySelector("#rep_btn_check");
//验证码错误提示div
var rep_ck_code_error=document.querySelector('#rep_ck_code_error');
// 密码的input
var rep_pwd = document.querySelector('#rep_pwd');
// 密码验证错误div
var rep_pwd_error = document.querySelector('#rep_pwd_error');
//重置按钮
var rep_btn=document.querySelector('#rep_btn');
//重置错误时的提示div
var rep_btn_error=document.querySelector('#rep_btn_error');
//**************************************************************************
// var ip_config='http://192.168.43.180:8080';
// var ip_config='http://127.0.0.1:8080';

//单击跳转登录按钮
show_login.onclick = function () {
    if (user_login.className == 'user_login no_active'){
        user_login.classList.remove('no_active');
        user_register.classList.add('no_active');
        retrieve_password.classList.add('no_active');
    }
};

//单击跳转注册界面
show_res.onclick = function () {
    if (user_register.className == 'user_register no_active'){
        user_login.classList.add('no_active');
        user_register.classList.remove('no_active');
        retrieve_password.classList.add('no_active');
    }
};

//单击跳转找回密码界面
show_rsp.onclick = function () {
    if (retrieve_password.className == 'retrieve_password no_active') {
        user_login.classList.add('no_active')
        user_register.classList.add('no_active')
        retrieve_password.classList.remove('no_active')
    }
};


// login账号框内容改变
log_user_tel.onchange = function () {
    check_username(log_user_tel,log_error_id);
};
//register账号框内容改变
register_tel.onchange = function () {
    check_username(register_tel,res_error_id);
};
//找回密码框内容改变
rep_tel.onchange = function () {
    check_username(rep_tel,rep_tel_error);
};
//账号框规则
function check_username(obj,error) {
    var id = obj.value.trim();
    var reg_id = /^1[345678]\d{9}$/;
    if (id) {
        if (reg_id.test(id)) {
            error.innerHTML = '&nbsp;';
            return true;
        } else {
            error.innerHTML = "* 用户名格式不正确";
            return false;
        }
    } else {
        error.innerHTML = "* 用户名不能为空";
        return false;
    }
}


// login密码框内容改变
log_user_pwd.onchange = function () {
    check_password(log_user_pwd,log_error_pwd);
};
// register密码框内容改变
res_new_pwd.onchange = function () {
    check_password(res_new_pwd,res_new_pwd_error);
};
// 找回密码框内容改变
rep_pwd.onchange = function () {
    check_password(rep_pwd,rep_pwd_error);
};
//密码框规则
function check_password(obj,error) {
    var pwd = obj.value.trim();
    var reg_pwd = /^\w{6,}$/;
    if(pwd){
        if(reg_pwd.test(pwd)){
            error.innerHTML='&nbsp;';
            return true
        }else{
            error.innerHTML='*密码格式不正确';
            return false;
        }
    }else{
        error.innerHTML='*密码不能为空';
        return false;
    }
}

// 确认密码框改变
res_pwd_again.onchange=function () {
    check_equal()
};
//确认密码规则
function check_equal() {
    var pwd=res_new_pwd.value.trim();
    var r_pwd=res_pwd_again.value.trim();
    if (r_pwd){
        if(pwd==r_pwd){
            res_pwd_again_error.innerHTML='&nbsp;';
            return true
        }else{
            res_pwd_again_error.innerHTML='*两次密码不一致';
            return false;
        }
    } else{
        res_pwd_again_error.innerHTML='*确认密码不能为空';
        return false;
    }
}

//判断是否记住密码
(function () {
    var is_remember=localStorage.getItem('isRemember');
    if(is_remember){
        log_remPwd.checked=true;
        log_user_tel.value=localStorage.getItem('tel');
        log_user_pwd.value=localStorage.getItem('psw');
    }
})();

// ****************** 验证码 ********************************
var verification_code='';

//单击注册的发送验证码的按钮
get_vc.onclick=function(){
    send_vc(get_vc,register_tel);
};

//单击找回密码发送验证码的按钮
rep_btn_check.onclick=function(){
    send_vc(rep_btn_check,rep_tel);
};
function send_vc(btn,tel) {
    /* 给手机发送验证码 */
    let server=ip_config+'/user/get_verification_code/';
    ajax(server,{"telephone":tel.value},'GET',null,function (res) {
        verification_code=res.verification_code;
        clear_vc();
    });
    /* 验证码过期时间 */
    function clear_vc(){
        setTimeout(function () {
            verification_code='';
        },5*60*1000);
    }
    /* 验证码倒计时 */
    let seconds=5;
    btn.setAttribute('disabled',true);
    btn.value=`${seconds}秒`;
    let inter=setInterval(function () {
        seconds-=1;
        btn.value=`${seconds}秒`;
        if (seconds<=0){
            btn.value='获取验证码';
            clearInterval(inter);
            btn.removeAttribute('disabled');
        }
    },1000)
}


// 检查验证码
function check_vc(obj_check,obj_error) {
    let input_vc_value=obj_check.value;//发验证码的框
    if (input_vc_value) {
        if (verification_code) {
            if (input_vc_value==verification_code){
                return true;
            } else{
                obj_error.innerText='输入的验证码不正确';//验证提示框
                return false;
            }
        }else{
            obj_error.innerText='验证码已过期';
            verification_code='';
            return false;
        }
    }else{
        obj_error.innerText='验证码不能为空';
        return false;
    }
}

//***********************************************************

//***********************************************************
//登录功能
log_btn.onclick=login_form;
function login_form() {
    if (check_username(log_user_tel,log_error_id) && check_password(log_user_pwd,log_error_pwd)) {
        var user = {"tel": log_user_tel.value, "psw": log_user_pwd.value};
        ajax(ip_config + '/user/login/', user, 'post', null, function (result) {
            if (result && result.hasOwnProperty("id")) {
                if(log_remPwd.checked){
                    localStorage.setItem('isRemember',true);
                    localStorage.setItem('tel',user.tel);
                    localStorage.setItem('psw',user.psw);
                }else {
                    localStorage.removeItem('isRemember');
                    localStorage.removeItem('tel');
                    localStorage.removeItem('psw');
                }
                //存储token
                window.localStorage.setItem('token', result.token);
                window.sessionStorage.setItem('id',result.id);
                window.sessionStorage.setItem('tel',result.tel);
                location.href=`./hoom.html`;
            } else {
                is_login_success.innerHTML = result.description;
            }
        })
    }
}

//注册功能
res_btn.onclick=register_form;
function register_form() {
    if (check_username(register_tel,res_error_id) && check_password(res_new_pwd,res_new_pwd_error) && check_equal()&&check_vc(input_vc,res_ck_code_error)) {
        var user = {"tel": register_tel.value, "psw": res_new_pwd.value};
        ajax(ip_config + '/user/register/', user, 'post', null, function (result) {
            if (result && result.code == '1000') {
                /* 注册成功直接跳转登录 */
                /* code description token */
                ajax(ip_config + '/user/login/', user, 'post', null, function (result2) {
                     /* result2 : id tel token */
                    if (result2 && result2.hasOwnProperty("id")) {
                        /* 登陆成功插入该用户信息 */
                        let user_info={
                            "user_name":result2.tel,
                            "user_id":result2.id,
                            "user_icon":1
                        };
                        /* 登录成功添加用户信息 */
                        ajax(ip_config+'/user/insert_user_info/',user_info,'post',null,function (result3) {
                              if (result3 && result3.code=='1019'){
                                //存储token
                                window.localStorage.setItem('token', result2.token);
                                window.sessionStorage.setItem('id',result2.id);
                                window.sessionStorage.setItem('tel',result2.tel);
                                location.href=`./hoom.html`;
                            }else{
                                  res_error.innerHTML = result3.description;
                              }
                        });
                    } else {
                        res_error.innerHTML = result2.description;
                    }
                });
                // ******************************
            } else {
                res_error.innerHTML = result.description;
                return false;
            }
        })
    }
}

//密码找回功能
rep_btn.onclick=retrieve_password_form;
function retrieve_password_form() {
    if (check_username(rep_tel,rep_tel_error) && check_password(rep_pwd,rep_pwd_error) &&check_vc(rep_check_code,rep_ck_code_error) ){
        var user = {"tel": rep_tel.value, "psw": rep_pwd.value};
        ajax(ip_config + '/user/chance_password/', user, 'post', null, function (result) {
            if (result && result.code =='1014'){
                // retrieve_password.querySelector('form').submit();
                location.href=`./hoom.html?user_tel=${rep_tel.value}`;
            } else {
                rep_btn_error.innerHTML = result.description;
            }
        })
    }
};

