const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const filmSchema = new Schema({
    auteur: {type: String, required:true },
    annee: {type: String, required:true },
    titre: {type: String, required:true },
    imageUrl: {type: String, required:true },
})

module.exports = mongoose.model('Film', filmSchema);