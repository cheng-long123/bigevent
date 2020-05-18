// 入口函数
$(function () {
    // 发送get请求
    // 添加弹层
    var addIndex = null;
    //编辑弹层
    var compileIndex = null;
    var form = layui.form;

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
            area: ['500px', '250px'], //宽度和高度

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
    //删除分类
    $('body').on('click', '.deletecate', function () {
        //获取data-id的属性值
        var id = $(this).attr('data-id')
        //判断
        layer.confirm('你确定要删除吗？', {
            icon: 3,
            title: '提示' //头部
        }, function (index) {
            //发送请求
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // 判断
                    if (res.status === 1) {
                        //失败提示
                        return layer.msg(res.message);
                    }
                    // console.log(res);
                    //成功
                    //提示添加成功
                    layer.msg(res.message);
                    // 重新渲染页面
                    getCates();
                }
            });
        });
        layer.close(index);
    });

    // 点击编辑的显示弹层
    $('body').on('click', '.compile', function () {
        var data = this.dataset;
        // var a = $(this).attr('data-Id')
        // console.log(a);
        // var a = JSON.stringify(data)
        // console.log(data);

        // var id = $(this).attr('data-id')
        // 获取分类数据
        // $.get('/my/article/cates/' + id, function (res) {
        //     if (res.status !== 0) {
        //         return layer.msg('获取分类数据失败！')
        //     }

        // console.log(data);
        // $.ajax({
        //     url: '/my/article/cates/' + id,
        //     success: function (res) {
        //         if (res.status === 1) {
        //             return layer.msg(res.message)
        //         }
        //         compileIndex = layer.open({
        //             type: 1, //类型
        //             title: '修改文章分类', //标题
        //             content: $('#tpl-compile ').html(), //内容
        //             area: ['500px', '250px'], //宽度和高度
        //             success: function () {
        //                 // var newData = JSON.parse(JSON.stringify(data));
        //                 // console.log(newData);
        //                         // console.log(res.data);
        //                 form.val('f2', res.data)
        //             }
        //         });
        //     }
        // })

        // })
        // form.render();
        // console.log(123);



        compileIndex = layer.open({
            type: 1, //类型
            title: '修改文章分类', //标题
            content: $('#tpl-compile ').html(), //内容
            area: ['500px', '250px'], //宽度和高度
            success: function () {
                // console.log(jSON.stringify(data));
                //转换
                var newData = JSON.parse(JSON.stringify(data));

                // console.log(newData);
                // form.val('f2', res.data)
                form.val('f2', newData);
            }
        });
    });
    // 点击修改
    $('body').on('submit', '#form-compile', function (e) {
        e.preventDefault();
        //收集数据


        var data = $(this).serializeArray();
        // 吧id换成Id
        data[2].name = "Id";
        // console.log(data);
        // console.log(123);
        // var data = $(this).serialize().replace('id','Id');
        // console.log(data);
        // console.log(data);
//发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                // 重新渲染
                getCates();
                //关闭弹窗
                layer.close(compileIndex);
                // 提示信息
                layer.msg(res.message);
                ;
            }
        });

    })

})