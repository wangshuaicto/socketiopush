new Vue({
  el: '#app',
  data: function () {
    return {
      visible: false,
      data: [{
        label: '汉口区东闸门管线工程'
      },
      {
        label: '江汉区户部巷东街6线'
      },
      {
        label: '龟山北路G31沿线管线',
        children: [{
          label: '地图数据',
          children: [{
            label: '地图数据'
          },
          {
            label: '其他说明文档'
          }]
        },
        {
          label: '其他说明文档'
        }]
      }],
      viewpoints: []
    }
  },
  mounted() {
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
    map.enableScrollWheelZoom();
    // var mapType1 = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] });
    var mapType2 = new BMap.MapTypeControl({ anchor: BMAP_ANCHOR_TOP_RIGHT });
    // map.addControl(mapType1);          //2D图，卫星图
    map.addControl(mapType2);
    var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    var overViewOpen = new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT });
    //添加地图类型和缩略图
    map.addControl(overViewOpen);      //右下角，打开
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);

    // var polyline = new BMap.Polyline([
    //   new BMap.Point(116.399, 39.910),
    //   new BMap.Point(116.405, 39.920),
    //   new BMap.Point(116.423493, 39.907445)
    // ], { strokeColor: "red", strokeWeight: 20, strokeOpacity: 0.5 });   //创建折线
    // map.addOverlay(polyline);   //增加折线

    // var polygon = new BMap.Polygon([
    //   new BMap.Point(116.387112, 39.920977),
    //   new BMap.Point(116.385243, 39.913063),
    //   new BMap.Point(116.394226, 39.917988),
    //   new BMap.Point(116.401772, 39.921364),
    //   new BMap.Point(116.41248, 39.927893)
    // ], { strokeColor: "red", strokeWeight: 20, strokeOpacity: 0.5 });  //创建多边形
    // map.addOverlay(polygon);   //增加多边形

    // var point = new BMap.Point(116.400244, 39.92556);
    // var marker = new BMap.Marker(point);  // 创建标注
    // map.addOverlay(marker);              // 将标注添加到地图中

    // var start = "天安门";
    // var end = "百度大厦";
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

    //三种驾车策略：最少时间，最短距离，避开高速
    // var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
    // var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: 'BMAP_DRIVING_POLICY_LEAST_TIME' });
    // driving.setSearchCompleteCallback(function (data) {
    //   console.log('=============');
    //   console.log(...arguments);
    // });
    // driving.search(start, end);
    //连接socket后端服务器
    var points = this.viewpoints;
    var socket = io.connect("ws://127.0.0.1:9999");
    socket.on('sendpoi', function (obj) {
      var point = new BMap.Point(parseFloat(obj.poi.split(',')[0]), parseFloat(obj.poi.split(',')[1]));
      points.push(point);
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);              // 将标注添加到地图中
      var centerroom = map.getViewport(points);
      map.centerAndZoom(centerroom.center, centerroom.zoom);
    });
  }
});