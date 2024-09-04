const express = require("express");
require("dotenv").config();
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const Restaurant = require("../models/Restaurant");
const tagToCuisineMap = require("../tagToCuisineMap");

const upload = multer({ dest: "uploads/" });

router.post("/search/image", upload.single("image"), async (req, res) => {
  const API_KEY = process.env.IMAGGA_API_KEY;
  const API_SECRET = process.env.IMAGGA_API_SECRET;

  if (!req.file) {
    return res.status(400).send("No image file uploaded.");
  }

  const form = new FormData();
  form.append("image", fs.createReadStream(req.file.path));

  try {
    const response = await axios.post("https://api.imagga.com/v2/tags", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${Buffer.from(
          `${API_KEY}:${API_SECRET}`
        ).toString("base64")}`,
      },
    });

    if (!response.data || !response.data.result || !response.data.result.tags) {
      return res
        .status(500)
        .send("Unexpected response structure from Imagga API.");
    }

    const tags = response.data.result.tags.map((tag) =>
      tag.tag.en.toLowerCase()
    );

    // Print top tags for debugging
    console.log("Top Tags from Imagga API:", tags.slice(0, 10)); // Adjust number as needed

    const cuisines = tags
      .map((tag) => tagToCuisineMap[tag])
      .filter((cuisine) => cuisine !== undefined);

    const restaurants = await Restaurant.find({
      cuisines: { $in: cuisines },
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.json({
      restaurants,
      topTags: tags.slice(0, 10), // Include top tags in response
    });
  } catch (error) {
    console.error("Error processing image:", error.message);
    res.status(500).send(`Error processing image: ${error.message}`);
  }
});

module.exports = router;
