import express from "express";
import { signup, login, logout} from "../controllers/auth.controller.js";

const router = express.Router();

//create a route
//root route
//.post method "listens" for when a request is inbound from the specified path
router.post("/signup", signup);

//login route, api and version number for best practice
router.post("/login", login);

//logout route
router.post("/logout", logout);

export default router;