/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */



define(['./common','../public/configs', './storage','./hack','./init'], function (common,configs, storage) {
	var G = {};
	$.extend(G,common,configs,storage);
	return G;
});
