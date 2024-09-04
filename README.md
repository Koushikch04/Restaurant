[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/0mcQpGXT)

# Project Assignment: Zomato Restaurant Listing & Searching

## Key Use Cases

### Data Loading

Create an independent script to load the Zomato restaurant data available [here](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) into a database.

### Web API Service

Develop a web API service with the following endpoints to serve the content loaded in the previous step:

- **Get Restaurant by ID**: Retrieve details of a specific restaurant by its ID.
- **Get List of Restaurants**: Fetch a list of restaurants with pagination support.

### User Interface

Develop a web application with the following pages, which must connect to the web API service:

- **Restaurant List Page**: Display a list of restaurants. Clicking on a restaurant should navigate the user to the restaurant's detail page.
- **Restaurant Detail Page**: Show details of a specific restaurant.
- **Location search**: Search restaurants in given latitude and longitude range (e.g restaurants in 3 km of a given latitude and longitude)
- **Image search**: Upload an image of a food like icecream, pasta etc., and search restaurants which offer those cuisines.

## Additional Use Cases (Optional)

If time allows, implement the following additional features, ensuring they are supported in both the API and the UI:

- **Filtering Options**:
  - By Country
  - By Average Spend for Two People
  - By Cuisines
- **Search Functionality**: Enable search for restaurants by name and description.

# Zomato Restaurant Listing & Searching Application

## Overview

The Zomato Restaurant Listing & Searching application is a MERN stack project that allows users to search for restaurants based on location and image uploads, view detailed information about each restaurant, and navigate through a paginated list of restaurants. The application uses MongoDB, Express.js, React, and Node.js to deliver a seamless user experience.

## Features

- **Restaurant Listing**: Browse a paginated list of restaurants with basic details.
- **Restaurant Detail View**: View detailed information about a specific restaurant.
- **Location-Based Search**: Search for restaurants based on geographical location.
- **Image-Based Search**: Upload an image to search for similar restaurants.
- **Filtering**: Filter restaurants by country, average spend, and cuisines.

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB instance running (local or cloud-based like MongoDB Atlas).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/e42-typeface-ai/iiits-Koushikch04.git
   cd iiits-Koushikch04
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

3. **Install backend dependencies:**

   ```bash
   npm install

   ```

4. **Start the backend server:**

   ```bash
   npm run start
   ```

5. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

6. **Install frontend dependencies:**

   ```bash
   npm install
   ```

7. **Start the React development server:**

   ```bash
   npm run dev
   ```

## Configuration

### API Endpoints

- **GET /restaurants**

  - **Description**: Lists restaurants with pagination.
  - **Query Parameters**:
    - `page`: Page number for pagination.
    - `limit`: Number of restaurants per page.

- **GET /restaurant/:id**

  - **Description**: Gets details of a specific restaurant.
  - **Path Parameters**:
    - `id`: The unique identifier of the restaurant.

- **GET /restaurants/search/location**

  - **Description**: Searches for restaurants by location.
  - **Query Parameters**:
    - `latitude`: Latitude of the location.
    - `longitude`: Longitude of the location.

- **POST /restaurants/search/image**

  - **Description**: Searches for restaurants by uploaded image.
  - **Body**:

    - `image`: Base64-encoded image data.

    ### Imagga API Integration

- **Image Recognition**: The image recognition feature uses the Imagga API to analyze and search for restaurants based on the uploaded image. Ensure that you have the Imagga API credentials (`API Key`, `API Secret`, and `Authorization details`) configured in your backend.

## Usage

### Browse Restaurants

- Navigate to the home page to view a list of restaurants.
- Use pagination controls to navigate through pages.

### View Restaurant Details

- Click on the "View Details" link for a restaurant to see more information.

### Search by Location

- Go to the Location Search page.
- Input latitude and longitude to find nearby restaurants.

### Search by Image

- Upload an image on the Image Search page to find restaurants containing the item in the uploaded image.

## Project Structure

- **/backend**: Contains the server-side code, including API routes and database models.

  - **/models**: Contains Mongoose schemas for MongoDB.
  - **/routes**: Contains Express.js routes for handling API requests.
  - **/controllers**: Contains functions for processing requests and interacting with the database.
  - **server.js**: Entry point for the backend server.

- **/frontend**: Contains the client-side code, including React components and styling.
  - **/src/components**: Contains React components for various pages and features.
  - **/src/App.js**: Main component that sets up routing for the application.
  - **/src/index.js**: Entry point for the React application.
  - **/public**: Contains static assets like images and default files.
  - **/src/App.css**: Global styles for the React application.

## Contact

For questions or feedback, please contact [chk240404@gmail.com](mailto:chk240404@gmail.com).
