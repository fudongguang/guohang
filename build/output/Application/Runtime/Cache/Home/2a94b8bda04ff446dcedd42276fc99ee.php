<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>口袋杭州api系统</title>
    <link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/ui/bootstrap.min.css?v=1112040120"/>
    <link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/Public/public.css?v=1112040120"/>
</head>
<body>
<div class="navbar">
    <div class="navbar-inner">
        <div class="container"><a class="brand" href="/">口袋web文档管理</a>
            <ul class="nav">
                <li><a class="active" href="http://localhost/ThinkPHP/index.php/Home/Index/index">项目列表</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container">
    <h1 class="title">项目列表</h1>
    <hr>
    <div class="row">
        <div class="span12">
            <ul>
                <?php if(is_array($data)): foreach($data as $key=>$item): ?><li><a href="../Api/index?projectId=<?php echo ($item["id"]); ?>"><?php echo ($item["name"]); ?></a> <span class="h6"><?php echo ($item["author"]); ?> <?php echo ($item["createTime"]); ?></span></li><?php endforeach; endif; ?>
            </ul>
        </div>
    </div>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<script type="text/javascript">
//    requirejs([ 'index' ], function () {
//    });
</script>

</body>
</html>