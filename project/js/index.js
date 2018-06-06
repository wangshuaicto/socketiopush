new Vue({
  el: '#app',
  data: function () {
    return {
      visible: false,
      map: {},
      data: [
        {
          label: '金潭路银潭路工程',
          children: [{
            label: '地图数据',
            coors: [114.294145, 30.680405,
              114.292707, 30.681429,
              114.290947, 30.68233,
              114.288934, 30.683044,
              114.287281, 30.683448,
              114.28358, 30.683448,
              114.281353, 30.682889,
              114.289689, 30.681554,
              114.288934, 30.680001,
              114.288359, 30.678914,
              114.289653, 30.67823,
              114.290731, 30.677516,
              114.286707, 30.679255,
              114.285305, 30.679349,
              114.283221, 30.679038,
              114.291521, 30.676646,
              114.29224, 30.675559,
              114.292851, 30.674534,
              114.29357, 30.673074,
              114.294216, 30.671552,
              114.295366, 30.669285,
            ]
          },
          {
            label: '其他说明文档'
          }]
        },
        {
          label: '龟山北路线杆工程',
          children: [{
            label: '地图数据',
            coors: [
              114.291108, 30.563289,
              114.290731, 30.562807,
              114.289455, 30.562807,
              114.288431, 30.562698,
              114.287299, 30.562652,
              114.286455, 30.562605,
              114.285431, 30.562527,
              114.284569, 30.562419,
              114.283473, 30.56203,
              114.28252, 30.561859,
              114.281874, 30.561937,
              114.280957, 30.562014,
              114.280203, 30.56217,
              114.278784, 30.562185,
              114.277921, 30.561874,
              114.276915, 30.56161,
              114.275981, 30.561346,
              114.274463, 30.561299,
              114.273457, 30.561548,
              114.27263, 30.561905,
              114.272504, 30.561206,
              114.27281, 30.560397,
              114.273187, 30.559946]
          },
          {
            label: '其他说明文档'
          }]
        }],
      viewpoints: []
    }
  },
  methods: {
    nodeclick(data) {
      // console.log(data);
      if (data.coors) {
        // 清楚所有覆盖物
        this.map.clearOverlays();
        this.viewpoints.length = 0;
        var xpoints = data.coors.filter((item, index) => {
          return index % 2 === 0;
        });
        var ypoints = data.coors.filter((item, index) => {
          return index % 2 !== 0;
        });
        // 绘制所有点
        xpoints.forEach((item, index) => {
          var point = new BMap.Point(item, ypoints[index]);
          this.viewpoints.push(point);
          var marker = new BMap.Marker(point);  // 创建标注
          this.map.addOverlay(marker);              // 将标注添加到地图中
          var centerroom = this.map.getViewport(this.viewpoints);
          this.map.centerAndZoom(centerroom.center, centerroom.zoom);
        });
      }
    }
  },
  mounted() {
    // console.log(this.map);
    this.map = new BMap.Map("allmap");
    var map1 = this.map;
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
    this.map.enableScrollWheelZoom();
    // var mapType1 = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] });
    var mapType2 = new BMap.MapTypeControl({ anchor: BMAP_ANCHOR_TOP_RIGHT });
    // map.addControl(mapType1);          //2D图，卫星图
    this.map.addControl(mapType2);
    var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    var overViewOpen = new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT });
    //添加地图类型和缩略图
    this.map.addControl(overViewOpen);      //右下角，打开
    this.map.addControl(top_left_control);
    this.map.addControl(top_left_navigation);

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
      map1.addOverlay(marker);              // 将标注添加到地图中
      var centerroom = map1.getViewport(points);
      map1.centerAndZoom(centerroom.center, centerroom.zoom);
    });
  }
});