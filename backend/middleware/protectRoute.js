import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ENV_VARS} from '../config/envVars.js';

//status 401 means unauthroized

export const protectRoute = async (req, res, next) => {
    try {
        
        //get the token from the client
        const token = req.cookies['jwt-netflix'];

        if(!token){
            return res.status(401).json({success:false, message:"unauthroized - no token provided"});
        }

        //decode the jwt token with .verify method
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

       
        if(!decoded){
            return res.status(401).json({success:false, message: "unauthorized - invalid token"});
        }

        //passed, get the user from the db, we do this by extracting the user id from the token
        //we want everything but the password, so we are deselecting the password
        //checks for a user in the database
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({success:false, message: "User not foundm"});
        }

        //since we already found the user inside of the middleware, we can attach this information to the request
        //and pass that to the routes for that inbound information
        req.user = user;


        //if they are authenticated w/ a jwt-token, go to the routes
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: " ,error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}