// routes/locationRoutes.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/search/location", async (req, res) => {
  const { lat, lon, radius = 6351 } = req.query;

  if (!lat || !lon) {
    return res.status(400).send("Latitude and longitude are required.");
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const radiusInMeters = parseInt(radius);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).send("Invalid latitude or longitude.");
  }

  try {
    const restaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "distance",
          maxDistance: radiusInMeters,
          spherical: true,
        },
      },
      {
        $group: {
          _id: "$id",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" },
      },
    ]);

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants by location:", error);
    res.status(500).send("Error fetching restaurants by location.");
  }
});

module.exports = router;
