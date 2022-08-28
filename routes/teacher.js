const express = require('express')
const router = express.Router()
const teacherCtrl = require('../controllers/teacherCtrl')

router.post('/', teacherCtrl.create);

router.get('/:id', teacherCtrl.getOne);

router.put('/:id', teacherCtrl.update);

router.delete('/:id', teacherCtrl.delete);

router.get('/', teacherCtrl.getAll);


module.exports = router