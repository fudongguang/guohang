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
<style type="text/css">
    .code-title {
        text-indent: -8px;
    }

    pre {
        display: block;
        padding: 9.5px;
        margin: 0 0 10px;
        font-size: 13px;
        line-height: 20px;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre;
        white-space: pre-wrap;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, 0.15);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #333333;
    }

    code {
        padding: 0;
        color: inherit;
        white-space: pre;
        white-space: pre-wrap;
        background-color: transparent;
        border: 0;
    }



    h1, h2, h3, h4, h5, h6 {
        font-family: inherit;
        font-weight: bold;
        line-height: 20px;
        color: inherit;
        text-rendering: optimizelegibility;
    }
    h4 {
        font-size: 17.5px;
    }

    .J_codeDesc{
        display: none;
    }

</style>

<link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/Public/json.css?v=1112040120"/>

<div class="wrapper" style="position: relative">
    <h1 class="title pt20"><?php echo ($project["name"]); ?>
        <?php if(!empty($_SESSION['userInfo']['name'])): ?><a href="add?projectId=<?php echo ($project["id"]); ?>" style="font-size: 15px;">增加</a><?php endif; ?>
    </h1>
    <hr>

    <div class="row mt50">
        <div class="span12">
            <?php if(is_array($rows)): foreach($rows as $key=>$item): ?><h4 class="pb5" id="h4_<?php echo ($item["id"]); ?>"><?php echo ($item["name"]); ?>
                    <?php if(!empty($_SESSION['userInfo']['name'])): ?><a href="edit?id=<?php echo ($item["id"]); ?>"  style="font-size: 14px;">编辑</a>
                    <a class="J_del" href="del?id=<?php echo ($item["id"]); ?>" style="font-size: 14px;">删除</a><?php endif; ?>
                </h4>
                    <pre class="mb30"><div class="code-title">【描述】</div><?php if($item["desc"] != ''): echo (trim($item["desc"])); ?><br/><?php endif; ?>
                        <div class="code-title">【参数】</div><div class="code-desc J_codeDesc"><?php echo (trim($item["paramsFormat"])); ?></div>
                        <div class="code-title">【返回】</div><div class="code-desc J_codeDesc"><?php echo (trim($item["result"])); ?></div></pre><?php endforeach; endif; ?>
        </div>
    </div>

    <div id="apiNav"
         style="position: fixed;right: 0;top:47px;width: 70px;border:solid 1px #ccc;background:#fff;padding:5px;overflow: hidden;border-radius: 5px;">
        <div>导航 <a href="#" class="fr" id="zhedie">折叠</a> </div>
        <ul style="line-height: 20px;padding-left: 23px;display: none;" id="zhedieTarget" class="mt10">
            <?php if(is_array($rows)): foreach($rows as $key=>$item): ?><li  style="list-style-type: disc;"><a href="#h4_<?php echo ($item["id"]); ?>" style="color: #0088cc;font-size: 14px;"><?php echo ($item["name"]); ?></a></li><?php endforeach; endif; ?>
        </ul>
    </div>
</div>




<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="/ThinkPHP/Public/js/plugin/lhgdialog/lhgdialog.min.js?skin=default"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

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
    initData['userName']='<?php echo ($_SESSION['userInfo']['name']); ?>';
    requirejs([ 'api','lib/formart' ], function () {
    });
</script>

</body>
</html>