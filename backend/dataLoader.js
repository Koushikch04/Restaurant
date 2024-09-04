const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Restaurant = require("./models/Restaurant"); // Adjust path as necessary

const mongoURI =
  "mongodb+srv://chk240404:Restaurant%402024@cluster0.dgqbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const filePath = path.join(__dirname, "data.json"); // Adjust path to your JSON file

const loadData = async () => {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(rawData);

    if (!Array.isArray(jsonData)) {
      throw new Error("Invalid data format: Root element should be an array");
    }

    const allRestaurants = jsonData.flatMap((dataObject) => {
      if (!dataObject.restaurants || !Array.isArray(dataObject.restaurants)) {
        throw new Error(
          "Invalid data format: 'restaurants' is missing or not an array in one of the objects"
        );
      }

      return dataObject.restaurants
        .map((item) => {
          const restaurant = item.restaurant;

          if (!restaurant) {
            throw new Error("Invalid data format: 'restaurant' is missing");
          }

          // Validate coordinates
          const longitude = parseFloat(restaurant.location.longitude);
          const latitude = parseFloat(restaurant.location.latitude);
          if (isNaN(longitude) || isNaN(latitude)) {
            console.warn(
              `Skipping restaurant with invalid coordinates: ${restaurant.name}`
            );
            return null; // Skip this entry
          }

          return {
            id: parseInt(restaurant.id, 10),
            name: restaurant.name,
            countryCode: restaurant.location.country_id,
            city: restaurant.location.city,
            address: restaurant.location.address,
            locality: restaurant.location.locality,
            localityVerbose: restaurant.location.locality_verbose,
            longitude,
            latitude,
            cuisines: restaurant.cuisines.split(", "),
            averageCostForTwo: restaurant.average_cost_for_two,
            currency: restaurant.currency,
            hasTableBooking: restaurant.has_table_booking === 1,
            hasOnlineDelivery: restaurant.has_online_delivery === 1,
            isDeliveringNow: restaurant.is_delivering_now === 1,
            switchToOrderMenu: restaurant.switch_to_order_menu === 1,
            priceRange: restaurant.price_range,
            aggregateRating: parseFloat(
              restaurant.user_rating.aggregate_rating
            ),
            ratingColor: restaurant.user_rating.rating_color,
            ratingText: restaurant.user_rating.rating_text,
            votes: parseInt(restaurant.user_rating.votes, 10),
            featuredImage:
              restaurant.featured_image ||
              "https://b.zmtcdn.com/data/pictures/0/801690/fa778a9be95f95e7d9846e23b59c8d1a_featured_v2.jpg",
            url: restaurant.url,
            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          };
        })
        .filter((item) => item !== null); // Remove null entries
    });

    await Restaurant.insertMany(allRestaurants);
    console.log("Data loaded successfully");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    mongoose.connection.close();
  }
};

loadData();
