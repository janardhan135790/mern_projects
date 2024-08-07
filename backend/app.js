const express = require("express");
const route = require("./routes/user.routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/restaurentRoutes");
const restaurentModel = require("./model/restaurent.model");
const routers = require("./routes/menuRoutes");
const Menu = require("./model/menuModel");
const orderRouter = require("./routes/orderRoutes");


dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connnected");
    }).catch(err => {
        console.log(err)
    })

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(cookie())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(9000, () => {
    console.log("hello");
});

app.use("/user", route);
app.use("/owner", router);
app.use('/menu', routers)
app.use('/order', orderRouter)

app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await restaurentModel.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/singlemenu/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const fetchMenu = await Menu.find({ _id: id });
        res.json(fetchMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


