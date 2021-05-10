const mongoose = require('mongoose');
const {Schema} = mongoose;

const DataSchema = new Schema({
    //Propiedades para los datos
    date: {type: Date, default: Date.now},
    departamento: {type: String, required: true},
    avance: {type: String, required: false},
    status: {type: String, required: false},
    nuc: {type: String, required: true},
    oficio: {type: String, required: true},
    equipo: {type: String, required: true},
    unidad: {type: String, required: true},
    zona: {type: String, required: true},
    fechaD: {type: Date, required: true},
    hora: {type: String, required: true},
    fechaR: {type: Date, required: true},
    id_del: {type: String, required: false},
    delito: {type: String, required: false},
    num_if: {type: String, required: false},
    fechaC: {type: Date, required: false},
    lic: {type: String, required: false},
    agente: {type: String, required: false},
    fechaRecol: {type: Date, required: false},
    dir: {type: String, required: false},
    dis: {type: String, required: false},
    evidencia: {type: String, required: false},
    banco: {type: String, required: false},
    marcaEqui: {type: String, required: false},
    modeloEqui: {type: String, required: false},
    serieEqui: {type: String, required: false},
    marcaAlma: {type: String, required: false},
    modeloAlma: {type: String, required: false},
    serieAlma: {type: String, required: false},
    md5: {type: String, required: false},
    sha1: {type: String, required: false},
    swImagen: {type: String, required: false},
    swArte: {type: String, required: false},
    swInfo: {type: String, required: false}
});

 //usar el modelo desde otras partes de la app
module.exports = mongoose.model('Data', DataSchema);