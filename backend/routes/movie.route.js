//import express to create a router
import express from "express";
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory } from "../controllers/movie.controller.js";



const router = express.Router();

//router = endpoint
//controller = business logic (method)
//first parameter is what the endpoint should be, second parameter is business logic
//we just want one trending movie, so singular for the method
router.get("/trending", getTrendingMovie);


//create a route for trailers, can use :id to place a dynamic value
router.get("/:id/trailers", getMovieTrailers);

//create a route to get details about the specific movie 
router.get("/:id/details", getMovieDetails);

//similar movies route
router.get("/:id/similar", getSimilarMovies);

//getting movies by category
//now_playing
//popular
//top_rated
//upcoming
router.get("/:category", getMoviesByCategory);





export default router;

