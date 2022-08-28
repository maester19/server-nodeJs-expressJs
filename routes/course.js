const express = require('express')
const router = express.Router()
const courseCtrl = require('../controllers/courseCtrl')

router.post('/', courseCtrl.create);

router.get('/:id', courseCtrl.getOne);

router.put('/:id', courseCtrl.update);

router.delete('/:id', courseCtrl.delete);

router.get('/', courseCtrl.getAll);


module.exports = router