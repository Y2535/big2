let form = layui.form;
let layer = layui.layer;

getList()

function getList() {
    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取文章列表失败')
            }
            // console.log(res);
            let htmlStr = template('trTpl', res)
            $('#tb').html(htmlStr)
        }
    })
}
// 点击添加按钮弹框
let index;
$('#addBtn').click(function() {
    index = layer.open({
        type: 1,
        title: '添加文章分类',
        content: $('#formTpl').html(),
        area: '500px'
    });
})

// 添加列表
$('body').on('submit', '#addForm', function(e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            getList()
            layer.close(index)
            $('#addForm')[0].reset()
        }
    })
})

// 编辑弹框
let editIndex;
$('#tb').on('click', '#editBtn', function() {
    editIndex = layer.open({
        type: 1,
        title: '添加文章分类',
        content: $('#editFormTpl').html(),
        area: '500px'
    });
    let id = $(this).attr('data-id')
    $.ajax({
        url: '/my/article/cates/' + id,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val("editForm", res.data);
        }
    })
})

// 更新编辑的数据
$('body').on('submit', '#editForm', function(e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            getList()
            layer.close(editIndex)
        }
    })
})


// 删除
$('#tb').on('click', '#delBtn', function() {
    let id = $(this).attr('data-id')
    $.ajax({
        url: '/my/article/deletecate/' + id,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            getList()
        }
    })
})