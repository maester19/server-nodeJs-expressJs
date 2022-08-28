const Course = require("../models/Course")

module.exports = {
    create: async (req, res, next)=> {
        const {
            libelle,
            description,
            code,
            level,
            faculty,
            teacher
        } = req.body

        if(libelle == undefined){ // verify parametters value
            Result.sendObject(res, 401, false, {})
            return;
        }
        // save a base parameter 
        let objectID = mongoose.Types.ObjectId().toString(); // create Course id

        let doc = {
            _id: objectID,
            libelle: libelle,
            description: description,
            code: code,
            level: level,
            faculty: faculty,
            teachers: teacher,
        }

        await Course.findOneAndUpdate({ _id: doc._id }, JSON.parse(JSON.stringify(doc)), { upsert:true, new: true })
            .then(course => res.status(201).json(course))
            .catch(error => res.status(400).json({ error }))
    },

    getAll: async (req, res, next) => {
        await Course.find()
            .then(courses => res.status(200).json(courses))
            .catch(error => res.status(400).json({ error }))
    },

    getOne: async (req, res, next)=> {
        await Course.findOne({_id: req.params.id})
            .then(course => res.status(200).json(course))
            .catch(error => res.status(400).json({ error }))
    },

    update: async (req, res, next) =>{
        await Course.findOneAndUpdate({ _id: req.params.id },{ ...req.body, _id: req.params.id } , { upsert:true, new: false })
            .then(() => res.status(201).json({ message: "Informations mis a jour avec succes" }))
            .catch(error => res.status(400).json({ error }))
    },

    delete: async (req, res, next) => {
        await Course.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Element supprime avec succes" }))
            .catch(error => res.status(400).json({ error }))
    }
}