define(['Vue'], function(Vue) {
    var temp, siderbar;

    temp = '<li class="treeview active" v-for="item in items">\
                <a>\
                    <i class="fa fa-table"></i> <span>{{item.name}}</span>\
                    <i class="fa fa-angle-left pull-right"></i>\
                </a>\
                <ul class="treeview-menu">\
                    <li v-for="it in item.subItems">\
                       <a href="{{it.url}}"><i class="fa fa-cog"></i>{{it.name}}</a>\
                    </li>\
                </ul>\
            </li>';        

    siderbar = Vue.extend({
        template: temp,
        data: function() {
            return {
                title: {
                    name: '首页',
                    url: '#'
                },
                items: [
                    {
                        name: '功能管理',
                        url: '#',
                        subItems: [
                            {
                                name: '实时跟踪',
                                url: '#productList'
                            }, {
                                name: '轨迹回放',
                                url: '#'
                            }, {
                                name: '视频联动',
                                url: '#'
                            }, {
                                name: '事件处理',
                                url: '#'
                            }, {
                                name: '人员巡更',
                                url: '#'
                            }, {
                                name: '人员查找',
                                url: '#'
                            }
                        ]
                    },{
                        name: '人员管理',
                        url: '#',
                        subItems: [
                        ]
                    },{
                        name: '系统管理',
                        url: '#',
                        subItems: [
                        ]
                    },{
                        name: '区域设备管理',
                        url: '#',
                        subItems: [
                           
                        ]
                    }
                ]
            };
        }
    });

    Vue.component('my-siderbar', siderbar);

    return {
        set: function(el) {
            new Vue({
                el: el
            });
        }
    };
});
