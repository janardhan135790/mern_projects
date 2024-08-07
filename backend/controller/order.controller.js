const Menu = require("../model/menuModel");
const Order = require("../model/orderModel");

const createOrder = async (req, res) => {
    const userId = req.user._id;
    const { restaurantName, items } = req.body;
    try {
        let totalPrice = 0;
        for (const item of items) {
            const getMenu = await Menu.findById(item.menuItemId);
            if (getMenu) {
                totalPrice += getMenu.price * item.quantity;
            }
        }
        const order = await Order.create({
            userId,
            restaurantName,
            items,
            totalPrice,
            status: 'Completed'
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    };
};
const getOrder = async (req, res) => {
    const userId = req.user._id;
    try {
        const getOrder = await Order.find({ userId })
        if (getOrder.length === 0) return res.status(404).json({ message: "No Order Available.." })
        return res.json(getOrder)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    };
};
module.exports = { createOrder, getOrder }