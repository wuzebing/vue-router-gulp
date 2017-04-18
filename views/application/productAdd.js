define(['Vue', 'text!views/application/productAdd.html'], function(Vue,htmlTemplate) {
    var temp, productAdd;
    temp = htmlTemplate;

    productAdd = Vue.extend({
        template: temp,
        data: function() {
            return {
                titles: ['商品名称', '售价', '显示库存', '实际库存', '销量', '发布时间', '操作'],
                items: []
            };
        },
        methods: {
            // search: function() {
            //     console.info('do search');
            // },
            // export: function() {
            //     console.info('do export');
            // },
            // order: function() {
            //     // 排序：TODO(利用filter实现)
            // },
            // goPrev: function() {
            //     var url = '../json/product-list.json';
            //     this.$http.get(url).then(function(response) {
            //         // 初始化数据
            //         console.info('Prev: get by ajax');
            //         this.$set('lists', response.data.data.lists)
            //     }, function(response) {
            //         // error callback
            //         console.error(response);
            //     });
            // },
            // goNext: function() {
            //     var url = '../json/product-list.json';
            //     this.$http.get(url).then(function(response) {
            //         // 初始化数据
            //         console.info('Next: get by ajax');
            //         this.$set('lists', response.data.data.lists)
            //     }, function(response) {
            //         // error callback
            //         console.error(response);
            //     });
            // }
        },
        ready: function() {
        }
    });

    return productAdd
});
