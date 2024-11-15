// use the zustand package for global state
//this is a global hook
import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

//return an object for the hook
export const useAuthStore = create((set,get) => ({
    user: null,

    //create a loading state for signing up
    isSigningUp:false,

    //loading auth check
    isCheckingAuth:true,

    //loading sign out
    isLoggingOut:false,

    signup: async (credentials) => {

        //loading, fetching the information
        set({isSigningUp:true});
        try {

            
            //send a request to the backend auth endpoint
            const response = await axios.post("/api/v1/auth/signup", credentials);
            
            //after signing up we can then set the state of user
            //set expects an object, because it updates the state with whichever keys you pass into it
            set({user:response.data.user, isSigningUp:false});
            
            //success icon
            toast.success("Account created successfully");
         
            console.log(response.data.message);
        } catch (error) {

            //error icon
            //at first had an error here b/c there was no message on success
            toast.error( error.response.data.message || "An error has occured");
          
           

            set({isSigningUp:false, user:null});
              // console.log("INTERESTING");
        }

        //get the updated value of user directly from the userStore with getState()
        console.log(get().user);
    },
    login: async () => {},
    logout: async () => {

        set({isLoggingOut:true});

        try {
            const response = await axios.post("/api/v1/auth/logout");
            set({user:null, isLoggingOut:false});
            toast.success("Logged out successfully!");
        } catch (error) {
            set({isLoggingOut:false});

            toast.error(error.response.data.message || "Logout failed");
            
        }
    },

    //check if user is authenticated, by calling back end authCheck get method
    authCheck: async () => {
        set({isCheckingAuth:true});
        try {
    
            const response = await axios.get("api/v1/auth/authCheck");
            set({user:response.data.user, isCheckingAuth:false});
            

            
        } catch (error) {
            set({isCheckingAuth:false, user:null});

            console.log(error.response.data.message);
           
            // toast.error(error.response.data.message || "An error occured");

        }
    }
}));