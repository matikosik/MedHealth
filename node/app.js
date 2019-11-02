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
var DoctorsMongo = require(__dirname + '/models/doctors.js');
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
    const error = ('')
    res.render('login', {
        error
    });
});

app.post('/login',urlencoderParser, async(req, res) => {
    const findUser = await RegisterMongo.find({'email': req.body.email}, function(err, result) {
        if (result == ''){
            var error = 'User does not exist'
            res.render('login', {
                error
            });
        } 
        else if(req.body.password != result[0].password){
            var error = 'Wrong Password'
            res.render('login', {
                error
            });
        }
        else if(req.body.password == result[0].password){
            res.redirect('/index2');
        }
    });  
});
//      FIN LOGIN

//      REGISTER

app.get('/register', (req, res) => {
    const error = ('');
    res.render('register', {
        error
    });
});

var name
var lastName
var email

app.post('/register', urlencoderParser, async(req, res) => { 
    var errorArray = ['A user already exists using this email', 'El registro fue exitoso', ''];

    const savedUser = req.body;
    const user = await RegisterMongo.find({email: req.body.email});

    if(user == ''){  
        const Register = new RegisterMongo(req.body);
        await Register.save();
        console.log(req.body);
        const error = (errorArray[1]);
        console.log(error);

        if(req.body.mop == 'doctor'){
            name = savedUser.name;
            lastName = savedUser.lastName;
            email = savedUser.email;
            res.redirect('/registerDoctor');
        }
        else if(req.body.mop != 'doctor'){
            res.redirect('index2');
        }    
    }
    else{
        const error = (errorArray[0]);
        console.log(error);

        res.render('register', {
            error
        });
    }    
});
//      FIN REGISTER

app.get('/registerDoctor', async(req, res) => { 
    res.render('registerDoctor', {
        name,
        lastName,
        email
    });
});

app.post('/registerDoctor', urlencoderParser, async(req, res) => { 

    const Register = new DoctorsMongo({ 
        email: email,
        address: req.body.address,
        phoneNumber: req.body.phonenumber,
        doctorType: req.body.doctorType 
    });
    await Register.save();

    res.redirect('/index2');
});


app.get('/index2', async(req, res) => {    
    res.render('index2', {
    });
});

app.post('/index2',urlencoderParser, async(req, res) => {
    res.render('index2', {
    }); 
});

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