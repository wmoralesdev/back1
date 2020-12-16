const { Schema, model } = require('mongoose')

var PersonSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: String,
    dui: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    age: Number
})

// Nombre en singular -> MongoDB automaticamente pluraliza los nombres
module.exports = model("Person", PersonSchema)