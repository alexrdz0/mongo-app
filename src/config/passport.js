const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({'email': email});
    //comprobar que el usuario existe
    if(user == null){
    //if(!user){
        return done(null, false, {message: 'Usuario no encontrado'});
    } else {
        //comprobar que es la contraseña correcta
        const match = await user.matchPassword(password);
        if (match){
            return done(null, user);
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
