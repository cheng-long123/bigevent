$(function () {
    //定义form
    var form = layui.form;
    //加载分页模块
    var laypage = layui.laypage;
    //获取数据
    var queryObj = {
        pagenum: 1, //页码值
        pagesize: 10, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    };

    // 下拉列表
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            var newStr = template('tel-select', res);
            // console.log(newStr);
            // console.log($('#all-classify'))
            $('#all-classify').html(newStr);
            // var newState = template('tel-state', res);
            // $('#state').append(newState);
            // console.log(newState);

            form.render();
        }
    });
    // 搜索功能
    $('form').on('submit', function (e) {
        //阻止跳转
        e.preventDefault();

        var search = $(this).serializeArray();
        // console.log(search);
        queryObj.cate_id = search[0].value;
        queryObj.state = search[1].value;
        getlist();

    })
    // template.defaults.imports.formatDate = function (t) {
    //     var time = new Data(t)
    //     var year = time.getFullYear();
    //     var month = time.getMonth() + 1
    //     var month = time.getMonth() + 1
    //     var month = time.getMonth() + 1
    // }


    //删除功能呢
    $('body').on('click', '#del-article', function () {
        //获取自定义属性
        var id = $(this).attr('data-id');

        layer.confirm('你确定要删除吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {

            $.ajax({

                type: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status === 1) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    getlist();
                }
            });
            layer.close(index);
        });
        //eg2

    })


    //渲染页面
    getlist();

    function getlist() {
        // 发送ajax
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: queryObj,
            success: function (res) {
                // console.log(res);
                //模板引擎
                var strList = template('tel-list', res);
                // console.log(strList);
                //添加到tbody
                $('tbody').html(strList);
                getPaging(res.total)
            }
        });
    }



    //分页

    function getPaging(c) {
        laypage.render({
            elem: 'paging', //注意，这里的 test1 是 ID，不用加 # 号 
            count: c, //数据总数，从服务端得到
            limit: queryObj.pagesize, //设置每页显示多少数据
            curr: queryObj.pagenum, //默认显示多少页
            layout: ['last', 'first', 'prev', 'page', 'next', 'limit', 'skip'],
            limits: [2, 4, 6, 8, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                
                //首次不执行
                if (!first) {
                  
                    queryObj.pagenum = obj.curr;
                    queryObj.pagesize = obj.limit;
                    //do something
                    getlist();
                }
            }
        });

    }
    //点击编辑跳转到编辑页面
    $('body').on('click', '#compile', function () {
        var id = $(this).attr('data-id');
        location.href = '/article/publish-compile.html?id='+id;
    })

})