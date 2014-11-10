/**
 * Created with IntelliJ IDEA.
 * User: huangjianhua
 * Date: 14-05-27
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define([], function (g) {
    function Validator(params){
        var defaultParam = {
            placeholder: "data-validator",
            context: window,
            container: null,
            errorClass: "validator_error",
            _counter: 0
        };
        $.extend(this, defaultParam, params || {});
    }
    Validator.prototype._validation = function (ele) {
        var msg = null, validate = ele.attr(this.placeholder);
        if (!!validate) {
            var value = ele.val(),
                validate = $.parseJSON(validate);
            for (v in validate) {
                if (v == "messages")
                    continue;
                switch (v) {
                    case "maxLength":
                        if(ele.is("select")){
                            if(ele[0].options.length>validate[v]){
                                msg = validate["messages"][v];
                            }
                        } else if (!this[v](value, validate[v])) {
                            msg = validate["messages"][v];
                        }
                        break;
                    case 'maxTo':
                    case "maxEqualTo":
                    case "minEqualTo":
                        if (!this[v](ele, validate[v])) {
                            msg = validate["messages"][v];
                        }
                        break;
                    case "custom":
                        if (!this[v](value,ele,validate)) {
                            msg = validate["messages"][v];
                        }
                        break;
                    default:
                        if (!this[v](value, validate[v])) {
                            msg = validate["messages"][v];
                        }
                        break;
                }
                if (!!msg) {
                    break;
                }
            }
            return msg;
        }
    };
    Validator.prototype.showLabel = function (ele, msg) {
        var label = $('<label/>').addClass(this.errorClass).html('<span>'+msg+'</span>');
        this.errorPlacement(label, ele);
        ele.addClass(this.errorClass);
        if (!!this.container) {
            this.container.append(label);
        }
    };
    Validator.prototype.errorPlacement = function (label, ele) {
        ele.parent().append(label);
    };
    Validator.prototype.clear = function(){
        $(this.context).find("label[class=" + this.errorClass + "]").remove();
        $(this.context).find("." + this.errorClass).removeClass(this.errorClass);
    };
    Validator.prototype.valid = function (dom) {
        this.clear();
        var context, isSuccess = true;
        if (!!dom) {
            context = $(dom);
        } else {
            context = $(this.context).find("[" + this.placeholder + "]");
        }
        var that = this;
        context.each(that.hitch(this, function (i, ele) {
            var msg = this._validation($(ele));
            if (!!msg) {
                this.showLabel($(ele), msg);
                isSuccess = false;
            }
        }));


        return isSuccess
    };
    Validator.prototype.hitch = function (scope, method) {
        return !scope ? method : function () { return method.apply(scope, arguments || []); };
    };
    Validator.prototype.custom = function (value) {
        return true;
    };
    Validator.prototype.required = function (value) {
        if(value==null)
            return false;
        else
            return !(/^\s*$/).test(value);
    };
    Validator.prototype.range = function (value, params) {
        if (!this.required(value))
            return true;
        value = parseFloat(value);
        return params[0] <= value && value <= params[1];
    };
    Validator.prototype.rangeString = function(value,params){
        if (!this.required(value))
            return true;
        var length = value.length;
        return params[0] <= length && length <= params[1];
    };
    Validator.prototype.maxLength = function (value, maxLength) {
        if (!this.required(value))
            return true;
        return value.length <= maxLength;
    };
    Validator.prototype.date = function (value) {
        if (!this.required(value))
            return true;
        return !/Invalid|NaN/.test(new Date(value).toString());
    };
    Validator.prototype.number = function (value) {
        if (!this.required(value))
            return true;
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    };
    Validator.prototype.digits = function (value) {
        if (!this.required(value))
            return true;
        return /^\d+$/.test(value);
    };
    Validator.prototype.phoneNo = function(value){
        if (!this.required(value))
            return true;
        return /^[1][3458]\d{9}$/.test(value);
    };
    Validator.prototype.image = function(value){
        if (!this.required(value))
            return true
        var data = value.split(".");
        if(data.length<=1)
            return false;
        return /^(jpg|gif|png|bmp)$/i.test(data[data.length-1].toLocaleLowerCase());
    };
    Validator.prototype.url = function(value){
        if (!this.required(value))
            return true;
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
    };
    Validator.prototype.maxTo = function (current, target) {
        current = $(current);
        if (!this.required(current.val()))
            return true;
        var cv = parseFloat(current.val());
        if (target === "prev") {
            tv = parseFloat(current.prev().val());
        } else {
            tv = parseFloat($(target).val());
        }
        return tv < cv;
    };
    Validator.prototype.maxEqualTo = function (current, target) {
        current = $(current);
        if (!this.required(current.val()))
            return true;
        var cv = parseFloat(current.val());
        if (target === "prev") {
            tv = parseFloat(current.prev().val());
        } else {
            tv = parseFloat($(target).val());
        }
        return tv <= cv;
    };
    Validator.prototype.minEqualTo = function (current, target) {
        current = $(current);
        if (!this.required(current.val()))
            return true;
        var cv = parseFloat(current.val());
        if (target === "prev") {
            tv = parseFloat(current.prev().val());
        } else {
            tv = parseFloat($(target).val());
        }
        return cv <= tv;
    };
    Validator.prototype.match = function(value,m){
        if (!this.required(value))
            return true;

        var k = new RegExp(m);
        return k.test(value);
    };

    return Validator;
});
