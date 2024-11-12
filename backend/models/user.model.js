//models are important to understand the schema of the users that we have
import mongoose from "mongoose";


//Create the user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email:{
        type:String,
        required: true,
        unique:true
    },

    password: {
        type:String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    searchHistory:{
        type: Array,
        default: []
    }
});


//create a user model, this represents a mongodb collection, 
//and serves as a UI to interact with the documents in the collection
//using the model we can use CRUD operations
//create a 'User' collection using userSchema (definition, the structure)
export const User = mongoose.model('User', userSchema);