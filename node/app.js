var express = require('express');
var bodyParser = require('body-parser');
var assert = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
var router = express.Router();
var urlencoderParser = bodyParser.urlencoded({extended: false});

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use('/', express.static('views'))
app.use(morgan('dev'));



/*
app.use('/css', express.static('../css'));
app.use('/js', express.static('../js'));
app.use('/images', express.static('../images'));
app.use('/html', express.static('../html'));
*/

app.get('/', (req, res) => {
    res.render('index.ejs');
});


//      LOGIN
app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: 'views/html'});;
});
  
app.post('/login',urlencoderParser, (req, res) => {
    res.sendFile('login.html', {root: 'views/html'});
    console.log(JSON.stringify(req.body, null, 2));
});
//      FIN LOGIN

//      REGISTER
app.get('/register', (req, res) => {
    res.sendFile('register.html', {root: 'views/html'});
});

app.post('/register', urlencoderParser, (req, res) => {
    res.sendFile('register.html', {root: 'views/html'});
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
