var path = require("path");
var express = require("express");
var request = require("request");
//var bodyParser = require('body-parser');
//var pino = require('express-pino-logger')();
const { createProxyMiddleware } = require('http-proxy-middleware');

// Define
const PORT = 4004;
const LOCAL_PATH = path.join(__dirname, "../build");
console.log('LOCAL_PATH:', LOCAL_PATH);

var app = express(); // create express app
app.use(express.static(LOCAL_PATH));
app.use(express.static("public"));

// PROXY

var env = require("../env/env");
// console.log('CURRENT_ENV:', env.NODE_ENV);
// console.log('MODE_ENV:', env.MODE_ENV.local);

app.use('/user_api', createProxyMiddleware({ target: env.MODE_ENV.local.api, changeOrigin: true, secure: false }));
// app.use('/cdn', createProxyMiddleware({ target: env.MODE_ENV.local.cloudapi, changeOrigin: true, secure: false }));
// app.use('/chat_api', createProxyMiddleware({ target: env.MODE_ENV.local.chatapi, changeOrigin: true, secure: false }));
// app.use('/chat_search', createProxyMiddleware({ target: env.MODE_ENV.local.chatsearch, changeOrigin: true, secure: false }));

// app.use('/hls', createProxyMiddleware({ target: 'http://192.168.157.144:9111', changeOrigin: true, secure: false }));
// app.use('/1', createProxyMiddleware({ target: 'http://192.168.157.144:9112', changeOrigin: true, secure: false }));
// app.use('/2', createProxyMiddleware({ target: 'http://192.168.157.144:9112', changeOrigin: true, secure: false }));

// let wsProxy = createProxyMiddleware('ws://172.18.210.18:15674/ws', { changeOrigin: true, ws: true });
// app.use(wsProxy);

// REACT
app.get('/*', (req, res) => {
    res.sendFile(LOCAL_PATH + "/index.html");
})

// START
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})