$('#loginBtn').on('click', function() {
    $('.login').hide()
    $('.register').show()
})
$('#registerBtn').on('click', function() {
    $('.login').show()
    $('.register').hide()
})

// 根路径  http://api-breakingnews-web.itheima.net
$.ajaxPrefilter(function(o) {
    o.url = ' http://api-breakingnews-web.itheima.net' + o.url
})

// 表单校验
let form = layui.form;
form.verify({
    repwd: function(value, item) {
        let pwd = $('.register [name=password]').val()
        if (pwd !== value) {
            return '两次输入的密码不一致';
        }
    },
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ]
});

let layer = layui.layer;

// 注册
$('#registerForm').on('submit', function(e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功');
            $('#registerBtn').click()
            $(this)[0].reset()

        }
    })
})

// 登录
$('#loginForm').on('submit', function(e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 将token存储到本地
            localStorage.setItem('token', res.token)

            layer.msg('登录成功，即将跳转到首页', {
                time: 1000 //1秒关闭（如果不配置，默认是3秒）
            }, function() {
                location.href = '../../home/index.html'
            });
        }
    })
})