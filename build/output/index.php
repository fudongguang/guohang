<?php
$viewportContent='';

if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone') || stristr($_SERVER['HTTP_USER_AGENT'],'iPad')){
	$viewportContent = 'width=640,user-scalable=0';
}else{
	if($_COOKIE['viewportDpi']){
        $viewportDpi = $_COOKIE['viewportDpi'];
        $viewportContent = 'width=640, target-densitydpi='.$viewportDpi.', user-scalable=0';
	}else{
		header('location:setViewportDpi.html?time='.time().'&focus=true&src='.urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']));
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
<body style="background-color: #e2e2e2;">

<div class="wrapper">
   <section class="container">
        <div class="title">
            <img src="images/logo-koudai.png">
            <p>口袋购物</p>
        </div>
        <div class="flex-column">
            <header>入驻条件</header>
            <ul class="list">
                <li>1. 淘宝搬家到微店的卖家.</li>
                <li>2. 开通担保交易.</li>
                <li>3. 店铺至少有一笔成功交易订单.</li>
                <li>满足以上1个条件即可.</li>
            </ul>
            <a class="apply" href="koudai.php">申请入驻</a>
        </div>
   </section>
   <section class="container">
        <div class="title">
            <img src="images/logo-daigou.png">
            <p>代购现场</p>
        </div>
        <div class="flex-column">
            <header>入驻条件</header>
            <ul class="list">
                <li>1. 海外微店卖家.</li>
                <li>2. 开通担保交易.</li>
                <li>3. 微店开店6个月以上.</li>
                <li>4. 微店收藏数高、销量高优先.</li>
            </ul>
            <a class="apply" href="daigou.php">申请入驻</a>
        </div>
   </section>
   <section class="container">
        <div class="title">
            <img src="images/logo-meiligou.png">
            <p>美丽购</p>
        </div>
        <div class="flex-column">
            <header>入驻条件</header>
            <ul class="list">
                <li>1. 女装、女鞋、女包类目的微店商家.</li>
                <li>2. 开通担保交易.</li>
                <li>3. 买手、红人店、拥有特色货源的微店商家优先.</li>
            </ul>
            <a class="apply" href="meiligou.php">申请入驻</a>
        </div>
   </section>
   <section class="container">
        <div class="title">
            <img src="images/logo-banjia.png">
            <p>今日半价</p>
        </div>
        <div class="flex-column">
            <header>入驻条件</header>
            <ul class="list">
                <li>1. 天猫搬家的微店商家，且开通担保交易.</li>
                <li>2. 非天猫搬家的微店商家，我们会根据店铺综合指标、背景资质等进行主动邀约.</li>
            </ul>
            <a class="apply" href="banjia.php">申请入驻</a>
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