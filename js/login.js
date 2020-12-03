$(function () {
    $('.buttonSubmit').click(function () {
        let data = {};
        let username = $(".username").val();
        let password = $(".password").val();
        data.name = username;
        data.password = password;
        data = JSON.stringify(data);
        // 获取用户名密码及登录的状态

        //设置传递的url 
        let url = 'http://123.56.29.106:9862/info/login/';

        // 调用接口，传递数据
        Ax(data, url);
    });

    // ajax请求
    let Ax = function (data, url) {
        //异步...
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (callback) {
                let name = callback.data;
                window.location.href = `index.html?user=${name}`;
                // window.location.replace(`index.html?name=${name}`);
            },
            error(callback) {
                alert('访问错误');
            }
        });
    };

    $('.FormInput').on({
        focus: function () {
            $(this).css('border-color', '#a8b8cccc');
        },
        blur: function () {
            $(this).css('border-color', '#435c7dcc');
        }
    });
});