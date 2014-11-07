<?php
$viewportContent='';

if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone') || stristr($_SERVER['HTTP_USER_AGENT'],'iPad')){
	$viewportContent = 'width=640,user-scalable=0';
}else{
	if($_COOKIE['viewportScale']){
		$viewportScale = $_COOKIE['viewportScale'];
		$viewportContent = 'width=device-width, initial-scale='.$viewportScale.',minimum-scale='.$viewportScale.',maximum-scale='.$viewportScale;
	}else if($_COOKIE['viewportDpi']){
        $viewportDpi = $_COOKIE['viewportDpi'];
        $viewportContent = 'width=640, target-densitydpi='.$viewportDpi.', user-scalable=0';
	}else{
		header('location:setViewportScal.html?time='.time().'&focus=true&src='.urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']));
	}
}
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <meta content="yes" name="apple-touch-fullscreen"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta name="viewport" content="<?php echo $viewportContent?>">
    <title>入驻市场</title>
    <link rel="stylesheet" type="text/css" href="./css/app.css?v=1101120633"/>
</head>
<body class="signPage">

<div class="wrapper">
    <section class="container">
        <div class="title">
            <img src="images/logo-banjia.png">

            <p>今日半价</p>
        </div>
        <div class="flex-column">
            <div class="info">
                “今日半价”，每天精选1-5折正品，邀请用心经营的微店商家加入我们！
            </div>
            <div class="mt30">
                <div class="hr">
                    <span class="infoTitle">产品特色</span>
                </div>
                超值折扣正品.
            </div>
            <div class="mt30">
                <div class="hr">
                <span class="infoTitle">开放入驻时间</span>
                </div>
                长期招商.
            </div>
            <div class="mt30">
                <div class="hr">
                <span class="infoTitle">推广渠道</span>
                </div>
                今日半价.
            </div>
            <div class="mt30">
                <div class="hr">
                    <span class="infoTitle">入驻条件</span>
                </div>
                1. 天猫搬家的微店商家，且开通担保交易.<br/>
                2. 非天猫搬家的微店商家，我们会根据店铺综合指标、背景资质等进行主动邀约.
                <div class="mt20">
                    注：入驻成功后，符合以下标准的商品将自动入库（以下条件满足其一）:<br/>
                    1. 销量5件及以上，价格5折及以下且90天最低.<br/>
                    2. 符合各栏目招商要求，具体招商要求将在微店社区中持续更新，敬请关注.<br/>
                    <a href="http://bbs.vdian.com/forum.php?gid=56">http://bbs.vdian.com/forum.php?gid=56</a><br/>
                    最终解释权归今日半价所有.<br/>
                </div>
            </div>
            <div class="mt30">
                <div class="hr" style="border-bottom:solid 1px #ce3429;">
                    <span class="infoTitle" style="background-color: #ce3429;">申请邮箱</span>
                </div>
                <div style="color: #ce3429">jinribanjia@koudai.com</div>
            </div>
        </div>
    </section>
</div>


<script type="text/javascript">

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-23269961-10', 'auto', {'allowLinker': true});
    ga('require', 'linker');
    ga('linker:autoLink', ['koudai.com', 'vdian.com']);
    ga('send', 'pageview');
</script>

</body>

</html>