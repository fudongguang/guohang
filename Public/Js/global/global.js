/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */



define(['./common','./configs', './storage', './hack'], function (common,configs, storage, hack) {
	var g = {};
	$.extend(g,common,configs,storage,hack);
	return g;
});
