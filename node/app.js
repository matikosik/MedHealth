var http = require('http');
var fs = require('fs');

var server  = http.createServer(function(req, res){
    console.log('se pidio algo al servidor' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('../index.html', null, function(error, data){
        if(error)
        {
            res.writeHead(404);
            res.write('No se encuentra el archivo');
        }
        else
        {
            res.write(data);
        }
        res.end();
    });
    //myReadStream.pipe(res);
});

server.listen(3000, 'localhost');
console.log('estoy escuchando a puerto 3000')
