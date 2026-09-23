const express = require("express");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("🚀 FoodBridge API is running...");
});

module.exports = app;