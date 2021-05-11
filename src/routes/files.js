const express= require ('express');
const router= express.Router();
const multer = require("multer");
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
    destination: 'file_container/',
    filename: function(req, file, done){
        //darle nombre al archivo
        done("", Date.now() + file.originalname+ "." + mimeTypes.extension(file.mimetype));
    }
});

const up = multer({
    storage: storage
});

router.get("/files" , (req, res) =>{
    res.render("file/archivos");
});

router.post("/files",up.any('x') ,(req, res)=> {
    res.render('data/new-data')
    //res.send("enviado con éxito");
});

module.exports = router;