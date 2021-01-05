// 根路径  http://api-breakingnews-web.itheima.net
// 通过 形参o 可以获得服务器返回的数据
$.ajaxPrefilter(function(o) {
    o.url = ' http://api-breakingnews-web.itheima.net' + o.url
})