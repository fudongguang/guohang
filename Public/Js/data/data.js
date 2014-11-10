/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-8-30
 * Time: PM2:04
 * To change this template use File | Settings | File Templates.
 */


define(['../global/global'],function(g){
    return {
        /**
         * 获取推广链接
         */
        getPromotionLink:function(param, back){
            g.ajax({
                url: g.apiHost + 'getCpsLink.do',
                data: param,
                success: function (result) {
                    if(back && com.isFunction(back)){
                        back(result);
                    }
                }
            })
        },
        getKeywordLink:function(param, back){
            g.ajax({
                url: g.apiHost + 'getKeywordLink.do',
                data: param,
                success: function (result) {
                    if(back && com.isFunction(back)){
                        back(result);
                    }
                }
            })
        }
    }
});