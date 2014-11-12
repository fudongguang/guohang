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
<link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/index.css?v=1112040120"/>


<div class="wrapper">
    <div style="width: 800px;margin: auto;" class="pt50">

        <form method="POST" id="form" action="./update?id=<?php echo ($_GET['id']); ?>">
            <table>
                <tr>
                    <td>接口名称：</td>
                    <td>
                        <input class="input-t" name="name" style="width: 300px;" value="<?php echo ($row['name']); ?>" type="text" maxlength="120"
                               data-validator='{"required":1,"messages":{"required":"请输入接口名称"}}'/>
                        <span class="red">*</span>
                    </td>
                </tr>
                <tr>
                    <td>接口描述：</td>
                    <td>
                        <textarea class="input-t middle" name="desc" type="text" maxlength="250"  style="width: 600px;height: 50px;"><?php echo ($row["desc"]); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="tr">参数：</td>
                    <td>
                        <textarea class="input-t middle" name="params" id="params" type="text" style="height: 300px;width: 600px;"><?php echo ($row["params"]); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="tr">返回：</td>
                    <td>
                        <textarea class="input-t middle" id="result" name="result" type="text" style="height: 200px;width: 600px;"
                                  data-validator='{"required":1,"messages":{"required":"请输入放回内容"}}'><?php echo ($row["result"]); ?></textarea>
                        <span class="red">*</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="submit" id="submitButton" class="button" value=" 更 新 "/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<div id="codeEditor" style="position: absolute;left: 0;top:0;width: 100%;height: 100%"></div>


<link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Js/plugin/jsoneditor/jsoneditor.min.css">
<script type="text/javascript" src="/ThinkPHP/Public/Js/plugin/jsoneditor/jsoneditor.min.js"></script>
<script type="text/javascript" src="/ThinkPHP/Public/Js/plugin/jsoneditor/asset/ace/ace.js"></script>
<script type="text/javascript" src="/ThinkPHP/Public/Js/plugin/jsoneditor/app-min.js"></script>

<script type="text/javascript">
    var e = document.getElementById("codeEditor");
    var codeEditor = new JSONEditor(e, {mode: "code", change: function () {

    }, error: function (e) {

    }});
    var p = {array: [1, 2, 3], "boolean": !0, "null": null, number: 123, object: {a: "b", c: "d", e: "f"}, string: "Hello World"};
    codeEditor.set(p);

    console.log(codeEditor.get());

</script>

</body>
</html>