// restaurantRoutes.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/", (req, res) => {
  res.status(400).send("ID parameter is required");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("ID parameter is required");
  }

  try {
    const restaurant = await Restaurant.findOne({ id });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route for handling requests without an ID

module.exports = router;
