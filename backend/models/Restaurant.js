const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  city: String,
  address: String,
  locality: String,
  localityVerbose: String,
  longitude: Number,
  latitude: Number,
  cuisines: [String],
  averageCostForTwo: Number,
  currency: String,
  hasTableBooking: Boolean,
  hasOnlineDelivery: Boolean,
  isDeliveringNow: Boolean,
  switchToOrderMenu: Boolean,
  priceRange: Number,
  aggregateRating: Number,
  ratingColor: String,
  ratingText: String,
  votes: Number,
  featuredImage: String,
  url: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ name: "text" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
