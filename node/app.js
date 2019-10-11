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
    {useNewUrlParser: true, useUnifiedTopology: true});
 
var db = moongose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// SCHEMAS
var RegisterMongo = require(__dirname + '/models/register.js');
// FIN SCHEMAS

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use('/', express.static('views'))
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('index');
});

 
//      LOGIN
app.get('/login', (req, res) => {
    res.render('login', {root: 'views/html'});
});

app.post('/login',urlencoderParser, (req, res) => {
    res.render('login', {root: 'views/html'});
    console.log(JSON.stringify(req.body, null, 2));
});
//      FIN LOGIN

//      REGISTER
app.get('/register', async(req, res) => {

    const tasks = await RegisterMongo.find();
    console.log(tasks); 

    res.render('register', {root: 'views/html'}, {
        tasks
    });
});

app.post('/register', urlencoderParser, async(req, res) => { 
    const Register = new RegisterMongo(req.body);
    await Register.save();
    res.render('register', {root: 'views/html'});
});
//      FIN REGISTER

app.listen(3000, () => {
    console.log('estoy escuchando a puerto 3000');
}); 
