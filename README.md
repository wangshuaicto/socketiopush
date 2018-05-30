## 项目初衷
#### 是一个群里的网友需要这样一个简单的功能。就帮着弄了一下
#### 需求是通过一个地址将坐标发送到浏览器，然后浏览器地图上能够实时添加这个marker点

## 安装
```shell
npm install 
```
## 运行
```shell
npm run dev 
```

## 说明
``` javascript
server.js
  # 此处监听 http://ip:port/sendpoi?loc=116.3964,39.9093
  app.get('/sendpoi', function (req, res) {
    // console.log(req.query.loc);
    // socket.io 向客户端发送senpoi事件
    io.emit('sendpoi', { poi: req.query.loc });
    // 返回信息
    res.send('坐标:' + req.query.loc + ' 推送成功');
  });
project/js/index.js
 var socket = io.connect("ws://ip:port"); // 打开连接
 socket.on('sendpoi', function (obj) { //客户端监听服务器发送的senpoi事件
    var point = new BMap.Point(parseFloat(obj.poi.split(',')[0]), parseFloat(obj.poi.split(',')[1]));
    points.push(point);
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    var centerroom = map.getViewport(points);
    map.centerAndZoom(centerroom.center, centerroom.zoom);
  });
```
![](/project/imgs/pic1.png)