$(function () {
    var form = layui.form;
    // 初始化富文本
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var option = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(option)
    //点击发布按钮 就相当点击file
    $('#choice-img').on('click', function () {
        $('#file').click();
    })
    //当file发生改变时
    $('#file').change(function () {
        var fileObj = this.files[0];
        //获取图片的url地址
        var url = URL.createObjectURL(fileObj);
        //销毁裁剪区   换图片 生成裁剪区
        $image.cropper('destroy').attr('src', url).cropper(option);
    })
    //获取所有分类 并渲染
    getAllcategory();

    function getAllcategory() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var newCategory = template('tel-category', res);

                $('#pull-down').html(newCategory);
                form.render('select');


            }
        });
    }
    //发布功能
    var sta = '';
    $('button:contains(发布)').click(function () {
        sta = '已发布';
    })
    $('button:contains(存为草稿)').click(function () {
        sta = '草搞';
    })
    $('form').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        fd.append('state', sta);
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            fd.append('cover_img', blob);
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.status === 1) {
                        return layer.msg(res.message)
                    }
                    layer.msg(sta + '成功')
                    // console.log(sta);

                    setTimeout(function () {
                        location.href = '/article/list.html';
                    }, 1000);
                }
            });
        })
    })
});