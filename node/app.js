var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var assert = require('express');

var app = express();
var router = express.Router();
var urlencoderParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.use('/', express.static('../'))

var url = 'mongodb://localhost>27017/test'

/*
app.use('/css', express.static('../css'));
app.use('/js', express.static('../js'));
app.use('/images', express.static('../images'));
app.use('/html', express.static('../html'));
*/

app.get('/', (req, res) => {
    res.sendFile('index');
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
    console.log(JSON.stringify(req.body, null, 2));
});
//      FIN REGISTER


//  BASE DE DATOS

var data = [{item: 'anda1'}, {item: 'anda2'}]

app.get('/login', function(req, res){
    res.sendFile('login', {datas: data});
});

app.listen(3000, () => {
    console.log('estoy escuchando a puerto 3000');
}); 
