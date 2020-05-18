// 入口函数
$(function () {
    //注册退出的点击事件
    $('.layui-nav-item #quit').on('click', function () {


        layer.confirm('确定要退出吗', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.msg('退出成功');
        }, function () {

        });

    });
    getUserinfo();

});
// 定义一个函数
function getUserinfo() {
    //ajax获取
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            //调用函数
            renderUser(res.data)
        },
        //配置请求头
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}
//定义函数
function renderUser(data) {
    // 获取data里面的用户名和昵称
    //只获取一个 如果第一个没有用怎获取第二个
    var name = data.nickname || data.username;
    //截取用户名第一个字母（转换成大写字母）或昵称的第一个字
    var fontHead = name.substr(0, 1).toUpperCase();
    // 判断是否有图片
    if (data.user_pic) {
        //如果有则执行
        $('.head-pic img').show().attr('src', data.user_pic);
        $('.head-pic .text-head-portrait').hide();
    } else {
        //如果没有图片，执行文字头像
        //显示文字头像
        $('.head-pic .text-head-portrait').css('display', 'inline-block').text(fontHead);
        //隐藏图片头像
        $('.head-pic img').hide()
    }
    //把用户名或昵称添加到页面中(注意只获取一个，如果有昵称就用昵称如果没有就用用户名)
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);

}
//修改密码成功 商城token 跳转login
function Alert() {

    setTimeout(function () {
        localStorage.removeItem('token');

        location.href = '/login.html'
    }, 1000)

}
