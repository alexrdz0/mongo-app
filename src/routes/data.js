const { request } = require('express');
const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
//const logged = require('../routes/users');

router.get('/data/add', isLoggedIn, (req, res) => {
    res.render('data/new-data');
});

//ruta para guardar registros
//se utiliza async para indicar que dentro de la funcion existen procesos asincronos
router.post('/data/new-data', async (req, res) => {
    //obtener los valores y guardarlos
    const { departamento, avance, status, nuc, oficio, equipo, unidad, zona, fechaD, hora, fechaR, id_del, delito, num_if,
        fechaC, lic, agente, fechaRecol, dir, dis, evidencia, banco, marcaEqui, modeloEqui, serieEqui, marcaAlma, modeloAlma, serieAlma, md5, sha1, swImagen, swArte, swInfo, file } = req.body;
    //manejar errores
    const errors = [];
    if (!nuc) {
        errors.push({ text: "Por favor ingresa el NUC" });
    }
    if (!oficio) {
        errors.push({ text: "Por favor, añade el codigo de oficio" });
    }
    if (!equipo) {
        errors.push({ text: "Por favor, selecciona un tipo de Equipo" });
    }
    if (!unidad) {
        errors.push({ text: "Por favor, selecciona una unidad" });
    }
    if (!zona) {
        errors.push({ text: "Por favor, selecciona una zona" });
    }
    if (!fechaD) {
        errors.push({ text: "Por favor, ingresa la fehca del delito" });
    }
    if (!hora) {
        errors.push({ text: "Por favor, ingresa la hora del delito" });
    }
    if (!fechaR) {
        errors.push({ text: "Por favor, ingresa la fecha de recolección" });
    }
    if (errors.length > 0) {
        res.render('data/new-data', {
            errors,
            departamento,
            nuc,
            oficio, equipo, unidad, zona, fechaD, hora, fechaR
        });
    } else {
        //Almacenar los nuevos datos

        const newData = new Data({
            departamento, avance, status, nuc, oficio, equipo, unidad, zona, fechaD, hora, fechaR, id_del, delito, num_if,
            fechaC, lic, agente, fechaRecol, dir, dis, evidencia, banco, marcaEqui, modeloEqui, serieEqui, marcaAlma, modeloAlma, serieAlma, md5, sha1, swImagen, swArte, swInfo, file
        });
        //await indica que ese proceso será asincrono
        await newData.save();
        console.log(newData);
        //mostrar mensaje de "correcto"
        res.render('data/data-successful');
        //res.send('ok');
    }

});

// Consultar la base de datos
router.get('/data', /*isLoggedIn,*/ async function (req, res) {
    //consultar base de datos
    await Data.find().sort({ date: 'desc' })
        .then(documentos => {
            const contexto = {
                datos: documentos.map(documento => {
                    return {
                        _id: documento._id,
                        departamento: documento.departamento,
                        avance: documento.avance,
                        status: documento.status,
                        nuc: documento.nuc,
                        oficio: documento.oficio,
                        equipo: documento.equipo,
                        unidad: documento.unidad,
                        zona: documento.zona,
                        fechaD: documento.fechaD,
                        hora: documento.hora,
                        fechaR: documento.fechaR,
                        id_del: documento.id_del,
                        delito: documento.delito,
                        num_if: documento.num_if,
                        fechaC: documento.fechaC,
                        lic: documento.lic,
                        agente: documento.agente,
                        fechaRecol: documento.fechaRecol,
                        dir: documento.dir,
                        dis: documento.dis,
                        evidencia: documento.evidencia,
                        banco: documento.banco,
                        marcaEqui: documento.marcaEqui,
                        modeloEqui: documento.modeloEqui,
                        serieEqui: documento.serieEqui,
                        marcaAlma: documento.marcaAlma,
                        modeloAlma: documento.modeloAlma,
                        serieAlma: documento.serieAlma,
                        md5: documento.md5,
                        sha1: documento.sha1,
                        swImagen: documento.swImagen,
                        swArte: documento.swArte,
                        swInfo: documento.swInfo,
                        file: documento.file
                    }


                })
            }
            res.render('data/all-data.hbs', { datos: contexto.datos })
        })
});

//Editar registros
router.get('/data/edit/:id', isLoggedIn, async (req, res) => {
    //obtener el ID
    const dat = await Data.findById(req.params.id);
    res.render('data/edit-data', { dat });
});

router.put('/data/edit-data/:id', async (req, res) => {
    const { departamento, avance, status, nuc, oficio, equipo, unidad, zona, fechaD, hora, fechaR, id_del, delito, num_if,
        fechaC, lic, agente, fechaRecol, dir, dis, evidencia, banco, marcaEqui, modeloEqui, serieEqui, marcaAlma, modeloAlma, serieAlma, md5, sha1, swImagen, swArte, swInfo, file } = req.body;
    await Data.findByIdAndUpdate(req.params.id, {
        departamento, avance, status, nuc, oficio, equipo, unidad, zona, fechaD, hora, fechaR, id_del, delito, num_if,
        fechaC, lic, agente, fechaRecol, dir, dis, evidencia, banco, marcaEqui, modeloEqui, serieEqui, marcaAlma, modeloAlma, serieAlma, md5, sha1, swImagen, swArte, swInfo, file
    });
    req.flash('success_msg', 'Actualizado correctamente');
    res.redirect('/data');
});

//Ver registros
router.get('/data/view/:id', isLoggedIn, async (req, res) => {
    //obtener el ID
    const dat = await Data.findById(req.params.id);
    res.render('data/view-data', { dat });
});

/*
//eliminar
router.delete('/data/delete/:id',async (req, res) =>{
    await Data.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Eliminado correctamente');
    res.redirect('/data');
});
*/
/*
//BUSCAR
router.get('/data/search', async function (req, res) {
    //buscar
    var noMatch = null;
    //const errors = [];
    if (req.query.search) {
        console.log("Se esta buscando: ", req.query.search);
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //consultar base de datos
        console.log("pasando el regex");
        await Data.find()
            .then(documentos => {
                const contexto = {
                    datos: documentos.map(documento => {
                        if (error) {
                            console.log("Error en finde", req.query.search);
                            res.render('data/data-searchError');
                        } else {
                            return {
                                _id: documento._id,
                                departamento: documento.departamento,
                                avance: documento.avance,
                                status: documento.status,
                                nuc: documento.nuc,
                                oficio: documento.oficio,
                                equipo: documento.equipo,
                                unidad: documento.unidad,
                                zona: documento.zona,
                                fechaD: documento.fechaD,
                                hora: documento.hora,
                                fechaR: documento.fechaR,
                                id_del: documento.id_del,
                                delito: documento.delito,
                                num_if: documento.num_if,
                                fechaC: documento.fechaC,
                                lic: documento.lic,
                                agente: documento.agente,
                                fechaRecol: documento.fechaRecol,
                                dir: documento.dir,
                                dis: documento.dis,
                                evidencia: documento.evidencia,
                                banco: documento.banco,
                                marcaEqui: documento.marcaEqui,
                                modeloEqui: documento.modeloEqui,
                                serieEqui: documento.serieEqui,
                                marcaAlma: documento.marcaAlma,
                                modeloAlma: documento.modeloAlma,
                                serieAlma: documento.serieAlma,
                                md5: documento.md5,
                                sha1: documento.sha1,
                                swImagen: documento.swImagen,
                                swArte: documento.swArte,
                                swInfo: documento.swInfo,
                                file: documento.file
                            }
                        }
                    })

                }
                res.render('data/all-data.hbs', { datos: contexto.datos })
            })
    }else {
        //consultar base de datos
        console.log("ingresando al else");
        await Data.find().sort({ date: 'desc' })
            .then(documentos => {
                const contexto = {
                    datos: documentos.map(documento => {
                        return {
                            _id: documento._id,
                            departamento: documento.departamento,
                            avance: documento.avance,
                            status: documento.status,
                            nuc: documento.nuc,
                            oficio: documento.oficio,
                            equipo: documento.equipo,
                            unidad: documento.unidad,
                            zona: documento.zona,
                            fechaD: documento.fechaD,
                            hora: documento.hora,
                            fechaR: documento.fechaR,
                            id_del: documento.id_del,
                            delito: documento.delito,
                            num_if: documento.num_if,
                            fechaC: documento.fechaC,
                            lic: documento.lic,
                            agente: documento.agente,
                            fechaRecol: documento.fechaRecol,
                            dir: documento.dir,
                            dis: documento.dis,
                            evidencia: documento.evidencia,
                            banco: documento.banco,
                            marcaEqui: documento.marcaEqui,
                            modeloEqui: documento.modeloEqui,
                            serieEqui: documento.serieEqui,
                            marcaAlma: documento.marcaAlma,
                            modeloAlma: documento.modeloAlma,
                            serieAlma: documento.serieAlma,
                            md5: documento.md5,
                            sha1: documento.sha1,
                            swImagen: documento.swImagen,
                            swArte: documento.swArte,
                            swInfo: documento.swInfo,
                            file: documento.file
                        }
                    })

                }
        res.render('data/search', { datos: contexto.datos });
        })
    }
});
*/

//SEGUNDA OPCION DE BUSCADOR

router.get('/data/search',async function (req, res) {
    //buscar
    //var noMatch = null;
    var errors = [];
    if (req.query.search) {
        console.log("Se esta buscando: ", req.query.search);
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const dat = await Data.findById(req.params.id);
        const buscar= await Data.find({ nuc: req.query.search })
        if (!buscar) {
            console.log("Error en find (", req.query.search,")");
            res.render('data/data-searchError');
        } else {
            //return buscar;
            console.log("mostrando resultados");  
            res.redirect('/data/searchCorrect');
        }
    }
    else {
  
            res.render('data/search');
        }
});

router.put('/data/searchCorrect/:id', async (req, res) => {
    const { departamento, avance, status, nuc, oficio, equipo, unidad, zona, fechaD, hora, fechaR, id_del, delito, num_if,
        fechaC, lic, agente, fechaRecol, dir, dis, evidencia, banco, marcaEqui, modeloEqui, serieEqui, marcaAlma, modeloAlma, serieAlma, md5, sha1, swImagen, swArte, swInfo, file } = req.body;
    await Data.findByIdAndUpdate(req.params.id, {
        departamento, avance, status, nuc, oficio, equipo, unidad, zona, fechaD, hora, fechaR, id_del, delito, num_if,
        fechaC, lic, agente, fechaRecol, dir, dis, evidencia, banco, marcaEqui, modeloEqui, serieEqui, marcaAlma, modeloAlma, serieAlma, md5, sha1, swImagen, swArte, swInfo, file
    });
    req.flash('success_msg', 'Encontrado correctamente');
    res.render('/data/searchCorrect', {dat});
});



//indicar si un usuario esta login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/data/private');
}

//acceso privado
router.get('/data/private', (req, res) => {
    res.render('data/private');
});

//funcion para validar mayusculas, minusculas, acentos, espacios, etc
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;