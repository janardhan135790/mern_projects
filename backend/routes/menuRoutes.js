const express = require('express');
const routers = express.Router();
const isProtected = require('../middleware/middleware');
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, } = require('../controller/menu.controller');


routers.post('/add', isProtected, addMenuItem);
routers.get('/restaurant/:id', isProtected, getMenuItems);
routers.put('/update/:id', isProtected, updateMenuItem);
routers.delete('/delete/:id', isProtected, deleteMenuItem);

module.exports = routers;
