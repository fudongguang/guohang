/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */



define(['../public/configs', './storage', './hack'], function (configs, storage, hack) {
	var toString = {}.toString,
		$ = window.$,
		UA = window.navigator.userAgent;


	window.com = common = {

		isFunction: function (it) {
			return toString.call(it) == "[object Function]";
		},

		isString: function (it) {
			return toString.call(it) == "[object String]";
		},

		isArray: function (it) {
			return toString.call(it) == "[object Array]";
		},

		isObject: function (it) {
			return toString.call(it) == "[object Object]";
		},



		ua:UA,

        getRender: function (url, config) {
            var html =  new EJS({url: configs.tplDir+url+'.ejs?v=123'}).render({md: config});
            if(html){

                html = $(html);

                setTimeout(function(){
                    hack.placeHolder(html);
                },260)
            }

            return html;//注意此处受到hack.placeHolder 和 jquery的双重影响，jquery的append只能插入一条。需要循环插入请用append(html.html()) 如管理员添加活动页面的添加类目功能
        },

		showLoading: function () {
			var str = '<div class="loading"></div>';
            $('body').append(str);
		},

		removeLoading: function () {
			$('.loading').remove();
		},

		ajax: function (configs) {
			var self = this;
            this.showLoading();
			if(configs.url){
				if(/^[^\?]*\?/.test(configs.url)){
					configs.url+='&mdNmk='+Math.random();
				}else{
					configs.url+='?mdNmk='+Math.random();
				}
			}


			var a = {
				type: 'GET',
				url: this.host,
				data: '',
                dataType:'json',
				success: function (result) {
					//alert('b')
				},
				error: function () {
					alert('连接失败');
				},
				complete: function (result) {
                    self.removeLoading();
				}
			};


			this.mix(a, configs);
			a.success = function (result) {
                configs.success(result);
			};

			$.ajax(a);
		},


		/**
		 * 合并对象
		 * @param target
		 * @param source
		 */

		mix: function (target, source) {
			var k;
			for (k in source) {
				target[k] = source[k];
			}
		},

		/**
		 * 克隆对象和数组
		 * @param obj
		 * @returns {{}}
		 */
		clon: function (obj) {
			var newObj = {}, self = this;

			if(self.isArray(obj)){
				newObj = [];
			}

			var cloneObject = (function (a, b) {
				if (self.isObject(a)) {
					for (k in a) {
						if (a.hasOwnProperty(k)) {
							if (self.isObject(a[k])) {
								b[k] = {};
								arguments.callee(a[k], b[k]);
							} else if (self.isArray(a[k])) {
								b[k] = [];
								arguments.callee(a[k], b[k]);
							} else {
								b[k] = a[k];
							}
						}
					}
				} else if (self.isArray(a)) {
					for (k in a) {
						if (self.isObject(a[k])) {
							b[k] = {};
							arguments.callee(a[k], b[k]);
						} else if (self.isArray(a[k])) {
							b[k] = [];
							arguments.callee(a[k], b[k]);
						} else {
							b[k] = a[k];
						}
					}
				}
			}(obj, newObj));

			return newObj;
		},


		gather: {},

		query: function (name,href) {
			if (!name) {
				return false;
			}

			this._queryArray || (this._queryArray = []);


			if (this._queryArray.length && 1===2) {
				return this._queryArray[name];
			} else {
				href = href || window.location.href;
				href = href.replace(/#[^&]*$/, '');//去除锚点

				var reg = /\?(.+)/,
					m = href.match(reg);

				if (m && m[1]) {
					var s = m[1].split('&');
					for (a in s) {
						var b = s[a].split('='),
							k = b[0],
							v = b[1];

						this._queryArray[k] = v;
					}

                    if(this._queryArray[name]){
                        return this._queryArray[name];
                    }else{
                        return '';
                    }


				} else {
					return '';
				}
			}
		},

        //调用模拟数据
        simulate:function(api,back){
            this.ajax({
                url: 'http://localhost/ThinkPHP/index.php/Home/Api/api?project=cps&api='+api,
                async:false,
                dataType:'jsonp',
                success: function (result) {
                    result = JSON.parse(decodeURIComponent(result));

                    if(back && g.isFunction(back)){
                        back(result);
                    }
                }
            })
        },

        showErrorLable:function(target,msg){
            target.parent().find('label.validator_error').remove();
            target.parent().append('<label class="validator_error">'+msg+'</label>');
        },

        //获取时间 addDayCount为天数
        getDateStr: function (addDayCount) {
            addDayCount = addDayCount || 0;

            var dd = new Date();
            dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            var d = dd.getDate();

            if(m<10){
                m = '0'+m;
            }

            if(d<10){
                d='0'+d;
            }

            return y + "-" + m + "-" + d;
        },


        openAppIframe : function (url) {
            if(!this.query('fr',url)){
                if(this.query('fr')){
                    url = url+'&fr='+this.query('fr');
                }
            }

            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = url;
            document.body.appendChild(a);
        },

        shareHtml:''

	};

	return common;
});



