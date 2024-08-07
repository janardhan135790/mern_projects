const express = require('express');
const { addRestaurent, getRestaurent, getByName, updateRestaurent, deleteRestaurent, getLoginRestaurent } = require('../controller/restaurentOwner');
const isProtected = require('../middleware/middleware');
const router = express.Router();

router.post("/add",isProtected,addRestaurent);
router.get('/all',isProtected,getRestaurent);
router.get('/:id',isProtected,getLoginRestaurent);
router.get('/:name',getByName);
router.patch('/update/:id',updateRestaurent);
router.delete('/delete/:id',deleteRestaurent);



module.exports = router