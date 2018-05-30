var express = require('express'); // require express模块
var app = express(); //实例化一个express服务器
var proxy = require('http-proxy-middleware'); //代理
var http = require('http').Server(app);
var io = require('socket.io')(http);
var options = {
    target: 'http://182.18.19.154:18080', // 服务器
    // target: 'http://192.168.18.41:8080', // dongdong
    // target: 'http://192.168.18.11:8081', // sunyi
    // target: 'http://192.168.18.26:9090', // wangzl
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api' // 服务器
        // '^/api': '/itom-rest/api'
    }
};
var proxyOptions = proxy('/api', options); // 匹配/api的路径进行代理
app.use(proxyOptions); // express使用代理
app.use(express.static('project'));// express托管静态文件
app.get('/sendpoi', function (req, res) {
    // console.log(req.query.loc);
    io.emit('sendpoi', { poi: req.query.loc });
    res.send('坐标:' + req.query.loc + ' 推送成功');
});
io.on('connection', function (socket) {
    console.log('a client connected');
});
http.listen(9999,function(){
    console.log('server run http://localhost:9999');
});