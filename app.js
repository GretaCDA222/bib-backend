const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')

const HttpError = require('./utils/http-error')

mongoose.set('strictQuery', true)

const app = express()
app.use(cors())
app.use(bodyParser.json())


const musiquesRoutes = require('./routes/musiques-routes')
const filmsRoutes = require('./routes/films-routes')
const usersRoutes = require('./routes/users-routes')

app.use('/api/musiques', musiquesRoutes);
app.use('/api/films', filmsRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Page non trouvée', 404)
    return next(error)
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'Une erreur non gérée est survenue'})
}, )

const uri = 'mongodb+srv://gretaUser:bCx1m4K49VIpKttf@gretalaurent.sdfgski.mongodb.net/Bibliotheque?retryWrites=true&w=majority'

mongoose.connect(uri)
    .then(() => {
        app.listen(process.env.PORT);
        console.log("Server running");
    })
    .catch(err => {
        console.log(err);
    })

