// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ id: req.params.id });
    if (!restaurant) return res.status(404).send("Restaurant not found");
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    cuisine = "",
    minCost = "",
    maxCost = "",
    rating = "",
  } = req.query;

  try {
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (cuisine) {
      query.cuisine = { $in: cuisine.split(",") };
    }
    if (minCost) {
      query.averageCostForTwo = { $gte: parseFloat(minCost) };
    }
    if (maxCost) {
      query.averageCostForTwo = { $lte: parseFloat(maxCost) };
    }
    if (rating) {
      query.aggregateRating = { $gte: parseFloat(rating) };
    }

    const totalRestaurants = await Restaurant.countDocuments(query);

    const restaurants = await Restaurant.aggregate([
      { $match: query },
      { $sort: { name: 1 } },
      {
        $group: {
          _id: "$_id",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    res.json({
      restaurants,
      totalPages: Math.ceil(totalRestaurants / limit),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
