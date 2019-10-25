var express = require('express');
var bodyParser = require('body-parser');
var assert = require('express');
var morgan = require('morgan');
var path = require('path');
var moongose = require('mongoose')
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var router = express.Router();
var urlencoderParser = bodyParser.urlencoded({extended: false});

moongose.connect('mongodb://localhost/MedHealth-mongo', 
    {useNewUrlParser: true, useUnifiedTopology: true});
 
var db = moongose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// SCHEMAS
var RegisterMongo = require(__dirname + '/models/register.js');
// FIN SCHEMAS

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', express.static('views'))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'MedHealth',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});

 
//      LOGIN
app.get('/login', async(req, res) => {
    res.render('login', {root: 'views/html'});
});

app.post('/login',urlencoderParser, async(req, res) => {
    res.render('login', {root: 'views/html'});
});
//      FIN LOGIN

//      REGISTER
app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/register', urlencoderParser, async(req, res) => { 
    const Register = new RegisterMongo(req.body);
    await Register.save();
    res.render('register');
});
//      FIN REGISTER

app.listen(3000, () => {
    console.log('estoy escuchando a puerto 3000');
}); 

/*
ver cosas de la base de datos por consola 

var RegisterMongo = require(__dirname + '/models/register.js');
        (esto)

const tasks = await (VA ACA) .find();
    console.log(tasks); 


ver cosas posteadas en e formulario html

console.log(JSON.stringify(req.body, null, 2));
*/