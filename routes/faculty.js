const express = require('express')
const router = express.Router()
const facultyCtrl = require('../controllers/facultyCtrl')

router.post('/', facultyCtrl.create);

router.get('/:id', facultyCtrl.getOne);

router.put('/:id', facultyCtrl.update);

router.delete('/:id', facultyCtrl.delete);

router.get('/', facultyCtrl.getAll);


module.exports = router