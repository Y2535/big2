$(function() {
    let form = layui.form;
    let layer = layui.layer;


    // 自定义校验规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称的长度需要在1-6个字符之间'
            }
        }
    });

    // 发送请求，获取用户的基本信息
    getInfo()

    function getInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                // 第二个参数，数据需要和表单中的name一一对应
                // 给表单填上默认数据
                form.val('form', res.data)
            }
        })
    }

    // 重置
    $('#resetBtn').click(function(e) {
        e.preventDefault()
        getInfo()
    })

    // 修改数据
    $('#form').submit(function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})