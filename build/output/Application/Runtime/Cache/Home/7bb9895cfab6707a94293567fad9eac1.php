<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>口袋杭州api系统</title>
    <link rel="stylesheet" type="text/css" href="/thinkPHP/Public/Css/Public/public.css?v=1112040120"/>
</head>
<body>
<div class="navbar pt12 pb12" style="background:#2c2c2c;color: #fff">
    <div class="navbar-inner" style="width: 1000px;margin: auto;">
        <a class="brand" href="<?php echo U('Home/Index/index');?>" style="color: #fff;font-size: 20px;">口袋web文档管理</a>
        <a class="active ml20" href="<?php echo U('Home/Index/index');?>">项目列表</a>

        <?php if($_SESSION['userInfo']['role']== 1): ?><a class="active ml20" href="<?php echo U('Home/User/showList');?>">用户列表</a><?php endif; ?>

        <?php if(empty($_SESSION['userInfo']['name'])): ?><a href="<?php echo U('Home/User/index');?>" class="fr mt6">登 录</a>
            <?php else: ?>

            <a href="<?php echo U('Home/User/logout');?>" class="fr mt6 ml6">退出</a>
            <span class="fr mt6">欢迎你：<?php echo ($_SESSION['userInfo']['name']); ?></span><?php endif; ?>
    </div>
</div>
<script type="text/javascript">
    var initData=[];
</script>

<div class="wrapper">
    <div style="width: 450px;margin: auto;" class="pt30">
        <form method="POST" class="login" id="form" action="../User/login">
            <table>
                <tr>
                    <td>用户名：</td>
                    <td>
                        <input style="width: 220px;" class="input-t" name="name" type="text" maxlength="60"
                               data-validator='{"required":1,"messages":{"required":"请输入用户名"}}'/>
                    </td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td>
                        <input style="width: 220px;" class="input-t" name="password" type="password" maxlength="30"
                               data-validator='{"required":1,"messages":{"required":"请输入密码"}}'/>
                    </td>
                </tr>
                <tr>
                    <td>密码验证：</td>
                    <td>
                        <input style="width: 220px;" class="input-t" name="password" type="password" maxlength="30"
                               data-validator='{"required":1,"messages":{"required":"请再次输入密码"}}'/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="button" id="submitButton" class="button" value=" 登 录 "/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="/thinkPHP/Public/js/plugin/lhgdialog/lhgdialog.min.js?skin=default"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/thinkPHP/Public/js/app"></script>

<script type="text/javascript">
    (function(config){
        config['title']='';
        config['lock'] = true;
        config['max']=false;
    })($.dialog.setting);

    $('body').delegate('.ui_dialog .J_close','click',function(){
        $(this).parents('.ui_dialog').find('.ui_close').trigger('click');
        return false;
    })
</script>

<script type="text/javascript">
    requirejs([ 'user' ], function() {
    });
</script>

</body>
</html>