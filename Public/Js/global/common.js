/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */



define(['./configs', './storage', './hack'], function (configs, storage, hack) {
	var toString = {}.toString,
		$ = window.$,
		UA = window.navigator.userAgent;


	window.com = common = {

        isFunction: function (it) {
            return toString.call(it) === "[object Function]";
        },

        isString: function (it) {
            return toString.call(it) === "[object String]";
        },

        isNumber:function(it){
            return toString.call(it) === "[object Number]";
        },

        isBoolean:function(it){
            return toString.call(it) === "[object Boolean]";
        },

        isNull:function(it){
            return (it === null);
        },

        isArray: function (it) {
            return toString.call(it) === "[object Array]";
        },

        isObject: function (it) {
            return toString.call(it) === "[object Object]";
        },

        isBaseType:function(it){
            return (!this.isArray(it) && !this.isObject(it));
        },

        isUrl:function(it){
            return (/^http:\/\//i.test(it));
        },

        isgImgUrl:function(it){
            it = it.trim();
            return /\.(jpeg|jpg|gif|png|bmp)(\?.*)*$/i.test(it);
        },

        isJsonP:function(it){
            return /^\w+\([\[\{].*[\}\]]\)$/.test(it);
        },

        isJson:function(it){
            return /^[\{\[].*[\}\]]$/.test(it);
        },

        /**
         * 鑾峰彇鏁版嵁绫诲瀷 灏忓啓
         * @param it
         * @returns {*}
         */
        getType:function(it){
            var type = toString.call(it);
            var m = type.match(/\s(\w+)\]$/i);
            type = m[1].toLowerCase().trim();

            return type;
        },

        /**
         * 鑾峰彇瀵硅薄闀垮害
         */
        getObjectLength:function(obj){
            var i=0;
            for(k in obj){
                i++;
            }

            return i;
        },


		ua:UA,

		getRender: function (url, config) {
			return new EJS({url: url}).render({md: config})
		},

		dialog:function(config){
			if(!config.content){
				var url = config.url || 'tpl/dialog';
				delete config.url;
				config.content = this.getRender(url,config);
			}
			return dialog(config);
		},
		alert:function(config){

			if(!config){
				config={};
			}
			if(!config.content){
				config.url = config.url || 'tpl/alert';
			}

			config.className='alertDialog';

			return this.dialog(config)
		},

		showLoading: function () {
			var config = {
				url: 'tpl/loading',
				className: 'loadingDialog'
			};

			this.dialog(config);
		},

		removeLoading: function () {
			$('.loadingDialog').remove();
		},

        bindEnterKey:function(func,target){
            var self = this;

            if(this._bindEnterKeyFuns){
                this._bindEnterKeyFuns.push(func);
            }else{
                this._bindEnterKeyFuns=[];
                this._bindEnterKeyFuns.push(func);
            }

            $(window).bind('keydown',function(e){
                e = e || window.event;

                if(e.keyCode===13){

                    for(var i=0;i<self._bindEnterKeyFuns.length;i++){
                        if(target){
                            self._bindEnterKeyFuns[i].call(target);
                        }else{
                            self._bindEnterKeyFuns[i]();
                        }
                    }
                }
            });
        },

		ajax: function (configs) {
			var self = this;
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
				success: function (result) {
					//alert('b')
				},
				error: function () {
					//alert('sdf');
				},
				complete: function (result) {
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


			if (this._queryArray.length) {
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

					return this._queryArray[name];

				} else {
					return '';
				}
			}
		}

	};

	return common;
});



