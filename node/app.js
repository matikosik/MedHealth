var http = require('http');
var fs = require('fs');


const express = require('express')
var app = express()

app.get('/', function(req, res){
    res.send('hello world')
});

app.listen(3000)

/*
var server  = http.createServer(function(req, res){
    console.log('se pidio algo al servidor ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('../index.html').pipe(res);
});

server.listen(3000, 'localhost');
console.log('estoy escuchando a puerto 3000')
*/
