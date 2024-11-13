import express from 'express';
import cookieParser from 'cookie-parser';

//these are the full router objects in here
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

import {ENV_VARS} from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';



//creates an express backend application 
const app = express();
const PORT = ENV_VARS.PORT;

//express.json parses the JSON and turns it into a javascript object
app.use(express.json());
//we use cookie parser to parse the cookies from the request
app.use(cookieParser())

//*** we use middleWare to protect the routes, to authroize individuals before giving them access

//mounting routes to base path
//imported router objects gets mounted with all of their routes inside of it
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

//use the methods from the express library 
//listen on port 5000
app.listen(PORT, ()=>{
    console.log('Server started on http://localhost:' + PORT);
    connectDB();
});





