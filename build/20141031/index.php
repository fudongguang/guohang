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
    <title>垂直市场</title>
    <link rel="stylesheet" type="text/css" href="./css/app.css?v=1031140259"/>
</head>
<body class="loading">

<div class="wrapper">
    <img src="images/index_01.jpg"/>
</div>


<script type="text/javascript" src="js/lib/zepto.min.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js"></script>
<script type="text/javascript" src="js/app.js?v=1031140259"></script>

<script type="text/javascript">
    requirejs(['index'],function(){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-23269961-10', 'auto', {'allowLinker': true});
        ga('require', 'linker');
        ga('linker:autoLink', ['koudai.com','vdian.com']);
        ga('send', 'pageview');
    })
</script>

</body>
</html>