const restaurentModel = require('../model/restaurent.model');
const restaurantSchema = require('../model/restaurent.model');
const addRestaurent = async (req, res) => {
    const user = req.user._id;
    const { name, address, cuisine, phoneNumber, rating } = req.body;
    try {
        const checkReastaurent = await restaurantSchema.findOne({ name });
        if (checkReastaurent) return res.status(400).json({ message: "Reastaurent Name already exist" });
        const addRestaurent = await restaurantSchema.create({ name, address, cuisine, phoneNumber, rating, user });
        if (addRestaurent) return res.status(201).json({ message: "Sucessfully Added" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getRestaurent = async (req, res) => {
    const user = req.user._id;
    try {
        const findRestaurents = await restaurantSchema.find({ user });
        if (findRestaurents.length === 0) {
            return res.status(404).json({ message: "No Restaurants Available..." });
        }
        return res.status(200).json(findRestaurents);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getLoginRestaurent = async (req, res) => {
    const id = req.params.id;
    try {
        const loginRestaurant = await restaurantSchema.findById({ _id: id });
        if (loginRestaurant.length === 0) {
            return res.status(404).json({ message: "No Restaurants Available for this user..." });
        }
        return res.status(200).json(loginRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err.message)
    }
};
const getByName = async (req, res) => {
    const name = req.params.name;
    try {
        const getRestaurentByName = await restaurantSchema.findOne({ name });
        if (!getRestaurentByName) return res.status(404).json({ message: 'Cannot find restaurant' });
        return res.status(201).json(getRestaurentByName);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};
const updateRestaurent = async (req, res) => {
    const id = req.params.id;
    try {
        const findRestaurent = await restaurantSchema.findById({ _id: id })
        if (!findRestaurent) return res.status(404).json({ message: 'Cannot find restaurant' });
        const updates = ['name', 'address', 'cuisine', 'rating', 'phoneNumber'];
        updates.forEach(update => {
            if (req.body[update] != null) {
                findRestaurent[update] = req.body[update];
            }
        });
        const updateRestaurent = await findRestaurent.save();
        res.status(201).json({ message: "Updates Sucessfully", updateRestaurent });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const deleteRestaurent = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteRestaurent = await restaurantSchema.findById({ _id: id });
        if (!deleteRestaurent) return res.status(404).json({ message: 'Cannot find restaurant' });
        const deleted = await deleteRestaurent.deleteOne({ id });
        res.status(200).json({ message: "Deleted Sucessfully" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
module.exports = { addRestaurent, getRestaurent, getByName, updateRestaurent, deleteRestaurent, getLoginRestaurent }