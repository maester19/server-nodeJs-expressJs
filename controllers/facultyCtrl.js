const Faculty = require("../models/Faculty")

module.exports = {
    create: async (req, res, next)=> {
        const {
            name,
            description
        } = req.body

        if(name == undefined){ // verify parametters value
            Result.sendObject(res, 401, false, {})
            return;
        }
        // save a base parameter 
        let objectID = mongoose.Types.ObjectId().toString(); // create Faculty id

        let doc = {
            _id: objectID,
            name: name,
            description: description,
            students: [],
            teachers: [],
        }

        await Faculty.findOneAndUpdate({ _id: doc._id }, JSON.parse(JSON.stringify(doc)), { upsert:true, new: true })
            .then(faculty => res.status(201).json(faculty))
            .catch(error => res.status(400).json({ error }))
    },

    getAll: async (req, res, next) => {
        await Faculty.find()
            .then(faculties => res.status(200).json(faculties))
            .catch(error => res.status(400).json({ error }))
    },

    getOne: async (req, res, next)=> {
        await Faculty.findOne({_id: req.params.id})
            .then(faculty => res.status(200).json(faculty))
            .catch(error => res.status(400).json({ error }))
    },

    update: async (req, res, next) =>{
        await Faculty.findOneAndUpdate({ _id: req.params.id },{ ...req.body, _id: req.params.id } , { upsert:true, new: false })
            .then(() => res.status(201).json({ message: "Informations mis a jour avec succes" }))
            .catch(error => res.status(400).json({ error }))
    },

    delete: async (req, res, next) => {
        await Faculty.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Element supprime avec succes" }))
            .catch(error => res.status(400).json({ error }))
    }
}