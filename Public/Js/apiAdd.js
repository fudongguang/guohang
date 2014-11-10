/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['./global/global', './data/data', './lib/Validator'], function (g, data, Validator) {
    var IndexController = FishMVC.View.extend({
        init: function () {

            var e = document.getElementById("codeEditor");
            var codeEditor = new JSONEditor(e, {mode: "code", change: function () {

            }, error: function (e) {

            }});
            var p = {array: [1, 2, 3], "boolean": !0, "null": null, number: 123, object: {a: "b", c: "d", e: "f"}, string: "Hello World"};
            codeEditor.set(p);

            console.log(codeEditor.get());

            this.validator = new Validator({
                context: "#form"
            });

            this.result.val(decodeURIComponent(this.result.val()));
            this.params.val(decodeURIComponent(this.params.val()));
        },
        elements: {
            '#submitButton': 'submitButton',
            '#form': 'form',
            '#result':'result',
            '#params':'params'
        },
        events: {
            'click submitButton': 'doSubmit'
        },
        doSubmit: function () {
            if (this.validator.valid()) {
                this.result.val(encodeURIComponent(this.result.val().trim()));
                this.params.val(encodeURIComponent(this.params.val().trim()));
                this.form.submit();
            }

            return false;
        }


    });
    var indexController = new IndexController({el: $('.wrapper')});
});