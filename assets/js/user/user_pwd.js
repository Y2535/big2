$(function() {
    let form = layui.form;
    let layer = layui.layer;


    // 自定义校验规则
    form.verify({
        newPwd: function(value) {
            let oldPwd = $('[name=oldPwd]').val()
            if (oldPwd === value) {
                return '新密码和原密码不能相同'
            }
        },
        rePwd: function(value) {
            let newPwd = $('[name=newPwd]').val()
            if (newPwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    });

    // 发送修改请求
    $('#form').submit(function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功')
                $('#form')[0].reset()
            }
        })
    })






})