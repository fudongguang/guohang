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
            <img src="images/logo-daigou.png">

            <p>代购现场</p>
        </div>
        <div class="flex-column">
            <div class="info">
                “代购现场”专门为有海淘、海外代购需要的用户提供真实的海外商品信息，所有商品均由长期居住在海外的华人在当地进行采购，实时查看卖家定位位置信息，确保商品来源正宗，折扣不错过，品质有保障！
            </div>
            <div class="mt30">
                <div class="hr">
                    <span class="infoTitle">产品特色</span>
                </div>
                卖家地理位置定位.
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
                代购现场、微店、官方微博、广点通、口袋购物、应用市场.
            </div>
            <div class="mt30">
                <div class="hr">
                    <span class="infoTitle">入驻条件</span>
                </div>
                1. 海外微店卖家.<br/>
                2. 开通担保交易.<br/>
                3. 微店开店时间6个月以上.<br/>
                4. 微店收藏数高、销量高优先.<br/>
            </div>
            <div class="mt30">
                <div class="hr" style="border-bottom:solid 1px #ce3429;">
                    <span class="infoTitle" style="background-color: #ce3429;">申请邮箱</span>
                </div>
                <div style="color: #ce3429">global@koudai.com</div>
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