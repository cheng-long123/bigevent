//对$ .ajax（）的调用将自动中止对同一URL的请求

$.ajaxPrefilter(function (option) {
    // console.log(option);
    //拼接地址 优化url
    option.url = 'http://www.liulongbin.top:3007' + option.url;
    // 判断
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
});