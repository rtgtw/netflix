import dotenv from 'dotenv';


dotenv.config();


//constants inside of a key value pair (object)
export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.port || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV
};