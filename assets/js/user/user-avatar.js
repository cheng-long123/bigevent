// 入口函数
$(function () {

    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 创建裁剪区域
    $image.cropper(options)
    //选择图片
    //注册点击事件 上传按钮
    $('#uploading').on('click', function (e) {
        // e.preventDefault();
        //点击上传按钮 就点击file
        $('#file').click();

    });
    //给文件上产添加事件改变事件
    $('#file').change(function () {
        // 判断如果file长度小于或等于0 则提示信息
        if (this.files.length <= 0) {
            return layer.msg('请选择一张图片');
        }
        //获取文件对象
        var objfile = this.files[0];
        // console.log(objfile);
        //获取临时得url
        var url = URL.createObjectURL(objfile);
        // console.log(url);
        //更换裁剪图片
        //先销毁原先的裁剪区域
        //在设置src得属性
        //在初始化裁剪区域
        $image.cropper('destroy').attr('src', url).cropper(options);
    });
    //注册确定点击事件
    $('#confirm').on('click', function (e) {
        //阻止跳转
        e.preventDefault();
        var canvas = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        });
        //转换64为格式图片
        var data = canvas.toDataURL();
        //发送请求 向接口发送数据
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: data
            },
            success: function (res) {
                //判断
                if (res.status === 1) {
                    //提示失败
                    return layer.msg(res.message);
                }
                //提示成功
                layer.msg(res.message);
                //重新获取用户信息 并渲染用户信息页面
                window.parent.getUserinfo();
            }
        });
    });
});