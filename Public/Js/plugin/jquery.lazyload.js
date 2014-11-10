/*

 * Lazy Load - jQuery plugin for lazy loading images

 *

 * Copyright (c) 2007-2009 Mika Tuupola

 *

 * Licensed under the MIT license:

 *   http://www.opensource.org/licenses/mit-license.php

 *

 * Project home:

 *   http://www.appelsiini.net/projects/lazyload

 *

 * Version:  1.5.0

 *

 */

function imageResizeWithTwoLimit(rawWidth, rawHeight, destWidth, destHeight) {
    var oDimension = {};
    oDimension.width = rawWidth;
    oDimension.height = rawHeight;
    if (rawWidth > destWidth) {
        oDimension.width = destWidth;
        oDimension.height = destWidth * rawHeight / rawWidth;
    }
    if (oDimension.height > destHeight) {
        oDimension.width = destHeight * rawWidth / rawHeight;
        oDimension.height = destHeight;
    }
    return oDimension;
}

/**
 * Image Resize Handler
 *
 * @return {object} x.width and x.height
 */
function imageResize(rawWidth, rawHeight, destWidth, destHeight) {
    var dimension = {};
    if (rawWidth > destWidth) {
        dimension.width = destWidth;
        dimension.height = destWidth * rawHeight / rawWidth;
    } else {
        dimension.width = rawWidth;
        dimension.height = rawHeight;
    }
    return dimension;
}


(function($) {

	$.fn.lazyload = function(options) {

		var settings = {

			threshold : 400,

			failurelimit : 50,

			event : "scroll",

			effect : "show",

			container : window,
			
			dimension : { 
				width : 209,
				height :209
			},
			
			heightlimit : false

		};

		if (options) {

			$.extend(settings, options);

		}
		
		var dimension = settings.dimension,
		heightlimit = settings.heightlimit;

		/* Fire one scroll event per scroll. Not one scroll event per image. */

		var elements = this;
		
		if ("scroll" == settings.event) {

			$(settings.container).bind("scroll", function(event) {

				var counter = 0;

				elements.each(function() {

					if ($.abovethetop(this, settings) ||

					$.leftofbegin(this, settings)) {

						/* Nothing. */

					} else if (!$.belowthefold(this, settings) &&

					!$.rightoffold(this, settings)) {

						$(this).trigger("appear");

					} else {

						if (counter++ > settings.failurelimit) {

							return false;

						}

					}

				});

				/* Remove image from array so it is not looped next time. */

				var temp = $.grep(elements, function(element) {

					return !element.loaded;

				});

				elements = $(temp);

			});

		}

		this.each(function() {

			var self = this;
			var loading = $(self).parent().siblings('.picture_loading');
			var $PictureReload = $('.picture_reload', $(self).parent().parent() );
            if ( $PictureReload.size() < 1 ){
            	var aReloadStringPieces = [];
                aReloadStringPieces.push('<p class="picture_reload">');
                aReloadStringPieces.push('<a href="#"');
                aReloadStringPieces.push('>重新加载</a></p>');
                var sReloadString = aReloadStringPieces.join('');
                $PictureReload = $(sReloadString);
                $PictureReload.css({'width': dimension.width});
                if( dimension.width < 90 ){
                	$PictureReload.addClass('picture_reload_min');
                }
                $(self).parent().parent().append($PictureReload);
            }
            
            $PictureReload.click(function(){
            	var img = $(this).siblings('a').find('img');
            	loading.fadeIn();
            	img[0].src = img[0].getAttribute('original');
            	resetImage( img, dimension );
                return false;
            })
			

			/* When appear is triggered load original image. */

			$(self).one("appear", function() {

				if (!this.loaded) {

					$("<img />").bind({
						load : function() {
							if ($(self).attr("original")) {
	
								//$(self).hide().attr("src", $(self).attr("original"))[settings.effect](settings.effectspeed);
								$(self)
								    .css('opacity', 0)
								    .attr("src", $(self).attr("original"))
								    .animate({
								    	opacity : 1
								    }, 100, function(){
								    	$PictureReload.hide();
								    	loading.fadeOut('fast');
								    })
								if( this.width == 1 && this.height == 1 ){
									$(self).attr('src', '../images/default2.png');
									this.width = 310;
									this.height = 310;								
								}
								if( heightlimit ){
									var oDimension = imageResizeWithTwoLimit(this.width, this.height, dimension.width, dimension.height);
								}else{
									var oDimension = imageResize(this.width, this.height, dimension.width, dimension.height);
								}
		
								$(self).css({
									'width' : oDimension.width,
									'height' : oDimension.height
								});
								
	
								self.loaded = true;
	
							}

						},
						error : function(){
							$(self).attr("src","../images/default2.png").css({'width': settings.dimension.width});
					    	loading.fadeOut('fast');
					    	self.errored = true;

						}
						
					}).attr("src", $(self).attr("original"));

				};
				

			});

			/* When wanted event is triggered load original image */

			/* by triggering appear. */

			if ("scroll" != settings.event) {

				$(self).bind(settings.event, function(event) {

					if (!self.loaded) {

						$(self).trigger("appear");

					}

				});

			}

		});

		/* Force initial check if images should appear. */

//		$(settings.container).trigger(settings.event);

		return this;

	};

	/* Convenience methods in jQuery namespace. */

	/* Use as $.belowthefold(element, {threshold : 100, container : window}) */

	$.belowthefold = function(element, settings) {

		if (settings.container === undefined || settings.container === window) {

			var fold = $(window).height() + $(window).scrollTop();

		} else {

			var fold = $(settings.container).offset().top + $(settings.container).height();

		}

		return fold <= $(element).offset().top - settings.threshold;

	};

	$.rightoffold = function(element, settings) {

		if (settings.container === undefined || settings.container === window) {

			var fold = $(window).width() + $(window).scrollLeft();

		} else {

			var fold = $(settings.container).offset().left + $(settings.container).width();

		}

		return fold <= $(element).offset().left - settings.threshold;

	};

	$.abovethetop = function(element, settings) {

		if (settings.container === undefined || settings.container === window) {

			var fold = $(window).scrollTop();

		} else {

			var fold = $(settings.container).offset().top;

		}

		return fold >= $(element).offset().top + settings.threshold + $(element).height();

	};

	$.leftofbegin = function(element, settings) {

		if (settings.container === undefined || settings.container === window) {

			var fold = $(window).scrollLeft();

		} else {

			var fold = $(settings.container).offset().left;

		}

		return fold >= $(element).offset().left + settings.threshold + $(element).width();

	};

	/* Custom selectors for your convenience. */

	/* Use as $("img:below-the-fold").something() */

	$.extend($.expr[':'], {

		"below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",

		"above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",

		"right-of-fold" : "$.rightoffold(a, {threshold : 0, container: window})",

		"left-of-fold" : "!$.rightoffold(a, {threshold : 0, container: window})"

	});

})(jQuery);
