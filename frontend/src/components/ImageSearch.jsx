import { useState, useEffect } from "react";
import axios from "axios";
import "./ImageSearch.css";

const ImageSearch = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const [topTags, setTopTags] = useState([]); // State for top tags
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!image) return;

      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", image);

      try {
        const result = await axios.post(`/restaurants/search/image`, formData);

        // Deduplicate results based on id
        const uniqueResults = Array.from(
          new Map(
            result.data.restaurants.map((item) => [item.id, item])
          ).values()
        );

        setResults(uniqueResults);
        setTopTags(result.data.topTags);
        setCurrentPage(1); // Reset page to 1
      } catch (error) {
        setError("Error searching for restaurants.");
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [image]);

  useEffect(() => {
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    setDisplayResults(results.slice(start, end));
  }, [results, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(results.length / resultsPerPage)) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(results.length / resultsPerPage);
    const pages = [];
    const maxPagesToShow = 10;

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

  return (
    <div className="image-search">
      <h1>Image Search</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={() => handlePageChange(1)} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <div className="error">{error}</div>}
      {image === null && !loading && (
        <div className="info">Please upload an image to start searching.</div>
      )}
      {topTags.length > 0 && (
        <div className="top-tags">
          <h2>Top Tags:</h2>
          <ul>
            {topTags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
      {displayResults.length > 0 && (
        <>
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
              disabled={
                currentPage === Math.ceil(results.length / resultsPerPage)
              }
            >
              Next &raquo;
            </button>
          </div>
          <div className="restaurant-cards">
            {displayResults.map((result) => (
              <a
                href={`/restaurant/${result.id}`}
                key={result.id}
                className="restaurant-card"
              >
                <img
                  src={result.featuredImage}
                  alt={result.name}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{result.name}</h3>
                  <p className="card-info">{result.description}</p>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
      {displayResults.length === 0 && !loading && <div>No results found</div>}
    </div>
  );
};

export default ImageSearch;
