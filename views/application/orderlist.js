define(['Vue', 'text!views/application/orderList.html', 'pager'], function(Vue,htmlTemplate) {
    var temp, orderList;
    temp = htmlTemplate;

    orderList = Vue.extend({
        template: temp,
        data: function() {
            return {
                titles: ['name', 'price', 'amount', 'realAmount', 'sales', 'time'],
                items: []
            };
        },
        ready:function(){
          console.log('do ajax here');
            var url = '../resources/json/product-list.json';
            this.$http.get(url).then(function(response) {
                this.$set('items', response.data.data.lists)
            }, function(response) {
                // error callback
                console.error(response);
            });
        }
    })

    Vue.component('orderList', orderList);

    return orderList;

});
