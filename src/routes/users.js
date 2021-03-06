const express= require ('express');
const router= express.Router();
const User = require('../models/User');
const passport = require ('passport');
//pvs
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { session } = require('passport');

//midleware
//app.use(morgan('dev'));
//app.use(cookieParser());
//app.use(bodyParser.urlencoded());


//login
router.get('/users/signin', (req, res) =>{
    res.render('users/signin',{
        message: req.flash('loginMessage')
    })
});

router.post('/users/signin', passport.authenticate('local', {
    
    successRedirect: '/profile',
    failureRedirect: '/users/signin',
    // badRequestMessage: 'Algo salio mal, intenta nuevamente',
    failureFlash: true,
    }));

router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('data/profile',{
        user: req.user
    })
}
);
 
//logout
router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});

//indicar si un usuario esta login
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next ();
        
    }
    return res.redirect('/');
}

/*
//Registro de nuevo usuario
router.get('/users/signup', (req, res) =>{
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) =>{
    const {name, email, password, confirm_pass} = req.body;
    const errors = [];
    console.log(req.body);
    if(name.length <= 0){
        errors.push({text: 'Por favor, ingresa un nombre de usuario'});
    }

    if(email.length <= 0){
        errors.push({text: 'Por favor, ingresa un email'});
    }

    if(password.length <= 0){
        errors.push({text: 'Por favor, ingresa una contraseña'});
    }
    if(confirm_pass.length <= 0){
        errors.push({text: 'Por favor, confirma la contraseña'});
    }

    if(password != confirm_pass) {
        errors.push ({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe ser mayor de 4 caracteres'});
    }
    if(errors.length > 0 ){
        res.render('users/signup', {errors, name, email, password, confirm_pass});
    } else{

        //validar que el email no existe
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error', 'Este email ya se encuentra registrado');
            res.redirect('/users/signup');
        }

        //almacenar al nuevo usuario
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registrado con éxito!');
        res.redirect('/users/signin');
    }
});*/
//module.exports={"isLoggedIn": isLoggedIn};

module.exports= router;

