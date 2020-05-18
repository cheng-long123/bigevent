// 如果没有token则跳转登录页面
if (localStorage.getItem('token') === null) {
    location.href = '/login.html';
    layer.msg('你还没有登录');
}