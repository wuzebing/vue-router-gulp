require.config({
    baseUrl: '../',
    paths: {
        jquery: 'resources/js/plugins/jquery/jquery.2.2.1',
        Vue: 'resources/js/plugins/vue/vue.1.0.17',
        VueRouter: 'resources/js/plugins/vue/vue-router.0.7.11',
        VueResource: 'resources/js/plugins/vue/vue-resource.0.7.0',
        bootstrap: 'resources/js/plugins/bootstrap/js/bootstrap',
        app : 'resources/js/plugins/dist/js/app.min',
        datetimepicker:'resources/js/plugins/bootstrap/js/bootstrap-datetimepicker.min',
        pager: 'resources/js/plugins/bootstrap-table/dist/bootstrap-table.min',
        Three: 'resources/js/plugins/threejs/Three',
        KeyboardState: 'resources/js/plugins/threejs/KeyboardState',
        Stats: 'resources/js/plugins/threejs/Stats',
        OrbitControls: 'resources/js/plugins/threejs/OrbitControls'
    },
    map: {
        '*': {
            'css': 'resources/js/require-css',
            'less': 'resources/js/require-less',
            'text': 'resources/js/require-text'
        }
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        Three: {
            exports: 'Three'
        },
        KeyboardState: {
            deps:['Three'],
            exports: 'KeyboardState'
        },
        Stats: {
            deps:['Three'],
            exports: 'Stats'
        },
        OrbitControls: {
            deps:['Three'],
            exports: 'OrbitControls'
        },
        bootstrap: {
            deps: ['jquery', 'css!resources/js/plugins/bootstrap/css/bootstrap'],
            exports: '$.fn.popover'
        },
        app:{
            deps : [ 'jquery','css!resources/js/plugins/dist/css/AdminLTE','css!resources/js/plugins/dist/css/skins/_all-skins.min.css','css!resources/js/plugins/css/font-awesome.min','css!resources/js/plugins/css/ionicons.min'],
            exports : 'app'
        },
        datetimepicker:['css!resources/js/plugins/bootstrap/js/bootstrap-datetimepicker.min'],
        pager: ['css!resources/js/plugins/bootstrap-table/dist/bootstrap-table.min']
    },
    // enforceDefine: true,
    urlArgs: 'v=' + new Date().getTime()
});
