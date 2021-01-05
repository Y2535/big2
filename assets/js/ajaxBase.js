// 根路径  http://api-breakingnews-web.itheima.net
// 通过 形参o 可以获得服务器返回的数据
$.ajaxPrefilter(function(o) {
    o.url = ' http://api-breakingnews-web.itheima.net' + o.url;
    if (o.url.indexOf('/my') !== -1)
        o.headers = {
            Authorization: localStorage.getItem('token')
        }
    o.complete = function(xhr) {
        // xhr 服务器响应回来的数据
        console.log(xhr);
        if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
            location.href = '/home/login.html'
        }
    }
})