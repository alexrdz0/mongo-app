const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config.js')

const userSchema = new Schema({
    
        name: {
             type: String, required: true 
            },
        email: { 
            type: String, required: true 
        },
        password: {
             type: String, required: true 
            },
        role: {
            type: String,
            default: 'invitado',
            enum: [
                'admin',
                'analista',
                'receptor',
                'invitado'
            ]
        },
        date: {
             type: Date, default: Date.now 
            }
    
});


//cifrar contraseñas
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};



//comparar contraseña cifrada con la ingresada por el usuario al hacer signin
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
    .then(match =>{
        if(match){
            //ACCESO
            console.log("ACCESO");
            payload = {
                email: email.userSchema,
                
            }
            jwt.sign({email})
        }else{
            //SIN ACCESO
            console.log("denegado");
            //return res.status(200).send({message: 'Contraseña Incorrecta'});
        }
    })
};

module.exports = mongoose.model('User', userSchema);