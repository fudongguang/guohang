/**
 * Created by fudg on 14-8-19.
 */



define(['./common'], function (com) {
    com.isH5 = false;

    var platform = com.query('platform') || com.query('plat');
    platform = platform.toString().toLocaleLowerCase();
    if(platform==='h5' || window.location.search.search(/plath5/i)>-1){
        com.isH5 = true;
    }

});


