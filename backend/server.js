import express from 'express';
import authRoutes from './routes/auth.route.js';
import {ENV_VARS} from '../backend/config/envVars.js';
import { connectDB } from './config/db.js';


//creates an express backend application 
const app = express();
const PORT = ENV_VARS.PORT;

//express.json parses the JSON and turns it into a javascript object
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

//use the methods from the express library 
//listen on port 5000
app.listen(PORT, ()=>{
    console.log('Server started on http://localhost:' + PORT);
    connectDB();
});


