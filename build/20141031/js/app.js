requirejs.config({baseUrl:"./js/",paths:{ejs:"./lib/ejs_production",json2:"./lib/JSON2",fish:"./lib/Fish",common:"./global/common"},shim:{common:{deps:["fish","ejs","json2"]}},urlArgs:"v=1031140259"}),requirejs(["./lib/Fish","./lib/ejs_production","./lib/JSON2","./global/global","./lib/Slider","./data/data","./public/functions","./lib/weixin","./lib/zepto.fx","./lib/zepto.pageSlider","./public/koudai"],function(){});