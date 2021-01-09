let form = layui.form;
let layer = layui.layer;

// 初始化富文本编辑器
initEditor()

// 1. 初始化图片裁剪器
var $image = $('#image')
    // 2. 裁剪选项
var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
$image.cropper(options)

$('#imgBtn').click(function() {
    $('[type=file]').click()
})

// 监听文件域change事件
$('#file').change(function() {
    let newImg = this.files[0];
    let newImgURL = URL.createObjectURL(newImg)
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

$.ajax({
    url: '/my/article/cates',
    success: function(res) {
        res.data.forEach(item => {
            $(` <option value="${item.Id}">${item.name}</option>`).appendTo('#lists');
            form.render();
        });
    }
})

let state;
$('.subBtn').click(function() {
    state = '已发布'
})
$('.draftBtn').click(function() {
    state = '草稿'
})

$('#form').submit(function(e) {
    e.preventDefault()
        // 将图片输出为文件
    $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob((blob) => { // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            let fd = new FormData(this)
            fd.append('cover_img', blob)
            fd.append('state', state)
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                contentType: false,
                processData: false,
                data: fd,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    location.href = '/article/article_list.html'
                }

            })


        })
})




// $image
//   .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
//     width: 400,
//     height: 280
//   })
//   .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
//     // 得到文件对象后，进行后续的操作
//   })