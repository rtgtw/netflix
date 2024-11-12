import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function signup(req,res){
    try {
        //client wants to send us creds, username, email, pass
        const {email,password,username} = req.body;

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

    // const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const image = "";


    //if everything passes, create the user profile
    //create a n
    const newUser = new User({
        email:email,
        password: hashedPassword,
        username: username,
        image:image
    });

    //save to the DB
    await newUser.save();

    //return a response to the client, 201 means something was created
    res.status(201).json({success:true, user: {
        ...newUser._doc,
        password:""
    } });

    } catch (error) {
        console.log("Error in signup controller "+ error.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

export async function login(req,res){
    res.send('Login route');
}

export async function logout(req,res){
    res.send('Logout route');
}