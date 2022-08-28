const Teacher = require("../models/Teacher")

module.exports = {
    create: async (req, res, next)=> {
        const {
            matricule,
            name,
            surname,
            faculty,
        } = req.body

        if(name == undefined ||  matricule == undefined){ // verify parametters value
            Result.sendObject(res, 401, false, {})
            return;
        }
        // save a base parameter 
        let objectID = mongoose.Types.ObjectId().toString(); // create Teacher id

        let doc = {
            _id: objectID,
            name: name,
            surname: surname,
            matricule: matricule,
            faculty: faculty
        }

        await Teacher.findOneAndUpdate({ _id: doc._id }, JSON.parse(JSON.stringify(doc)), { upsert:true, new: true })
            .then(teacher => res.status(201).json(teacher))
            .catch(error => res.status(400).json({ error }))
    },

    getAll: async (req, res, next) => {
        await Teacher.find()
            .then(teachers => res.status(200).json(teachers))
            .catch(error => res.status(400).json({ error }))
    },

    getOne: async (req, res, next)=> {
        await Teacher.findOne({_id: req.params.id})
            .then(teacher => res.status(200).json(teacher))
            .catch(error => res.status(400).json({ error }))
    },

    update: async (req, res, next) =>{
        await Teacher.findOneAndUpdate({ _id: req.params.id },{ ...req.body, _id: req.params.id } , { upsert:true, new: false })
            .then(() => res.status(201).json({ message: "Informations mis a jour avec succes" }))
            .catch(error => res.status(400).json({ error }))
    },

    delete: async (req, res, next) => {
        await Teacher.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Element supprime avec succes" }))
            .catch(error => res.status(400).json({ error }))
    }
}