define(['Vue','text!resources/components/header.html','css!resources/css/header.css'], function(Vue,htmlTemplate) {

    var temp = '',
        header;

    temp = htmlTemplate;        

    header = Vue.extend({
        template: temp,
        data: function() {
            return {
            };
        }
    });

    Vue.component('my-header', header);

    return {
        set: function(el) {
            new Vue({
                el: el
            });
        }
    }
});
