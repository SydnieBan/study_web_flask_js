function ajax(server, data=null, type = 'GET', token = null, callback) {
    var oAjax = new XMLHttpRequest();
    if (type.toUpperCase() == 'GET') {
        if(data){
            server=addURLParams(server, data);
        }
        oAjax.open(type, server, true);
        token && oAjax.setRequestHeader('token', token);
        oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oAjax.send(null);
    } else {
        oAjax.open(type, server, true);
        token && oAjax.setRequestHeader('token', token);
        oAjax.setRequestHeader("Content-type", "application/json");
        oAjax.send(JSON.stringify(data));
    }


    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
                callback(JSON.parse(oAjax.responseText));
            } else {
                callback({"status_code": oAjax.status});
            }
        }
    };
    function addURLParams(url, data) {
        for (var key in data) {
            url += (url.indexOf("?") == -1) ? "?" : "&";
            url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }
        return url;
    }
}
