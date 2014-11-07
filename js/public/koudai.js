/**
 * Created by fudg on 14-8-19.
 */



define(['../global/global'], function (G) {
    var body = $('body');

    var openAppIframe = function (url) {
        var a = document.createElement("iframe");
        a.style.display = "none";
        a.src = url;
        document.body.appendChild(a);
    };


    //拼接info
    var concatInfo = function(info){

        if(!info.fr){
            info.fr = G.query('fr') || 'test_anything';
        }

        var k,str='';
        for(k in info){
            str+='&'+k+'='+encodeURIComponent(info[k]);
        }

        return str;
    };

    var openUrl = function(url,h5Url){
        if(G.isH5){
            openAppIframe(G.koudai+url);

            if (!h5Url) {
                h5Url = G.proxy + url;
            }
            setTimeout(function () {
                window.location.href = h5Url;
            }, 500);
        }else{
            window.location.href = G.koudai+url;
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

        var url = concatInfo(info),
            h5url = 'http://item.koudai.com/vtem?itemId='+info.id+'&fr='+G.query('fr');
        openUrl(url,h5url);
        return false;
    });

    //收藏跳转
    body.delegate('.J_favorites','click',function(){
        var info = $(this).data('info') || {};

        info.type=1;

        ga('send', 'event', G.gaTitle+'收藏跳转', 'click', '');

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

    //好店店铺列表
    body.delegate('.J_haodianList','click',function(){
        var info = $(this).data('info') || {};

        info.type=3;

        if(!info.id || !info.title){
            return false;
        }

        ga('send', 'event', G.gaTitle+'', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //升级
    body.delegate('.J_haodianList','click',function(){
        var info = $(this).data('info') || {};

        info.type=4;

        if(!info.url){
            return false;
        }

        ga('send', 'event', G.gaTitle+'升级', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //主题内容页面
    body.delegate('.J_zhuti','click',function(){
        var info = $(this).data('info') || {};

        info.type=5;

        if(!info.id || !info.title){
            return false;
        }

        ga('send', 'event', G.gaTitle+'主题内容页面', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //主题列表页面 info.subid 题街id
    body.delegate('.J_zhutiList','click',function(){
        var info = $(this).data('info') || {};

        info.type=6;

        if(!info.id){
            return false;
        }


        ga('send', 'event', G.gaTitle+'打开设置', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //打开内嵌网页
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


    //店铺详情
    body.delegate('.J_outsidePage','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=9;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'店铺详情', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //跳转到“猜你喜欢”页面(subid: 可选项,该频道子tab id)
    body.delegate('.J_guessYourLove','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=10;

        ga('send', 'event', G.gaTitle+'猜你喜欢', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //跳转到热门频道某tab页面【例 如:少女装->美鞋】(id:热门 频道id,subid:该频道子tab id)
    body.delegate('.J_hotChannelTab','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=11;
        if(!info.id || !info.subid){
            return false;
        }

        ga('send', 'event', G.gaTitle+'热门频道', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //跳转到排行榜某tab页面(排行 榜子tab id)
    body.delegate('.J_rankTab','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=12;
        if(!info.id){
            return false;
        }


        ga('send', 'event', G.gaTitle+'排行榜', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //微信分享(img:图片地址; title:标题;content:􏰁述文 案;url:跳转url;scene:“0: 好友,1:朋友圈”)
    body.delegate('J_wx','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=13;

        if(!info.hasOwnProperty('scene')){
            return false;
        }

        if(!info.img || !!info.title || !info.content){
            return false;
        }


        if(info.scene){
            ga('send', 'event', G.gaTitle+'分享朋友圈', 'click', '');
        }else{
            ga('send', 'event', G.gaTitle+'分享好友', 'click', '');
        }

        if(!info.url){
            if(G.isH5){
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


    //特卖汇某频道(特卖汇,子tab id)
    body.delegate('.J_temaiTab','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=14;
        if(!info.id){
            return false;
        }


        ga('send', 'event', G.gaTitle+'特卖汇', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //封面(我的街)
    body.delegate('.J_mytreet','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=17;


        ga('send', 'event', G.gaTitle+'封面', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //频道订阅选择列表
    body.delegate('.J_subscribeChannel','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=18;


        ga('send', 'event', G.gaTitle+'频道订阅', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //搜索店铺结果页(搜索关键字)
    body.delegate('.J_searchShop','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=19;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'搜索店铺结果页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //搜索商品结果页(搜索关键字
    body.delegate('.J_searchProduct','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=20;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'搜索商品结果页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //二级分类列表页面并展示某个 二级分类下的三级分类内容 (id:二级分类id,subid:三 级分类id)
    body.delegate('.J_levelThreeCate','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=21;
        if(!info.id || !info.subid){
            return false;
        }

        ga('send', 'event', G.gaTitle+'二级分类列表页面', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //￼商品簇内容页
    body.delegate('.J_spz','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=22;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'商品簇内容页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼商品簇列表页
    body.delegate('.J_spzList','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=23;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'商品簇列表页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼店铺簇列表页
    body.delegate('.J_dpzList','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=24;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'店铺簇列表页', 'click', '');

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

        if(!info.img || !info.title){
            return false;
        }

        if(!info.url){
            if(G.isH5){
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


    //￼应用内升级【仅 IOS 平台,2.7 新增】(苹果 appstore 使用的 appid,例如: 461626184)
    body.delegate('.J_pgrade','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=26;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'应用内升级', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼IM 对话框(2.7 新增)
    body.delegate('.J_im','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=27;

        ga('send', 'event', G.gaTitle+'IM对话框', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼网页请求被“关闭”,关闭后从 网页返回 app 本地页面
    body.delegate('.J_requestHttpClose','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=28;

        ga('send', 'event', G.gaTitle+'网页请求被“关闭”', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //网页请求被“返回”,返回后从 网页返回 app 本地页面(功能同 type=28)
    body.delegate('.J_requestHttpBack','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=29;

        ga('send', 'event', G.gaTitle+'网页请求被“返回”', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //网页请求 app 登录口袋帐号并 回传。func:回调函数,三个参 数分别是 userid,kduss 和传入 的 value)
    body.delegate('.requestHttp','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=30;
        if(!info.func || !info.extparam){
            return false;
        }

        ga('send', 'event', G.gaTitle+'网页请求 app 登录口袋帐号并 回传', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //跳转到品牌列表(品牌一级 ID, 品牌二级 ID)
    body.delegate('.J_brandList','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=31;
        if(!info.id || !info.subid){
            return false;
        }

        ga('send', 'event', G.gaTitle+'跳转到品牌列表', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼跳转到品牌详情页(品牌 ID, 品 牌名称)
    body.delegate('.J_brandInfo','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=32;
        if(!info.id || !info.name){
            return false;
        }

        ga('send', 'event', G.gaTitle+'跳转到品牌详情页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼￼跳转到好店首页
    body.delegate('.J_haodian','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=33;

        ga('send', 'event', G.gaTitle+'跳转到好店首页', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //跳转到收藏子 tab(id,具体目标 tab 位置索引。注意:iphone, ipad 和 android 的 tab 排列上都 存在差异。
    // (宝贝收藏;店铺动 态;店铺收藏;簇收藏;订单) 3.7.0 开始,按约定的子 ID 跳 转(不是按位置索引),子 ID 的定义如下:
    //宝贝收藏:0 店铺动态:1 店铺收藏:2 簇收藏:3 订单:4 购物车:5
    body.delegate('.J_favoritesTab','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=34;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'应用内升级', '跳转到收藏子tab', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //设置本地通知􏰀醒功能(id:通 知 id;title: alert 标题, content:alert 文案;url:跳转 url(内外链);expire:过期时 间(UTC,单位秒); fire:􏰀
    //醒时间(UTC,单位秒);scene: 重复周期,0:不重复,1:小时, 2:天,3:周,4:月);sound: 是否响铃(true/false);vibrate: 是否震动(true/false)
    body.delegate('.J_pushNotice','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=35;
        if(!info.id || !info.title || !info.content || !info.url || !info.expire || !info.fire || !info.scene || !info.sound || !info.vibrate){
            return false;
        }

        ga('send', 'event', G.gaTitle+'设置本地通知', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //取消本地通知􏰀醒功能(id:通 知 id;如果通知 id 为空,清除 全部本地通知)
    body.delegate('.J_cancelNotice','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=36;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'取消本地通知', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //获取设备信息和用户信息 func: 回调函数,三个参数(userid, encryType, edata , kid )
    body.delegate('.J_getDeviceInfo','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=37;
        if(!info.func){
            return false;
        }

        ga('send', 'event', G.gaTitle+'获取设备信息和用户信息', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //获取到淘宝收藏数据(content: 商品或店铺 id 列表,以“,” 分隔;scene:1:商品,2:店铺)
    body.delegate('.J_getTaobaoFavs','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=38;
        if(!info.content || !info.scene){
            return false;
        }

        ga('send', 'event', G.gaTitle+'获取到淘宝收藏数据', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //QQ 分享(img:图片地址;title: 标题;content:􏰁述文案;url: 跳转 url;scene:“0:好友, 1:QZone”)
    body.delegate('.J_qq','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=39;
        if(!info.img || !info.content || !info.title || !info.url || !info.scene){
            return false;
        }


        ga('send', 'event', G.gaTitle+'QQ 分享', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //微信分享图片(img:图片地址; title:标题;content:􏰁述文案; scene:“0:好友,1:朋友圈”)
    body.delegate('.J_wxfxImg','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=40;
        if(!info.img || !info.content || !info.title || !info.scene){
            return false;
        }


        ga('send', 'event', G.gaTitle+'微信分享图片', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //设置用户帐号信息(id:用户帐 号 userid;content:用户帐号口 袋 kduss 或微店 wduss;fr:来 源统计;url:设置成功以后作 为外链使用)
    body.delegate('.J_setAccount','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=41;
        if(!info.id || !info.content || !info.url || !info.fr){
            return false;
        }


        ga('send', 'event', G.gaTitle+'设置用户帐号信息', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //短信分享
    body.delegate('.J_shareMsg','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=42;
        if(!info.id || !info.content || !info.url || !info.fr){
            return false;
        }


        ga('send', 'event', G.gaTitle+'短信分享', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });


    //￼调用二维码比价功能,
    body.delegate('.J_erweima','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=43;
        if(!info.fr){
            return false;
        }


        ga('send', 'event', G.gaTitle+'调用二维码比价功能', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼跳转到订单管理,
    body.delegate('.J_yourOrder','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=44;

        ga('send', 'event', G.gaTitle+'跳转到订单管理', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼跳转到我的收入,
    body.delegate('.J_income','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=45;

        ga('send', 'event', G.gaTitle+'跳转到我的收入', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼跳转到商品编辑界面,
    body.delegate('.J_editProduct','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=46;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'跳转到商品编辑界面', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼跳转到我的微店,
    body.delegate('.J_youshop','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=47;

        ga('send', 'event', G.gaTitle+'跳转到我的微店', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼H5 IM 聊天过程中的回调修改标 题及消息数,
    // 注:content是一个urlencode过的 JSON串里边有title和count两个值
    body.delegate('.J_IMBack','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=48;
        if(!info.content){
            return false;
        }

        ga('send', 'event', G.gaTitle+'聊天过程中的回调修改标', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //强制启动命令
    body.delegate('.J_focusStart','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=49;
        if(!info.url){
            return false;
        }

        ga('send', 'event', G.gaTitle+'强制启动命令', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //获取 app 安装状态的命令
    // 注:id是经过urlencode 过的要收集app的scheme列表,格式: "app1,app2" 示 例 : "kdapp://,wdapp://"
    body.delegate('.J_installStatus','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=50;
        if(!info.id){
            return false;
        }

        ga('send', 'event', G.gaTitle+'app安装状态的命令', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //￼ IM 消息推送
    // 注:id未定,可不传,有功能需求再 定
    body.delegate('.J_pushImMsg','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=51;
        info.id = info.id || '';

        ga('send', 'event', G.gaTitle+'IM 消息推送', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

    //复制到系统剪切板
    //注:content是URL Encode过的字符 串,客户端做Decode后复制到系统剪 切板。
    body.delegate('.J_copy','click',function(){
        var info = $(this).data('info');
        if(!info){
            return false;
        }

        info.type=52;
        if(!info.content){
            return false;
        }

        ga('send', 'event', G.gaTitle+'复制到系统剪切板', 'click', '');

        var url = concatInfo(info);
        openUrl(url);

        return false;
    });

});


