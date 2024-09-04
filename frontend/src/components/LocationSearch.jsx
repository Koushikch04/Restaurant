import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LocationSearch.css";

const LocationSearch = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const search = async () => {
    setError(null);
    if (!latitude || !longitude) {
      setError("Latitude and Longitude cannot be empty.");
      return;
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      setError("Invalid latitude or longitude.");
      return;
    }

    try {
      const result = await axios.get(
        `/restaurants/search/location?lat=${lat}&lon=${lon}`
      );
      if (Array.isArray(result.data)) {
        setRestaurants(result.data);
      } else {
        setRestaurants([]);
        setError("Unexpected data format received.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRestaurants([]);
      setError("Failed to fetch restaurants.");
    }
  };

  return (
    <div className="location-search">
      <h1>Location Search</h1>
      <div className="search-inputs">
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          min="-90"
          max="90"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          min="-180"
          max="180"
        />
        <button onClick={search} disabled={!latitude || !longitude}>
          Search
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <ul className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <Link
                to={`/restaurant/${restaurant.id}`}
                className="restaurant-link"
                target="_blank"
              >
                {restaurant.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No restaurants found</p>
        )}
      </ul>
    </div>
  );
};

export default LocationSearch;
