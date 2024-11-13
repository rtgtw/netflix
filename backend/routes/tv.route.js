//create a tv router and route all of the endpoints (URIs) here
//controller houses all of the methods/functions that will be triggered once the URI is entered by client
import express from 'express';
import { getSimilarTvs, getTrendingTv, getTvDetails, getTvsByCategory, getTvTrailers } from '../controllers/tv.controller.js';

const router = express.Router();


router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);




//getting tv by category
//airing_today
//on_the_air
//popular
//top_rated

//exports the router object, which we mount some URIs to
export default router;