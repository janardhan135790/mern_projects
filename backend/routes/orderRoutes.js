const express = require('express');
const { createOrder, getOrder } = require('../controller/order.controller');
const isProtected = require('../middleware/middleware');
const orderRouter = express.Router();

orderRouter.post("/create", isProtected, createOrder);
orderRouter.get('/get/order', isProtected, getOrder)



module.exports = orderRouter