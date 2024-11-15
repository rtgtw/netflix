import { generateTokenAndSetCookie } from "../config/utils/generateToken.js";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function signup(req,res){
    try {
        //client wants to send us creds, username, email, pass
        const {email,password,username} = req.body;

        console.log("/SIGNUP TRIGGERED! OBJECT RECEIVED: " + req.body.email);

        //first we have to check if the user passed all of the necessary values
        if(!email || !password || !username){
            return res.status(400).json({success:false, message: "All fields are required"});
        }

        //make sure its an actual email, we can use a REGEX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({success:false, message: "invalid email"});
    }

    //check for password length
    if(password.length < 6){
        return res.status(400).json({success:false, message: "password length must be atleast 6 characters"});
    }


    //check for existing user by email
    const existingUserByEmail = await User.findOne({email:email});

    if(existingUserByEmail){
        return res.status(400).json({success:false, message: "email already exists"});
    }

    //check for existing usernames
    const existingUserByUsername = await User.findOne({username: username});

    if(existingUserByUsername){
        return res.status(400).json({success:false, message: "username already exists"});
    }

    //bcrypt salt for hasing
    const salt  = await bcryptjs.genSalt(10);

    //hash the passwords
    const hashedPassword = await bcryptjs.hash(password,salt);


    //get a random profile picture
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.ping", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
  


    //if everything passes, create the user profile
    //create a n
    const newUser = new User({
        email:email,
        password: hashedPassword,
        username: username,
        image:image
    });

 
        //generate token, return token, and also create a cookie in the response
        generateTokenAndSetCookie(newUser._id,res);

        //save the user in the db
        await newUser.save();


           //return a response to the client, 201 means something was created
        res.status(201).json({success:true, message:`${username} has been created into the system`,user: {
        ...newUser._doc,
        password:""
         } });
    

    //save to the DB
   
    } catch (error) {
        console.log("Error in signup controller "+ error.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};



export async function login(req,res){
    try {
        //get the email and the password
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false, message: "all fields are required"});
        }

        const user = await User.findOne({email:email});

        if(!user){
            return res.status(404).json({success: false, message: "invalid credentials"});
        }

        const isPasswordCororect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCororect){
            return res.status(400).json({success: false, message: "invalid credentails"});
        }

    //if they pass the check, generate a token and set the cookie
    //this returns the token but we dont really need to for now, doesnt have to return it
    generateTokenAndSetCookie(user._id, res);


    res.status(200).json({
        success:true,
        user:{
            ...user._doc,
            password:""
        },
        message:"logged in"
    })

    } catch (error) {
        console.log("Error in login controller ", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}


//clear the cookies
export async function logout(req,res){
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message: "Logged out successfuly"});
        console.log(`${req}`);
        
    } catch (error) {
        console.log("Error in log out controller", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}


export async function authCheck(req,res){
    try {
        //return the user
        res.status(200).json({success:true, user:req.user});
    } catch (error) {
        console.log("error in authCheck controller");
        res.status(500).json({success:false, message:"Internal server error"});
        
    }
}