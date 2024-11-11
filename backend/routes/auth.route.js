import express from "express";

const router = express.Router();

//create a route
//root route
//.get method "listens" for when a request is inbound from the specified path
router.get("/signup", (req,res) => {
    res.send('Signup route');
});

//login route, api and version number for best practice
router.get("/login", (req,res) => {
    res.send('Login route');
});


//logout route
router.get("/logout", (req,res) => {
    res.send('Logout route');
});

export default router;