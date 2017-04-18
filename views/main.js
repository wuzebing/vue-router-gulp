require(['css!resources/css/index',
         'jquery',
         'Vue',         
         'bootstrap',
         'app',
         'VueRouter',
         'VueResource',

         'resources/components/footer',
         'resources/components/header',
         'resources/components/utils',
         'resources/components/siderbar'

         // 'views/index'

         // 'views/application/productList',
         // 'views/application/productAdd',
         // 'views/application/orderlist'
     ], function(css,
                $,
                Vue,
                bootstrap,
                app,
                VueRouter,
                VueResource,

                footer,
                header,
                utils,
                siderbar

                // index

                // product,
                // productList,
                // orderList
    ) {
    // 使用插件
    Vue.use(VueRouter);
    Vue.use(VueResource);

    var App = Vue.extend({});

    var router = new VueRouter();

    var lazyLoading = function(url){
        return function(resolve){
            require([url],resolve);
        }
    }
    router.map({
        '/productList': {
            component: lazyLoading("views/application/productList")
        },
        '/productAdd': {
            component: lazyLoading("views/application/productAdd")
        },
        '/orderList': {
            component: lazyLoading("views/application/orderList")
        },
        '/': {
            component: lazyLoading("views/index")
        }
    })

    router.start(App, '#main')


    // 创建vue实例，用组件替换el元素
    // 组件替换需要在路由创建之后，否则会报错
    header.set('#main');
    siderbar.set('#main');
    // footer.set('#main');

// utils.alert();
//     utils.comfirm({
//         msg: '<h2>Hello wolrd 123</h2>',
//         yes: function() {
//             // 成功回调
//             console.log('yes');
//         },
//         no: function() {
//             // 失败回调
//             console.log('no');
//         }
//     });

    // 初始化各组件的事件
});

