require('dotenv').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 4000

app.set('port', port)

// API podra aceptar headers con Content-Type: application/json
app.use(express.json())

var server = http.createServer(app)
server.listen(port)

server.on('error', (e) => {
    console.log(e);
})

server.on('listening', () => {
    console.log(`Listening on ${port}`);
})

// ORM -> Object Relational Mapper
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Connected to Database');
})
.catch(err => {
    console.log(err);
})

const PersonController = require('./Controllers/PersonController')

app.post('/person', PersonController.create)
app.put('/person', PersonController.update)
app.delete('/person', PersonController.delete)

// Schema/Model, Controller
/*
    GET
    Query

    POST/PUT/DELETE/PATCH
    Body, params

    Query
    Consultas o cambiar configuraciones de elementos
    estaticos (se usa query cuando no se modifican o envian datos)

    Body, params
    Modificar, crear, actualizar datos en la API
    (Cuando se necesite creacion o envio de datos
    desde el cliente al server)
*/