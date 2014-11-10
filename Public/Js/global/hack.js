/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(['./common'],function (com) {
	var toString = {}.toString,
		UA = window.navigator.userAgent,
		href = window.location.href,
		$ = window.$,
		browserV = $.browser.version.toString(),
		body = $('#body');

	/**
	 * ie6\7\8\9 模拟placeholder属性
	 */
	if(document.all && (browserV==='6.0' || browserV==='7.0' || browserV==='8.0' || browserV==='9.0')){
		$('input[placeholder]').add($('textarea[placeholder]')).each(function(){
			var placeholder = $(this).attr('placeholder');
			if($(this).attr('type')!=='password'){
				$(this).val(placeholder).css('color','#A9A9BE');
				$(this).one('focus',function(){
					$(this).val('').css('color','inherit');
				})
			}else{
				$(this).css('background-image','url(http://sell.koudai.com/images/mima.png)').focus(function(){
					$(this).css('background-image','url(http://sell.koudai.com/images/login_02.jpg)');
				});
			}
		});
	}

	return {};

});
