<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>口袋杭州api系统</title>
    <link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/Public/public.css?v=1112040120"/>
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
    <h1 class="title pt20">用户列表
        <?php if(!empty($_SESSION['userInfo']['name'])): ?><a href="<?php echo U('Home/Project/add');?>" style="font-size: 15px;">增加</a><?php endif; ?>
    </h1>

    <hr>

    <table class="table-list-wrapper mt20">
        <thead>
        <tr>
            <td style="width: 20%">用户名</td>
            <td style="width: 15%">状态</td>
            <td style="width: 15%">权限</td>
            <td style="width: 20%">创建时间</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <?php if(is_array($rows)): foreach($rows as $key=>$item): ?><tr>
                <td><?php echo ($item["name"]); ?></td>
                <td><?php echo ($item["statusStr"]); ?></td>
                <td><?php echo ($item["roleStr"]); ?></td>
                <td><?php echo ($item["createTime"]); ?></td>
                <td>
                    <?php if($item["role"] == 0): if($item["status"] == 1): ?><a href="lock?status=0&id=<?php echo ($item["id"]); ?>" class="blue">
                                解锁
                            </a>
                            <?php else: ?>
                            <a href="lock?status=1&id=<?php echo ($item["id"]); ?>" class="blue">
                                锁定
                            </a><?php endif; ?>
                        <a href="del?id=<?php echo ($item["id"]); ?>" onclick="return confirm('确定要删除吗？')" class="blue">
                            删除
                        </a>
                        <a href="resetPWD?id=<?php echo ($item["id"]); ?>" onclick="return confirm('确定要重置密码吗？')" class="blue">
                            重置密码
                        </a>
                        <?php else: ?>
                        锁定 删除<?php endif; ?>
                </td>
            </tr><?php endforeach; endif; ?>
        </tbody>

    </table>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<script type="text/javascript">
    requirejs([ 'user' ], function () {
    });
</script>

</body>
</html>