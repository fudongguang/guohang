/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 14-2-10
 * Time: AM11:40
 * 思路：当跳到一个上下左右都不能走的点就从起点重新跳。
 */


(function () {
	var root = window;

	var Fish = {};
	Fish.Version = '0.1.0';//版本号
	Fish.$ = root.jQuery || root.Zepto || root.$;


	var isFunction = function (it) {
		return {}.toString.call(it) == "[object Function]";
	};

	var isString = function (it) {
		return {}.toString.call(it) == "[object String]";
	};

	var isArray = function (it) {
		return {}.toString.call(it) == "[object Array]";
	};

	var isObject = function (it) {
		return {}.toString.call(it) == "[object Object]";
	};

	/**
	 * 克隆对象和数组
	 * @param obj
	 * @returns {{}}
	 */
	var clon = function (obj) {
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
	};


	var slice = [].slice;


	var Events = Fish.events = {
		//绑定事件 格式 “change:age” ，context为调用上下文
		on: function (name, callback, context) {
			this._events || (this._events = {});
			var events = this._events[name] || (this._events[name] = []);
			events.push({callback: callback, context: context || this});
			return this;
		},

		once: function (name, callback, context) {
			var self = this;
			var once = function () {
				self.off(name);
				callback.apply(this, arguments);
			};

			this.on(name, once, context);
		},

		off: function (name) {
			var names, i, l, j, k;

			if (!name) {
				return this;
			}

			if(isString(name)){
				names=[name];
			}else{
				names = name;
			}

			for (i = 0, l = names.length; i < l; i++) {
				name = names[i];
				delete this._events[name];
			}
		},

		trigger: function (name) {
			if (!this._events) return this;
			var args = slice.call(arguments, 1);
			var events = this._events[name];
			var allEvents = this._events.all;
			if (events) triggerEvents(events, args);
			if (allEvents) triggerEvents(allEvents, arguments);
			return this;
		}
	};

	var triggerEvents = function (events, args) {
		var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
		switch (args.length) {
			case 0:
				while (++i < l) (ev = events[i]).callback.call(ev.context);
				return;
			case 1:
				while (++i < l) (ev = events[i]).callback.call(ev.context, a1);
				return;
			case 2:
				while (++i < l) (ev = events[i]).callback.call(ev.context, a1, a2);
				return;
			case 3:
				while (++i < l) (ev = events[i]).callback.call(ev.context, a1, a2, a3);
				return;
			default:
				while (++i < l) (ev = events[i]).callback.apply(ev.context, args);
		}
	};


	var Module = Fish.Module = function(attributes,options){
		this.attributes = {};
		this.set(attributes,options);
	};

	Module.prototype = {
		get:function(key){
			return this.attributes[key];
		},

		del:function(key){
			delete this.attributes[key];
			this.trigger('del:'+key,this)
		},

		set:function(attrs,options){
			var attr,silent,del,changing,current = [],changes=[],val;

			options || (options = {});

			silent = options.silent;
			del = options.del;
			current = this.attributes;

			for(attr in attrs){
				val = attrs[attr];
				changes.push(attr);

				if(del){
					this.del(attr);
				}else{
					current[attr]=val;
				}
			}


			if(!silent){
				for(var i=0;i<changes.length;i++){
					this.trigger('change:'+changes[i],this,current[changes[i]],options);
				}
			}

			return this;
		}
	};


	//视图对象
	var View = Fish.View = function (includes) {
		this.initializer.apply(this, arguments);
		this.init.apply(this, arguments);
		this.fn = this.constructor.prototype;
	};


	View.prototype = {
		proxy: function (func) {
			return $.proxy(func, this);
		},

		include: function (obj) {
			$.extend(this.fn, obj);
		},

		init: function () {
		},

		initializer: function (options) {
			for (var key in options) {
				this[key] = options[key];
			}


			if (this.elements) {
				this.refreshElements();
			}

			if (this.events) {
				this.delegateEvents();
			}
		},

		$: function (selector) {
			this.el || (this.el=$(document.body));
			return this.el.find(selector);
		},

		eventSplitter: /^(\w+)\s*(.*)$/,

		delegateEvents: function () {
			for (var key in this.events) {
                var tempArr = this.events[key].split(',');

                for(var ii=0;ii<tempArr.length;ii++){
                    var methodName = tempArr[ii];

                    var tempethodA = (function(methodName){
                        return function(target,event){
                            return this[methodName](target,event);
                        }
                    }(methodName));

                    var tempethod = this.proxy(tempethodA);
                    var method = (function(tempethod){
                        return function(event){
                            if(!tempethod){
                                console.log('未找到方法');
                            }

                            return tempethod($(this),event);
                        };
                    }(tempethod));


                    var match = key.match(this.eventSplitter);
                    var eventName = match[1], selector = match[2];

                    if (selector === '') {
                        this.el.bind(eventName, method);
                    } else {
                        if (selector.search(/_rel$/) !== -1) {
                            selector = this[selector+'Selector'];
                        }

                        if((this[selector] && this[selector].length) || selector){
                            if(window.Zepto){
                                this.el.delegate(this[selector]['elSelector'], eventName, method);
                            }else{
                                this.el.delegate((this[selector] && this[selector]['selector']) ? this[selector]['selector'] : selector, eventName, method);
                            }
                        }
                    }
                }
			}
		},

		//更新元素
		refreshElements: function () {
			var self = this;
			for (var key in this.elements) {

				var keyName = this.elements[key];

				if (keyName.search(/_rel$/) !== -1) {
					this[keyName+'Selector'] = key;

					var name = keyName.replace(/_rel$/, '');
					this[keyName] = (function (key, name) {
						return function () {
							self[name] = self.$(key);
                            self[name]['elSelector'] = key;
                            return self[name];
                        }
					}(key, name));
				} else {
					var a = this.$(key);
					this[keyName] = a;
                    this[keyName]['elSelector'] = key;
				}
			}
		}
	};

	//返回一个函数用于对象实例化
	var extend = function (obj) {


		var self = this;
		var child = function () {
			self.apply(this, arguments);
		};

		var createObj = function(obj){
			var a = function(){

			};

			a.prototype = obj;

			return new a();
		};


		child.prototype = createObj(this.prototype);

		$.extend(child.prototype, obj);

		return child;
	};

	Module.extend=View.extend = extend;

	$.extend(Module.prototype, Events);
	window.FishMVC = Fish;
})();