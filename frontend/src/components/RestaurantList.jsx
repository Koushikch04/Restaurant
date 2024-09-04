import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RestaurantList.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const resultsPerPage = 10;

  const [cuisine, setCuisine] = useState(""); // State for cuisine filter
  const [minCost, setMinCost] = useState(""); // State for minimum cost filter
  const [maxCost, setMaxCost] = useState(""); // State for maximum cost filter
  const [rating, setRating] = useState(""); // State for rating filter

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/restaurants", {
          params: {
            page: currentPage,
            limit: resultsPerPage,
            search: searchTerm,
            cuisine,
            minCost,
            maxCost,
            rating,
          },
        });

        // Remove duplicate restaurants by ID
        const uniqueRestaurants = Array.from(
          new Map(
            response.data.restaurants.map((item) => [item.id, item])
          ).values()
        );

        setRestaurants(uniqueRestaurants);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [currentPage, searchTerm, cuisine, minCost, maxCost, rating]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    const pages = [];

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    if (totalPages > maxPagesToShow) {
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages.map((page, index) => (
      <span key={index}>
        {page === "..." ? (
          <span className="ellipsis">{page}</span>
        ) : (
          <button
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        )}
      </span>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Min rating"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setCurrentPage(1);
          }}
          min="0"
          max="5"
        />
      </div>

      {restaurants.length > 0 ? (
        <>
          <ul className="restaurant-list">
            {restaurants.map((restaurant) => (
              <li key={restaurant.id} className="restaurant-item">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <Link to={`/restaurant/${restaurant.id}`}>View Details</Link>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Prev
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </>
      ) : (
        <p>No restaurants found</p>
      )}
    </div>
  );
};

export default RestaurantList;
