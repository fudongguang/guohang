/**
 * Created by fudg on 14-8-19.
 */



define(['../global/global'], function (G) {

    var body = $('body');


    //拼接info
    var concatInfo = function(info){

        if(!info.fr){
            info.fr = 'test_anything';
        }

        var k,str='';
        for(k in info){
            str+='&'+k+'='+encodeURIComponent(info[k]);
        }

        return str;
    };

    var openUrl = function(url){
        if(G.isH5){
            window.location.href = G.proxy+url+'&protocal=jinribanjia';
        }else{
            window.location.href = G.banjia+url;
        }
    };

    //单品跳转
    body.delegate('.J_item','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=0;

        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'单品跳转', 'click', '');

        var url = concatInfo(info);
        openUrl(url);
        return false;
    });

    //收藏跳转
    body.delegate('.J_favorites','click',function(){
        var info = $(this).data('info') || {};

        info.type=1;

        ga('send', 'event', G.gaTitle+'点击收藏', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //打开设置面板
    body.delegate('.J_setPanel','click',function(){
        var info = $(this).data('info') || {};

        info.type=2;
        ga('send', 'event', G.gaTitle+'打开设置', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //内部浏览器打开网页
    body.delegate('.J_insidePage','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=7;
        if(!info.url){
            return false;
        }

        info.url = 'http://api.m.koudai.com/jump/withP.do?url='+info.url;
        ga('send', 'event', G.gaTitle+'内部浏览器打开网页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);


        return false;
    });

    //外部浏览器打开网页
    body.delegate('.J_outsidePage','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=8;
        if(!info.url){
            return false;
        }

        ga('send', 'event', G.gaTitle+'外部浏览器打开网页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //分享微信 info里面必须包含scene属性 0:分享给好友 1：分享朋友圈
    body.delegate('J_wx','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=13;

        if(!info.hasOwnProperty('scene')){
            return false;
        }

        if(!info.img){
            return false;
        }

        if(!info.title){
            return false;
        }

        if(!info.content){
            return false;
        }


        if(info.scene){
            ga('send', 'event', G.gaTitle+'分享朋友圈', 'click', '');
        }else{
            ga('send', 'event', G.gaTitle+'分享好友', 'click', '');
        }

        if(!info.url){
            if(com.isH5){
                info.url = window.location.href;
            }else{
                info.url = window.location.href + '&plat=h5';
            }
        }

        if(window.WeixinJSBridge){

            var wxConfig = {
                "title": info.title,
                "link": info.url,
                "desc": info.content,
                "img_url": info.img
            };

            _wxShare(wxConfig);

            return false;
        }


        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //分享微博
    body.delegate('J_wb','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=25;

        if(!info.img){
            return false;
        }

        if(!info.title){
            return false;
        }

        if(!info.url){
            if(com.isH5){
                info.url = window.location.href;
            }else{
                info.url = window.location.href + '&plat=h5';
            }
        }

        ga('send', 'event', G.gaTitle+'分享微博', 'click', '');

        var url = concatInfo(info);
        url+='&act=share&plat=sina&fun=';

        openUrl(url);

        return false;
    });

    //打开分类
    body.delegate('.J_cate','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=100;
        info.categorytype='CATEGORY';
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'打开分类', 'click', '');

        var url = concatInfo(info);
        openUrl(url);
        return false;
    });


    //打开专题
    body.delegate('.J_zhuanti','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=102;

        if(!info.id){
            return false;
        }

        if(!info.title){
            return false;
        }
        ga('send', 'event', G.gaTitle+'打开专题', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;

    });


    //打开限时抢
    body.delegate('.J_cate','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=200;
        if(!info.title){
            return false;
        }

        ga('send', 'event', G.gaTitle+'打开限时抢', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

});


