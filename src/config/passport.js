const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const Role = require('../models/Role');
const jwt =require ('jsonwebtoken');

passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await (await User.findOne({'email': email})).populated("roles");
    //comprobar que el usuario existe
    if(user == null){
    //if(!user){
        return done(null, false, {message: 'Usuario no encontrado'});
    } else {
        //comprobar que es la contraseña correcta
        const match = await user.matchPassword(password);
        if (match){
            return done(null, user);
            const token =  jwt.sign({id: user._id}, config.SECRET,{
                expiresIn: 86400
            });
        } else{
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
        
    }
    
}));

//almacenar a usuario en una sesion
passport.serializeUser( function (user, done) {
    done(null, user.id);
});

//buscar si existe un usuario en la sesion
passport.deserializeUser( function (id, done) {
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});
