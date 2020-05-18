$(function () {
            var form = layui.form;
            form.verify({
                len: [/^\S{6,12}$/, '密码长度6-12位'],
                diff: function (value) {
                    var old = $('input[name=oldPwd]').val();
                    if (old === value) {
                        return '新密码与旧密码不能一致';
                    }
                },
                repwd: function (value) {
                    if (value !== $('input[name=newPwd]').val()) {
                        return '新密码与确认密码不一致';
                    }

                }
            })

            $('#alter').on('click', function (e) {
                e.preventDefault();
                var data = $('.layui-form').serialize();
                $.ajax({
                    type: 'POST',
                    url: '/my/updatepwd',
                    data: data,
                    success: function (res) {
                        if (res.status === 1) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        setTimeout(function () {
                            window.parent.Alert();
                            layer.msg('密码发生改变,请重新登录');
                       },1000)        
                    }

                });
            })  
            })