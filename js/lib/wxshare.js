function _wxShare(wxConfig){
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        WeixinJSBridge.invoke('shareTimeline',wxConfig)
    });

    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        wxConfig.img_width=60;
        wxConfig.img_height=60;
        WeixinJSBridge.invoke('sendAppMessage', wxConfig);
    });

    var height = $(document).height();

    var str='<div style="position: absolute; right: 0; top: 0; background: rgba(0,0,0,0.5); width: 100%; height: '+height+'px;min-height:100%;" onclick="$(this).remove();">';
    str+='<div  style="width: 620px; margin: 0 auto; padding-top: 0; position: absolute; right: 3px; top: 0;">';
    str+='<div style="position: relative">';
    str+='<img src="http://static.koudai.com/m/hd/140917/images/cover_02.png" style="z-index: 10;position: relative;">';
    str+='<p style="margin-top: -10px;z-index:1;position: relative;text-align: right;">';
    str+='<img src="http://static.koudai.com/m/hd/140917/images/cover_05.png">';
    str+='</p>';
    str+='</div>';
    str+='</div>';
    str+='</div>';

    $('body').append(str);
}