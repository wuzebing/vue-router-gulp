define(['Vue', 'text!views/application/productList.html', 'pager'], function(Vue,htmlTemplate) {
    var temp, productList;
    temp = htmlTemplate;

    productList = Vue.extend({
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

    return productList;

});
