import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import LocationSearch from "./components/LocationSearch";
import ImageSearch from "./components/ImageSearch";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/search/location" element={<LocationSearch />} />
          <Route path="/search/image" element={<ImageSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
