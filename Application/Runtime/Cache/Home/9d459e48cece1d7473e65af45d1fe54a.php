<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>口袋杭州api系统</title>
    <link rel="stylesheet" type="text/css" href="/fudongguang/guohang/Public/Css/Public/public.css?v=140426161232"/>
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
    <h1 class="title pt20">项目列表
        <?php if(!empty($_SESSION['userInfo']['name'])): ?><a href="<?php echo U('Home/Project/add');?>" style="font-size: 15px;">增加</a><?php endif; ?>
    </h1>
    <hr>
    <div class="row mt30">
        <div class="span12">
            <ul style="line-height: 23px;">
                <?php if(is_array($data)): foreach($data as $key=>$item): ?><li><a href="../Api/index?projectId=<?php echo ($item["id"]); ?>" style="color: #6B6868;font-size: 15px;"><?php echo ($item["name"]); ?></a>
                        <?php if(!empty($_SESSION['userInfo']['name'])): ?><a href="del?id=<?php echo ($item["id"]); ?>" style="font-size: 13px;" onclick="return confirm('确定要删除吗？');">删除</a><?php endif; ?>

                        <span class="h6 fr" style="color: #8B8787;"><?php echo ($item["author"]); ?> <?php echo ($item["createTime"]); ?></span>
                    </li><?php endforeach; endif; ?>
            </ul>
        </div>
    </div>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="/fudongguang/guohang/Public/js/plugin/lhgdialog/lhgdialog.min.js?skin=default"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/fudongguang/guohang/Public/js/app"></script>

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
//    requirejs([ 'index' ], function () {
//    });
</script>

</body>
</html>