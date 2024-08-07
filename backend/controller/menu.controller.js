const Menu = require("../model/menuModel");
const restaurentModel = require("../model/restaurent.model");

const addMenuItem = async (req, res) => {
    const { restaurantId, name, description, price, image } = req.body;

    try {
        const restaurant = await restaurentModel.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

        const existingMenuItem = await Menu.findOne({ name });
        if (existingMenuItem) return res.status(400).json({ message: "Item name already exists for this restaurant" });
        const newMenuItem = await Menu.create({ restaurantId, name, description, price, image });
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getMenuItems = async (req, res) => {
    const restaurantId = req.params.id;
    try {
        const findRestaurent = await Menu.find({ restaurantId });
        if (!findRestaurent || findRestaurent.length === 0) {
            return res.status(404).json({ message: 'No menu items found for this restaurant' });
        }
        return res.status(200).json(findRestaurent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(
            id,
            { name, description, price, image },
            { new: true } // Returns the updated document
        );
        if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json(updatedMenuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem };