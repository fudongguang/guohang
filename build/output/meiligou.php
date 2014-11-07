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
            <img src="images/logo-meiligou.png">
            <p>美丽购</p>
        </div>
        <div class="flex-column">
            <div class="info">
                “美丽购”旨在打造一个纯女性买家卖家互动社区，邀请用心经营微店的女装、女鞋、女包的商家加入我们！
            </div>
            <div class="mt30">
                <header class="hr">
                    <span class="infoTitle">产品特色</span>
                </header>
                女性买家卖家互动社区.
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
                美丽购.
            </div>
            <div class="mt30">
                <header class="hr">
                    <span class="infoTitle">入驻条件</span>
                </header>
                1. 女装、女鞋、女包类目的微店商家.<br/>
                2. 必须开通担保交易.<br/>
                3. 买手、红人店、拥有特色货源的微店商家优先.<br/>
            </div>
            <div class="mt30">
            <div class="hr" style="border-bottom:solid 1px #ce3429;">
                <span class="infoTitle" style="background-color: #ce3429;">申请邮箱</span>
            </div>
            <div style="color: #ce3429">meiligou@koudai.com</div>
        </div>
        </div>
    </section>
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