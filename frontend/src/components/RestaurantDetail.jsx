import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./RestaurantDetail.css";

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log(`Fetching restaurant with ID: ${id}`);

        const result = await axios.get(
          `http://localhost:5000/restaurants/${id}`
        );
        setRestaurant(result.data);
      } catch (error) {
        setError("Error fetching restaurant details.");
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!restaurant) return <div className="loading">Loading...</div>;

  return (
    <div className="restaurant-detail">
      <h1>{restaurant.name}</h1>
      <p className="address">{restaurant.address}</p>
      <p className="cuisines">Cuisines: {restaurant.cuisines.join(", ")}</p>
      <p className="cost">
        Average Cost: {restaurant.averageCostForTwo} {restaurant.currency}
      </p>
      <p className="rating">
        Rating: {restaurant.aggregateRating} ({restaurant.votes} votes)
      </p>
      <p className="currency">Currency: {restaurant.currency}</p>
      <div className="image-container">
        <img
          src={restaurant.featuredImage || "/default-image.jpg"}
          alt={restaurant.name}
          className="restaurant-image"
        />
      </div>
      <a
        href={restaurant.url}
        className="restaurant-link"
        target="_blank"
        // rel="noopener noreferrer"
      >
        View on Zomato
      </a>
    </div>
  );
};

export default RestaurantDetail;
