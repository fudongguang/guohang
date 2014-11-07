define(function () {
    function Slider(options){
        var defaults = {
            container  : $('#J_Slider'),
            prevBtn    : $('#J_SliderControlPrev'),
            nextBtn    : $('#J_SliderControlNext'),
            controller : $('#J_SliderControl1'),
            duration   : 5000
        };
        $.extend(this, defaults, options || {});
        this.page = 1;
        this.timmer = null;
        this.cWidth = this.container.width();
        this.pageCount = this.container.find('li').length;
        this.init();
        this.bindEvents();
    }
    Slider.prototype.init = function(){
        var that = this, navHtml = '<ul>';
        navHtml += '<li class="rotatorNumber rotatorSelected"><a href="javascript:void(0);"><span>1</span></a></li>';
        for(var i = 1; i < that.pageCount; i += 1){
            navHtml += '<li class="rotatorNumber"><a href="javascript:void(0);"><span>' + i + '</span></a></li>';
        }
        navHtml += '</ul>';
        that.controller.html(navHtml);
        that.container.width(that.pageCount * that.cWidth);
    };
    Slider.prototype.bindEvents = function(){
        var that = this;
        that.container.mouseover(function(){
            clearInterval(that.timer);
        }).mouseout(function(){
            clearInterval(that.timer);
            that.timer = setInterval(function(){
                that.move();
            }, that.duration);
        }).trigger('mouseout');
        that.prevBtn.click(function(){
            clearInterval(that.timer);
            that.timer = setInterval(function(){
                that.move();
            }, that.duration);
            that.move('prev');
        });
        that.nextBtn.click(function(){
            clearInterval(that.timer);
            that.timer = setInterval(function(){
                that.move();
            }, that.duration);
            that.move('next');
        });
        that.controller.delegate('li','click',function(){
            var index = that.controller.find('li').index(this);
            that.container.animate({left: -that.cWidth * index},'slow');
            that.page = index + 1;
            that.cirMove();
        });
    };
    Slider.prototype.move = function(className){
        var that = this;
        if(!that.container.is(':animated')){
            if(className == 'prev'){
                if(that.page == 1){
                    that.container.animate({left : - that.cWidth * (that.pageCount - 1)});
                    that.page = that.pageCount;
                    that.cirMove();
                }
                else{
                    that.container.animate({left : '+=' + that.cWidth}, 'slow');
                    that.page --;
                    that.cirMove();
                }
            }
            else{
                if(that.page == that.pageCount){
                    that.container.animate({left : 0});
                    that.page = 1;
                    that.cirMove();
                }
                else{
                    that.container.animate({left : '-=' + that.cWidth}, 'slow');
                    that.page ++;
                    that.cirMove();
                }
            }
        }
    };
    Slider.prototype.cirMove = function(){
        var that = this;
        that.controller.find('li').eq(that.page - 1).addClass('rotatorSelected').siblings().removeClass('rotatorSelected');
    };

    window.Slider = Slider;

    return Slider;
});