const Person = require('../Models/PersonModel')

var PersonController = {
    create: async (req, res) => {
        try{
            const person = new Person({
                name: req.body.name,
                lastName: req.body.lastName,
                dui: req.body.dui,
                phone: req.body.phone,
                age: req.body.age
            })

            await person.save()
            return res.status(201).json(
                { error: false, data: { _id: person._id, message: "Success" } }
            )
        }
        catch(err) {
            console.log(err);
            return res.status(400).json(
                { error: true, message: "Something went wrong", err: err }
            )
        }
    },
    update: async (req, res) => {
        try {
            var personToUpdate = await Person.findOne({_id: req.body._id})

            if(!personToUpdate)
                throw { err: "Person not found" }

            personToUpdate = {
                name: req.body.name || personToUpdate.name,
                lastName: req.body.lastName || personToUpdate.lastName,
                dui: req.body.dui || personToUpdate.dui,
                phone: req.body.phone || personToUpdate.phone,
                age: req.body.age || personToUpdate.age
            }

            await Person.findOneAndUpdate({ _id: req.body._id }, personToUpdate)
            return res.status(200).json(
                { error: false, data: { _id: personToUpdate._id, message: "Success" } }
            )
        }
        catch(err) {
            console.log(err);
            return res.status(400).json(
                { error: true, message: "Something went wrong", err: err }
            )
        }
    },
    delete: async (req, res) => {
        console.log(req.body);

        var p = await Person.deleteOne({ _id: req.body._id})

        console.log(p);

        return res.status(200).json(
            { error: false, message: "Success" }
        )
    },
    read: async (req, res) => {
        var people = await Person.find({name: req.query.name})
    }
}

module.exports = PersonController