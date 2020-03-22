//入口函数
$(function () {
    //注册点击事件 去注册
    $('.goto-register a').on('click', function () {
        //点击隐藏盒子
        $('.login').hide();
        //点击显示盒子
        $('.enroll').show();
    });
    //注册点击事件 去登陆
    $('.goto-enter a').on('click', function () {
        //点击显示盒子
        $('.login').show();
        //点击隐藏盒子
        $('.enroll').hide();
    });
    //第一form
    var form = layui.form
    form.verify({
        //判断密码长度是否6-12位
        pass: [/^\S{6,12}$/, '密码长度6-12位'],
        // 判断输入的密码和确认密码是否一致
        repwd: function (value) {
            //获取密码框的value值
            var psw = $('.password').val().trim();
            if (psw != value) {
                //密码不一致提示
                return '密码不一致'
            };
        }
    });
    $('#reg-submit').on('submit', function (e) {
        //阻止默认事件
        e.preventDefault();
        // 获取表单里的name值
        var data = $(this).serialize();
        // console.log(data);
        //post请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status === 1) {
                    //如果等于1 怎提示 用户名已存在
                    return layer.msg(res.message);
                }
                //提示注册成功
                layer.msg(res.message);
                //调用去登陆事件
                $('.goto-enter a').click();
            }
        });
    });
});