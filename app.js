const express = require('express')
const app = express()

const musiquesRoutes = require('./routes/musiques-routes')
const filmsRoutes = require('./routes/films-routes')

app.use('/api/musiques', musiquesRoutes);
app.use('/api/films', filmsRoutes)

app.listen(5000);