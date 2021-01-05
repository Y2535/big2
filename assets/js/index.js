let layer = layui.layer;
getUserInfo()
    // 获取头像和昵称
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 通过renderUserInfo将头像和昵称渲染出来
            renderUserInfo(res.data)
        }

        // complete: function(xhr) {
        //     // xhr 服务器响应回来的数据
        //     console.log(xhr);
        //     if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
        //         location.href = '/home/login.html'
        //     }
        // }
    })
}

function renderUserInfo(data) {
    let name = data.nickname || data.username;
    // console.log(name);
    let first = name[0].toUpperCase()
    $('.text-avatar').text(first)
        // console.log(first);

    // 显示欢迎
    $('.welcome').text('欢迎 ' + name)

    if (data.user_pic) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', data.user_pic).show()
    } else {
        $('.text-avatar').show()
        $('.layui-nav-img').hide()
    }
}

// 实现退出功能
$('.logoutBtn').click(function() {
    layer.confirm('确认退出吗', { icon: 3, title: '提示' }, function(index) {
        // 退出登录要干啥
        localStorage.removeItem('token')
        location.href = '/home/login.html'

        layer.close(index); // index弹出层的索引
    });
})