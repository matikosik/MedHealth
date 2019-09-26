var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var assert = require('assert');

app.use('/', express.static('../'));

var app = express();
var urlencoderParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());

/*
app.use('/css', express.static('../css'));
app.use('/js', express.static('../js'));
app.use('/images', express.static('../images'));
app.use('/html', express.static('../html'));
*/

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: '../'});
});


//      LOGIN
app.get('/login', (req, res) => {
    res.sendFile('Login.html', {root: '../html'});;
});
  
app.post('/login',urlencoderParser, (req, res) => {
    res.sendFile('Login.html', {root: '../html'});
    console.log(JSON.stringify(req.body, null, 2));
});
//      FIN LOGIN

//      REGISTER
app.get('/register', (req, res) => {
    res.sendFile('Register.html', {root: '../html'});
});

app.post('/register', urlencoderParser, (req, res) => {
    res.sendFile('Register.html', {root: '../html'});
    console.log(req.body);
});
//      FIN REGISTER

app.listen(3000, () => {
    console.log('estoy escuchando a puerto 3000');
}); 

/*
var server  = http.createServer(function(req, res){
    console.log('se pidio algo al servidor ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('../index.html').pipe(res);
});

server.listen(3000, 'localhost');
console.log('estoy escuchando a puerto 3000')
*/
