
module.exports = function(req, res, next){
    if(req.path != '/users/signin'){
        //validar que se tengan los permisos
        if(req.headers.autorization){
            next();
        }else{
            res.status(403).send({message: "No tiene permisos suficientes"});
        }
    }else{
        //dar acceso a login
        next();
    }
};