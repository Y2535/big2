$(function() {
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;

    // 配置项
    let query = {
        pagenum: 1, //页码值
        pagesize: 2, //	每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '' //	文章的状态，可选值有：已发布、草稿
    };

    getLists();

    function getLists() {
        $.ajax({
            url: '/my/article/list',
            data: query,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                let htmlStr = template('trTpl', res)
                $('#tb').html(htmlStr)

                // 分页
                laypage.render({
                    elem: 'testBox',
                    count: res.total, //数据总数，从服务端得到
                    curr: query.pagenum, //起始页
                    limit: query.pagesize, //每页显示的条数
                    layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                    limits: [1, 2, 3, 4, 5],

                    jump: function(obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        query.pagenum = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                        query.pagesize = obj.limit; //得到每页显示的条数

                        //首次不执行
                        if (!first) {
                            getLists();
                        }
                    }
                });
            }
        })
    }

    // 获取下拉列表
    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                layer.msg(res.message)
            }
            res.data.forEach(item => {
                $(` <option value="${item.Id} ">${item.name} </option>`).appendTo('#cateSel')
                form.render()
            });
        }
    })

    // 筛选
    $('#selForm').on('submit', function(e) {
        e.preventDefault()
        query.cate_id = $('#cateSel').val()
        query.state = $('#stateSel').val()
        getLists();
    })

    // 删除

    $('#tb').on('click', '.delBtn', function() {
        let id = $(this).attr('data-id')
        console.log(id);
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            let delBtns = $('.delBtn').length;
            if (delBtns === 1) {
                query.pagenum = query.pagenum === 1 ? 1 : query.pagenum - 1
            }
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    getLists();
                }
            })
            layer.close(index);
        });
    })


    // 过滤器格式化时间
    template.defaults.imports.getTime = function(time) {
        let getZero = n => n < 10 ? '0' + n : n
        let d = new Date(time)
        let Y = d.getFullYear()
        let M = getZero(d.getMonth() + 1)
        let D = getZero(d.getDate())
        let h = getZero(d.getHours())
        let m = getZero(d.getMinutes())
        let s = getZero(d.getSeconds())
        return `${Y}/${M}/${D} ${h}:${m}:${s} `
    }


})