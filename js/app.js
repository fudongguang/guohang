requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: './js/',
	paths:{
		ejs:'./lib/ejs_production',
		json2:'./lib/JSON2',
		fish:'./lib/Fish',
		common:'./global/common'
	},
	shim:{
		'common':{
			deps:['fish','ejs', 'json2']
		}
	},
	urlArgs: 'v=123'
});

// Start the main app logic.
requirejs(
	['./lib/Fish','./lib/ejs_production', './lib/JSON2','./global/global','./lib/Slider','./data/data','./public/functions','./lib/weixin','./lib/zepto.dirction','./index'],
	function () {
		//jQuery, canvas and the app/sub module are all
		//loaded and can be used here now.
	}
);
