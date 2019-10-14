var express = require('express');
var bodyParser = require('body-parser');
var assert = require('express');
var morgan = require('morgan');
var path = require('path');
var moongose = require('mongoose')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
app.get('/login', async(req, res) => {
    const tasks = await RegisterMongo.find();
    console.log(tasks); 
    
    res.render('login', {root: 'views/html'});
});

app.post('/login',urlencoderParser, async(req, res) => {
//  autenticacion
    var email = req.body.email
    console.log(email)

    var emailDB = RegisterMongo.find(req.body.email)
    console.log(emailDB)
    if(emailDB){
        console.log('anda')
    }
    else{
        console.log('no anda')
    }
/*
    passport.use(new LocalStrategy({
        usenameField = req.body.email
    }, async (email, password, done) => {
        const userAutentified = await RegisterMongo.findOne({email : req.body.email})
        if(!userAutentified){
            return done(null, false, res.render('register', {root: 'views/html'}));
        }
        else{
            const passwordAutentified = await RegisterMongo.matchPassword(password);
        if(match){
            return done(null, res.render('index'))
        }
        else{
            return done(null, false, res.post('contraseña incorrecta'))
        }
        }
    }));
*/
    res.render('login', {root: 'views/html'});
    
});
//      FIN LOGIN

//      REGISTER
app.get('/register', (req, res) => {
    res.render('register', {root: 'views/html'});
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

/*
ver cosas de la base de datos por consola 

var RegisterMongo = require(__dirname + '/models/register.js');
        (esto)

const tasks = await (VA ACA) .find();
    console.log(tasks); 


ver cosas posteadas en e formulario html

console.log(JSON.stringify(req.body, null, 2));
*/