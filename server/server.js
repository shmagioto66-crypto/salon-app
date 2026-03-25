require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Models
const User = mongoose.model("User", {
    username: String,
    password: String
});

const Booking = mongoose.model("Booking", {
    name: String,
    service: String,
    date: String
});

// REGISTER
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hash });
    await user.save();

    res.json({ success: true });
});

// LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
});

// BOOKING
app.post("/booking", async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ success: true });
});

// GET BOOKINGS
app.get("/bookings", async (req, res) => {
    const data = await Booking.find();
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
