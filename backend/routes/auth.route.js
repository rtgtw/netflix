import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

//create a route
//root route
//.get method "listens" for when a request is inbound from the specified path
router.get("/signup", signup);

//login route, api and version number for best practice
router.get("/login", login);

//logout route
router.get("/logout", logout);

export default router;