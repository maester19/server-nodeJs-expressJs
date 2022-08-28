const express = require('express')
const router = express.Router()
const studentCtrl = require('../controllers/studentCtrl')

router.post('/', studentCtrl.create);

router.get('/:id', studentCtrl.getOne);

router.put('/:id', studentCtrl.update);

router.delete('/:id', studentCtrl.delete);

router.get('/', studentCtrl.getAll);


module.exports = router