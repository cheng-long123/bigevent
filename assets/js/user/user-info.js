//入口函数
var form = layui.form;
$(function () {
    $('.layui-form').on('submit', function (e) {
        //阻止跳转
        e.preventDefault();
        // console.log(123);
        //收集表单信息（name）
        var data = $(this).serialize();
        // console.log(data);
        //像接口传递信息
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                // console.log(res);
                //判断是否失败
                if (res.status === 1) {
                    // 失败提示 停止代码执行
                    return layer.msg(res.message);
                }
                //提示成功
                layer.msg(res.message);
                //重新渲染用户信息
                window.parent.getUserinfo();
            }

        });
    })

    $('#reset').on('click', function (e) {
        //阻止跳转
        e.preventDefault();
        //调用函数 ，重新获取值
        initUserinfo();

    });
    initUserinfo();

})
//获取用户信息
function initUserinfo() {
    //发送请求 获取用户信息
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            //调用函数
            form.val('f1', res.data)
        },
    });
}