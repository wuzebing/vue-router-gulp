define(['Vue','Three','KeyboardState','Stats','OrbitControls'], function(Vue,Three,KeyboardState,Stats) {
    var temp, index,baseUrl='ws://101.227.240.249',baseHttpUrl='http://101.227.240.249';

    var floors = [];

    var keyboard = new KeyboardState();

    var renderer,container;//声明全局变量（对象）
      //设置相机
    var camera;
    //设置场景
    var scene,controls,stats;
    var light;
    var meshs =[];

    var annie;

    var peopleMap={};

    var cameraZ=3000;

    temp = ' <div class="row">'
                  +'<ol class="breadcrumb">'
                      +'<li class="active"><i class="fa fa-fw fa-home"></i>首页</li>'
                      +'<li class="active">功能管理</a></li>'
                      +'<li >轨迹回访</li>'
                  +'</ol>'
              +'</div>'
              +'<div class="row" style="margin-left:0px;">'
                    +'<div id="canvas3d">'
              +'</div>';

    index = Vue.extend({
        template: temp,
        data: function() {
            return {
              
            };
        },
        methods: {
            getLayerList:function(){
                var _this = this;
                this.$http.post(baseHttpUrl+'/monitor/layer/queryList',{
                },function(data){
                    var returnObj = data.returnObj;
                    debugger;
                    floors = returnObj;
                    //for(var i=0;i<returnObj.length;i++){
                    for(var i=0;i<1;i++){
                        var obj = returnObj[i];
                        var floorTexture = new THREE.ImageUtils.loadTexture( '../resources/images/bg1.png' );
                        var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide} );
                        camera.position.z = obj.maxX-obj.minX;
                        var floorGeometry = new THREE.PlaneGeometry(obj.maxX-obj.minX, obj.maxY-obj.minY,1,1);
                        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
                        floor.position.z = -500*i;
                        scene.add(floor);
                    }
                    _this.getStationList();
                });
            },
            getStationList:function(){
                for(var i=0;i<floors.length;i++){
                    this.$http.post(baseHttpUrl+'/monitor/station/queryList',{
                        layerId:floors[i].id
                    },function(data){
                        var returnObj = data.returnObj;
                        for(var k=0;k<returnObj.length;k++){
                            var layerId = returnObj[k].layerId;
                            var floor = this.getIndexOfFloor(layerId);
                            var index = floor._index;
                            var geometry = new THREE.SphereGeometry( 24, 16, 16 );
                            var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
                            var mesh = new THREE.Mesh( geometry, material );
                            mesh.position.set(returnObj[k].geoX-floor._width/2,returnObj[k].geoY-floor._height/2,-300*index);
                            scene.add(mesh);
                        }

                    });
                }
               
            },
            getIndexOfFloor:function(floorId){
                for(var i=0;i<floors.length;i++){
                    var floor = floors[i];
                    if(floors[i].layerId == floorId){
                        floors[i]._index = i;
                        floors[i]._width = floors[i].maxX-floors[i].minX;
                        floors[i]._height = floors[i].maxY-floors[i].minY;
                        return floors[i];
                    }
                }
            },
            getMessageWebSorket:function(){
                var _this = this;
                if ("WebSocket" in window){   
                    console.log("WebSocket is supported by your Browser!");
                    var webSocket = new WebSocket( baseUrl+"/monitor/cardLocationWebsocket?layerId=1");
                    webSocket.onerror = function(event) {
                        console.log("onError");
                    };

                    webSocket.onopen = function(event) {
                        console.log("onOpen");
                        webSocket.send('hello');
                    };

                    webSocket.onmessage = function(event) {
                        console.log("onMessage");
                        var data = JSON.parse(event.data);
                        _this.continueConfirm(data);
                    };
                }
                else{
                    alert("WebSocket NOT supported by your Browser!");
                }
            },
            continueConfirm:function(data){
                var floor = this.getIndexOfFloor(data.layerId);
                if(!peopleMap[data.cardId]){
                    peopleMap[data.cardId] = data;
                    var geometry = new THREE.SphereGeometry( 16, 12, 16 );
                    var material = new THREE.MeshLambertMaterial( { color: 0x0000aa } );
                    var mesh = new THREE.Mesh( geometry, material );
                    mesh.position.set(data.geoX-floor._width/2,data.geoY-floor._height/2,-300*floor._index);
                    mesh._cardId = data.cardId;
                    scene.add(mesh);
                    meshs.push(mesh);
                }else{
                    var mesh = this.getMeshByCardId(data.cardId);
                    var newX = data.geoX-floor._width/2,newY = data.geoY-floor._height/2,z = -300*floor._index;
                    //this.animateMesh(mesh,newX,newY,z);
                  
                    mesh.position.set(newX,newY,z);
                }

                peopleMap[data.cardId].oldTime = (new Date()).getTime();
            },
            getMeshByCardId:function(cardId){
                for(var i=0;i<meshs.length;i++){
                    if(meshs[i]._cardId == cardId){
                        return meshs[i];
                    }
                }
            },
            initThree:function(){
                container = document.getElementById( 'canvas3d' );
                width = container.clientWidth;//获取画布「canvas3d」的宽
                height = container.clientHeight;//获取画布「canvas3d」的高
                renderer=new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
                renderer.setSize(width, height );//指定渲染器的高宽（和画布框大小一致）
                document.getElementById('canvas3d').appendChild(renderer.domElement);//追加 【canvas】 元素到 【canvas3d】 元素中。
                renderer.setClearColor(0x000088, 0.3);//设置canvas背景色(clearColor)
            },
            initCamera:function(){
                camera = new THREE.PerspectiveCamera( 45, width / height , 1 , 10000 );//设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
                camera.position.x = 0;//设置相机的位置坐标
                camera.position.y = 0;//设置相机的位置坐标
                camera.position.z = cameraZ;//设置相机的位置坐标
               
                camera.lookAt( {x:0, y:0, z:0 } );//设置视野的中心坐标
            },
            initScene:function(){
                scene = new THREE.Scene();

                // var floorMaterial1 = new THREE.MeshBasicMaterial( { map: floorTexture1, side: THREE.DoubleSide } );
                // var floorGeometry1 = new THREE.PlaneGeometry(2500, 1500);
                // var floor1 = new THREE.Mesh(floorGeometry1, floorMaterial1);
                // floor1.position.z = -300;
                // scene.add(floor1);

                // FPS
                stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.bottom = '0px';
                stats.domElement.style.zIndex = 100;
                // container.appendChild( stats.domElement );

                // CONTROLS
                controls = new THREE.OrbitControls( camera, renderer.domElement );
            },
            initLight:function(){
                light = new THREE.DirectionalLight(0xff0000, 1.0, 0);//设置平行光源
                light.position.set( 200, 200, 2000 );//设置光源向量
                scene.add(light);// 追加光源到场景
            },
            initObject:function(){
                // var geometry = new THREE.SphereGeometry( 16, 12, 16 );
                // var material = new THREE.MeshLambertMaterial( { color: 0x0000aa } );
                // for(var i=0;i<5;i++){
                //     var mesh = new THREE.Mesh( geometry, material );
                //     mesh.position.set(0,0,0);
                //     mesh.position.x = 100;
                //     scene.add(mesh);
                //     meshs.push(mesh);
                // }
            },
            threeStart:function(){
                //执行
                this.initThree();
                this.initCamera();
                this.initScene();
                this.initLight();
                this.initObject();
                renderer.clear();
                this.animate();
            },
            animate:function(){
                requestAnimationFrame(this.animate );
                renderer.render(scene, camera);
                this.update();
            },
            animateMesh:function(mesh,newX,newY,z){
                requestAnimationFrame(this.animateMesh );

                //var oldX = mesh.position.x,oldY = mesh.position.y,diffX = newX-oldX,diffY = newY-oldY,bigDiff = 
               
                mesh.position.set(newX,newY,z);
                renderer.render(scene, camera);
                this.update();
            },
            update:function(){
                 if ( keyboard.pressed("z") ){
                    // do something
                }

                controls.update();
                stats.update();
            }

        },
        ready:function(){
            this.threeStart();
            this.getLayerList();
            // this.getStationList();
            this.getMessageWebSorket();
        }
    })

    return index;

});
