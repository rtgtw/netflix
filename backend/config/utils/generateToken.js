//create a token and send it thru cookies
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../envVars.js";

//we use a secret to encode and decode JWT token

const options = {
    expiresIn:'15d'
};

//create a token and send the cookie
//userId payload, jwt secret, 
export const generateTokenAndSetCookie = (userId, res) => {
    //create the token
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET,options);

    //place it into a cookie
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in miliseconds
        httpOnly: true, //cookie is only accessible by a browser and not javascript
        sameSite:"strict",
        secure: ENV_VARS.NODE_ENV !== "development"
    })


    return token;
};