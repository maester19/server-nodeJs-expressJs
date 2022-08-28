const Student = require("../models/Student")

module.exports = {
    create: async (req, res, next)=> {
        const {
            matricule,
            name,
            surname,
            bornDate,
            level,
            faculty,
        } = req.body

        if(name == undefined ||  matricule == undefined){ // verify parametters value
            Result.sendObject(res, 401, false, {})
            return;
        }
        // save a base parameter 
        let objectID = mongoose.Types.ObjectId().toString(); // create student id

        let doc = {
            _id: objectID,
            name: name,
            surname: surname,
            matricule: matricule,
            bornDate: bornDate,
            level: level,
            faculty: faculty,
            courses: []
        }

        await Student.findOneAndUpdate({ _id: doc._id }, JSON.parse(JSON.stringify(doc)), { upsert:true, new: true })
            .then(student => res.status(201).json(student))
            .catch(error => res.status(400).json({ error }))
    },

    getAll: async (req, res, next) => {
        await Student.find().
        then(students => res.status(200).json(students)).
        catch(error => res.status(400).json({ error }))
    },

    getOne: async (req, res, next)=> {
        await Student.findOne({_id: req.params.id})
        .then(student => res.status(200).json(student))
        .catch(error => res.status(400).json({ error }))
    },

    update: async (req, res, next) =>{

        await Student.findOneAndUpdate({ _id: req.params.id },{ ...req.body, _id: req.params.id } , { upsert:true, new: false })
            .then(() => res.status(201).json({ message: "Informations mis a jour avec succes" }))
            .catch(error => res.status(400).json({ error }))
    },

    delete: async (req, res, next) => {
        Student.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Element supprime avec succes" }))
        .catch(error => res.status(400).json({ error }))
    }
}