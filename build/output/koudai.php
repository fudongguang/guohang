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
            <img src="images/logo-koudai.png">
            <p>口袋购物</p>
        </div>
        <div class="flex-column">
            <div class="info">
                “口袋购物”是一款综合性一站式购物应用，拥有5000万买家流量，通过智能推荐技术实现内容精准匹配，提高买家购买效率，提升卖家精准推广！
            </div>
            <div class="mt30">
                <header class="hr">
                    <span class="infoTitle">产品特色</span>
                </header>
                用户多流量大、智能推荐精准营销、支持微店卖家登录.
            </div>
            <div class="mt30">
                <header class="hr">
                    <span class="infoTitle">开放入驻时间</span>
                </header>
                长期招商.
            </div>
            <div class="mt30">
                <header class="hr">
                    <span class="infoTitle">推广渠道</span>
                </header>
                口袋购物5000万用户、广点通、官方微博、微信公共号、官网、外部流量采买.
            </div>
            <div class="mt30">
                <header class="hr">
                    <span class="infoTitle">入驻条件</span>
                </header>
                满足如下1个条件即可：<br/>
                1. 淘宝搬家到微店的卖家.<br/>
                2. 开通担保交易.<br/>
                3. 店铺至少有一笔成功交易订单.<br/><br/>
                注：除充值虚拟服务类店铺外，满足以上三个条件任何一个就可以自动被口袋定期收录.
            </div>
        </div>
    </section>
    <div class="mt40 text-center">
        <a href="//d.koudai.com" class="download">立即下载</a>
    </div>
</div>

<script type="text/javascript">

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-23269961-10', 'auto', {'allowLinker': true});
        ga('require', 'linker');
        ga('linker:autoLink', ['koudai.com','vdian.com']);
        ga('send', 'pageview');
</script>

</body>

</html>