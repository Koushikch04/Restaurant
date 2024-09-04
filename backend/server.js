// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const restaurantRoutes = require("./routes/restaurantRoutes");
const locationRoutes = require("./routes/locationRoutes.js");
const imageRoutes = require("./routes/imageRoutes");
const specificRestaurant = require("./routes/restaurant.js");
app.use("/restaurant", specificRestaurant);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants", locationRoutes);
app.use("/restaurants", imageRoutes);
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
