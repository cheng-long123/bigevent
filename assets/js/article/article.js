// 入口函数
$(function () {
    // 发送get请求
    var addIndex = null;

    function getCates() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                // 判断
                if (res.status === 1) {
                    //失败输出
                    return layer.msg(res.message);
                }
                //成功  加载模板
                var newTr = template('tpl-article', res);
                // 渲染tbody
                $('tbody').html(newTr);
                // console.log(newTr);

            }
        });
    }
    // 调用渲染
    getCates();

    
    //点击添加按钮 显示弹层
    $('#showAdd').on('click', function () {
        addIndex = layer.open({
            type: 1, //类型
            title: '添加文章分类', //标题
            content: $('#tpl-add ').html(), //内容
            area: ['500px', '250px'] //宽度和高度
        });
    });
    //用事件委托注册事件(因为是动态注册的)
    $('body').on('submit', '#form-add', function (e) {

        //阻止跳转
        e.preventDefault();
        // console.log(123);
        //收集表单信息
        var data = $(this).serialize();
        // console.log(data);
        //发送请求
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                // 判断
                if (res.status === 1) {
                    //失败提示
                    return layer.msg(res.message);
                }
                // console.log(res);
                //成功
                //关闭弹层
                layer.close(addIndex);
                //提示添加成功
                layer.msg(res.message);
                // 重新渲染页面
                getCates();
            }
        });
    })
})