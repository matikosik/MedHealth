var express = require('express');
var bodyParser = require('body-parser');
var assert = require('express');
var morgan = require('morgan');
var path = require('path');
var moongose = require('mongoose')

var app = express();
var router = express.Router();
var urlencoderParser = bodyParser.urlencoded({extended: false});

moongose.connect('mongodb://localhost/MedHealth-mongo', 
    {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => console.log('se conecto la base de datos correctamente'))
    

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use('/', express.static('views'))
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('index.ejs');
});

 
//      LOGIN
app.get('/login', (req, res) => {
    res.render('login.ejs', {root: 'views/html'});
});
  // , {root: 'views/html'}
app.post('/login',urlencoderParser, (req, res) => {
    res.render('login.ejs', {root: 'views/html'});
    console.log(JSON.stringify(req.body, null, 2));
});
//      FIN LOGIN

//      REGISTER
app.get('/register', (req, res) => {
    res.render('register.ejs', {root: 'views/html'});
});

app.post('/register', urlencoderParser, (req, res) => {
    res.render('register.ejs', {root: 'views/html'});
    console.log(JSON.stringify(req.body, null, 2));
});
//      FIN REGISTER


//  BASE DE DATOS

/*
var data = [{item: 'anda1'}, {item: 'anda2'}]

app.get('/login', function(req, res){
    res.sendFile('login', {datas: data});
});
*/
app.listen(3000, () => {
    console.log('estoy escuchando a puerto 3000');
}); 
