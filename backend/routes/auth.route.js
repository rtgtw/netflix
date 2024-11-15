import express from "express";
import { signup, login, logout, authCheck} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//create a route
//root route
//.post method "listens" for when a request is inbound from the specified path
router.post("/signup", signup);

//login route, api and version number for best practice
router.post("/login", login);

//logout route
router.post("/logout", logout);

//check for authentication
router.get("/authCheck",protectRoute, authCheck);

export default router;