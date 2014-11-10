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
            this.validator = new Validator({
                context: "#form"
            });

            g.bindEnterKey(this.doSubmit, this);
        },
        elements: {
            '#submitButton': 'submitButton',
            '#form': 'form'
        },
        events: {
            'click submitButton': 'doSubmit'
        },
        doSubmit: function () {
            if (this.validator.valid()) {
                this.form.submit();
            }

            return false;
        }
    });
    var indexController = new IndexController({el: $('.wrapper')});
});