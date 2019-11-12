var express = require('express');
var bodyParser = require('body-parser');
var moongose = require('mongoose')
var path = require('path');
var morgan = require('morgan');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyCm62Zh7VrzfYqUhKhBdZjpEWkF8Ddl2hc',
    formatter: null
};

var geocoder = NodeGeocoder(options);

var app = express();
var urlencoderParser = bodyParser.urlencoded({ extended: false });

moongose.connect('mongodb+srv://matikosik:matias20@medhealth-rui79.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

var db = moongose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// SCHEMAS
var RegisterMongo = require(__dirname + '/models/register.js');
var DoctorsMongo = require(__dirname + '/models/doctors.js');
var CalendarMongo = require(__dirname + '/models/calendar.js');
var AvailabilityMongo = require(__dirname + '/models/availability.js');
// FIN SCHEMAS

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', express.static('views'))
app.use(morgan('dev'));

var datetime = new Date();
var day = ("0" + datetime.getDate()).slice(-2);
var month = datetime.getMonth() + 1
var year = datetime.getFullYear()


//index
app.get('/', (req, res) => {
    res.render('index');
    user = undefined;
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
    var errorArray = ['A user already exists using this email.', 'El registro fue exitoso', '', 'Passwords are not the same.'];

    const savedUser = req.body;
    const user = await DoctorsMongo.find({ email: req.body.email });

    if (user == '') {
        if (req.body.password != req.body.rptpassword) {
            const error = (errorArray[3]);
            console.log(error);

            res.render('register', {
                error
            });
        } else {
            const Register = new RegisterMongo(req.body);
            await Register.save();
            const error = (errorArray[1]);
            console.log(error);

            if (req.body.mop == 'doctor') {
                name = savedUser.name;
                lastName = savedUser.lastName;
                email = savedUser.email;
                res.redirect('/registerDoctor');
            } else if (req.body.mop != 'doctor') {
                res.redirect('login');
            }
        }
    } else {
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

    geocoder.geocode(req.body.address, async function(err, res) {
        var latitude = (res[0].latitude)
        var longitude = (res[0].longitude)
        const registerDoctor = new DoctorsMongo({
            email: email,
            name: name,
            lastName: lastName,
            address: req.body.address,
            phoneNumber: req.body.phonenumber,
            doctorType: req.body.doctorType,
            lat: latitude,
            lon: longitude
        });
        await registerDoctor.save();
    });

    res.redirect('/horarios');
});
//fin register doctor

//register availability
app.get('/horarios', async(req, res) => {
    console.log(email)
    res.render('horarios', {
        email
    })
});

app.post('/horarios', async(req, res) => {
    console.log(req.body)
    const saveHorarios = new AvailabilityMongo({
        doctor: email,
        days: req.body.day,
        hours: req.body.hour
    });
    await saveHorarios.save();
    res.redirect('login')
});
//fin register availability


//login
app.get('/login', async(req, res) => {
    const error = ('')
    res.render('login', {
        error
    });
});

var user;

app.post('/login', urlencoderParser, async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': req.body.email }, function(err, result) {
        if (result == '') {
            var error = 'User does not exist'
            res.render('login', {
                error
            });
        } else if (req.body.password != result[0].password) {
            var error = 'Wrong Password'
            res.render('login', {
                error
            });
        } else if (req.body.password == result[0].password) {
            user = req.body.email;
            //console.log(user); 
            res.redirect('index2');
        }
    });
});
//fin login

//index2
app.get('/index2', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)

    res.render('index2', {
        fullName,
        status,
        mail,
        day,
        month,
        year
    });
});

var medic;
app.post('/index2', urlencoderParser, async(req, res) => {
    medic = req.body.med
    res.redirect('doctors');
});
//fin index2

//doctors
var doctor;
app.get('/doctors', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)

    const findDoctors = await DoctorsMongo.find({ 'doctorType': medic }, function(err, result) {});

    const horariosDoctor = await AvailabilityMongo.find({ 'doctor': medic }, function(err, result) {});

    res.render('doctors', {
        fullName,
        status,
        mail,
        medic,
        findDoctors,
        day,
        month,
        year
    });
});

var doctor;
app.post('/doctors', async(req, res) => {
    doctor = req.body.whoMed;
    res.redirect('appointment')
});
//fin doctors

app.get('/calendar', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});
    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)

    const events = await CalendarMongo.find({ 'email': user }, function(err, result) {});

    var sortDate = events.sort((a, b) => parseFloat(a.day) - parseFloat(b.day));
    var sortDate1 = sortDate.sort((a, b) => parseFloat(a.month) - parseFloat(b.month));
    var sortDate2 = sortDate1.sort((a, b) => parseFloat(a.year) - parseFloat(b.year));

    res.render('calendar', {
        fullName,
        status,
        mail,
        day,
        month,
        year,
        sortDate2
    });
});

app.post('/calendar', async(req, res) => {
    doctor = req.body.whoMed;
    res.redirect('appointment')
});

//appointment
app.get('/appointment', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)

    const findDoctor = await DoctorsMongo.find({ 'email': doctor }, function(err, result) {});

    var latitude = (findDoctor[0].lat)
    var longitude = (findDoctor[0].lon)

    res.render('appointment', {
        fullName,
        status,
        mail,
        medic,
        findDoctor,
        latitude,
        longitude,
        day,
        month,
        year
    });
});

app.post('/appointment', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)

    const findDoctor = await DoctorsMongo.find({ 'email': doctor }, function(err, result) {});

    var latitude = (findDoctor[0].lat)
    var longitude = (findDoctor[0].lon)

    const appointment = new CalendarMongo({
        email: user,
        doctor: findDoctor[0].email,
        event: req.body.event,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year
    });
    await appointment.save();

    res.render('appointment', {
        fullName,
        status,
        mail,
        medic,
        findDoctor,
        latitude,
        longitude,
        day,
        month,
        year
    });
});
//fin appointment

//edit
app.get('/edit', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)
    var name = (findUser[0].name)
    var lastName = (findUser[0].lastName)
    var password = (findUser[0].password)

    if (status == 'doctor') {
        res.redirect('/editDoctor')
    } else {
        res.render('editprofile', {
            fullName,
            status,
            mail,
            name,
            lastName,
            password,
            day,
            month,
            year
        });
    }
});

app.post('/edit', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    if (req.body.action == 'Update Profile') {
        var updateUser = await RegisterMongo.updateMany({ 'email': user }, {
            $set: {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                rptpassword: req.body.password
            }
        });
    } else if (req.body.action == 'Delete Profile') {
        var updateUser = await RegisterMongo.remove({ 'email': user });
    }

    res.redirect('/index2')
});
//fin edit

//edit Doctor
app.get('/editDoctor', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    const findDoctor = await DoctorsMongo.find({ 'email': user }, function(err, result) {});

    var fullName = (findUser[0].name + ' ' + findUser[0].lastName)
    var status = (findUser[0].mop)
    var mail = (findUser[0].email)
    var name = (findUser[0].name)
    var lastName = (findUser[0].lastName)
    var password = (findUser[0].password)
    var phoneNumber = (findDoctor[0].phoneNumber)
    var address = (findDoctor[0].address)
    var doctorType = (findDoctor[0].doctorType)

    res.render('editdoctor', {
        fullName,
        status,
        mail,
        name,
        lastName,
        password,
        phoneNumber,
        address,
        doctorType,
        day,
        month,
        year
    });
});

app.post('/editDoctor', async(req, res) => {
    const findUser = await RegisterMongo.find({ 'email': user }, function(err, result) {});

    var updateUser = await RegisterMongo.updateMany({ 'email': user }, {
        $set: {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            rptpassword: req.body.password
        }
    });

    geocoder.geocode(req.body.address, async function(err, res) {
        var latitude = (res[0].latitude)
        var longitude = (res[0].longitude)

        var updateDoctor = await DoctorsMongo.updateMany({ 'email': user }, {
            $set: {
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,
                address: req.body.address,
                doctorType: req.body.doctorType,
                lat: latitude,
                lon: longitude
            }
        });

    });

    res.redirect('/index2')
});
//fin edit Doctor

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

calndar api

Client ID : 376741700450-mfik21bsmnj4h6ke9l0febh2jr623495.apps.googleusercontent.com
Clent Secret : 2gMqC6n3iatTxBwOw2Y6pJU9

Api key : AIzaSyDf_qJIG18bADHOEqv-mhv38-A9RQoOahI

*/