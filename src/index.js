const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
//prv
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');

//Inicializaciones
const app = express();
require('./database');
require ('./config/passport.js');
require('./routes/files.js')


//configuracion
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));

    //configuracion handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    //prv
    handlebars: allowInsecurePrototypeAccess (Handlebars) ,
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

    //almacenar datos de usuario temporalmente
app.use(session({
    secret: 'mysecretdb',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//variables globales
app.use((req, res, next ) => { 
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//rutas
app.use(require('./routes/index'));
app.use(require('./routes/data'));
app.use(require('./routes/users'));
app.use(require('./routes/files'));


//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//server status
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

