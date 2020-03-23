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
    getUaerinfo();

});
// 定义一个函数
function getUaerinfo() {
    //ajax获取
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
        },
        //配置请求头
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}