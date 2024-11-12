//import express to create a router
import express from "express";
import { getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();

//router = endpoint
//controller = business logic (method)
//first parameter is what the endpoint should be, second parameter is business logic
//we just want one trending movie, so singular for the method
router.get("/trending", getTrendingMovie);

export default router;

