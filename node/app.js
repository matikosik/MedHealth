var express = require('express');
var bodyParser = require('body-parser');
var moongose = require('mongoose')
var path = require('path');
var morgan = require('morgan');
const openGeocoder = require('node-open-geocoder');

var app = express();
var urlencoderParser = bodyParser.urlencoded({extended: false});

moongose.connect('mongodb://localhost/MedHealth-mongo', 
    {useNewUrlParser: true, useUnifiedTopology: true});
 
var db = moongose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// SCHEMAS
var RegisterMongo = require(__dirname + '/models/register.js');
var DoctorsMongo = require(__dirname + '/models/doctors.js');
var CalendarsMongo = require(__dirname + '/models/calendar.js');
// FIN SCHEMAS

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', express.static('views'))
app.use(morgan('dev'));

//index
app.get('/', (req, res) => {
    res.render('index');
});
//fin index

//register
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
//fin register

//register doctor
app.get('/registerDoctor', async(req, res) => { 
    res.render('registerDoctor', {
        name,
        lastName,
        email
    });
});

app.post('/registerDoctor', urlencoderParser, async(req, res) => { 

    
    openGeocoder()
    .geocode(req.body.address)
    .end(async(err, res) => {
        var latitude = (res[0].lat)
        var longitude = (res[0].lon)

        const Register = new DoctorsMongo({ 
            email: email,
            address: req.body.address,
            phoneNumber: req.body.phonenumber,
            doctorType: req.body.doctorType,
            lat: latitude,
            lon: longitude
        });
        await Register.save();
    })

    res.redirect('/index2');
});
//fin register doctor

//login
app.get('/login', async(req, res) => {    
    const error = ('')
    res.render('login', {
        error
    });
});

var user;

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
            user = req.body.email;
            console.log(user);
            res.redirect('index2');
        }
    });  
});
//fin login

//index2
app.get('/index2', async(req, res) => {    
    res.render('index2', {
    });
});

var medic;
app.post('/index2',urlencoderParser, async(req, res) => {
    medic = (req.body.med)
    console.log(medic)
    if(req.body.med == 'Cardiology1'){
        console.log('anda')
    }
    else{
        console.log('andamal')
    }
    res.redirect('doctors');
});
//fin index2

//doctors
app.get('/doctors', (req, res) => { 
    console.log(medic);
    res.render('doctors',{
    });
});

app.post('/doctors', async(req, res) => { 

    res.render('doctors',{
    });
});
//fin doctors

app.get('/calendar', (req, res) => { 

    res.render('calendar',{
        user,
        //longitude
    });
});

app.post('/calendar', async(req, res) => { 

    res.render('calendar',{
        user,
        //longitude
    });
});

/*
openGeocoder()
  .geocode('fray justo sarmiento 2589')
  .end((err, res) => {
      console.log(res[0].lat);
      console.log(res[0].lon);
  })
*/
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


buscar en la db 

const findUser = DoctorsMongo.find({'address': '399 Pereida St'}, function(err, result) {
    console.log(result);
}); 
*/