import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";


export async function searchPerson(req,res){

//https://api.themoviedb.org/3/search/person?query=f&include_adult=false&language=en-US&page=1

//get the query parameter passed in url
    const {query} = req.params;
    try {

        
        //this search needs to also be saved to a history
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
    

        if(response.results.length === 0){
            res.status(404).send(null);
        }
       

        //add to search history functionality
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({success:true, content:response.results });
    } catch (error) {
        console.log("error in searchPerson controller ", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }



};

export async function searchMovie(req,res){

    const {query} = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length === 0){
            res.status(404).send(null);
        };


        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({success:true, content:response.results });

    } catch (error) {
        console.log("error in searchMovie controller ", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
        
    }


};

export async function searchTv(req,res){

    const {query} = req.params;


    try {

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);


      

        if(response.results.length === 0){
            res.status(404).send(null);
        };



        
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({success:true, content:response.results });
        
    } catch (error) {
        console.log("error in searchTv controller ", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }

};


export async function getSearchHistory(req,res){

    try {
        res.status(200).json({success:true, content: req.user.searchHistory});

    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"});
    }

};


export async function removeItemFromSearchHistory(req,res){
    let {id} = req.params;

    //string -> int
    id = parseInt(id);

    try {
        //deletes from the DB, with pull from an array
        await User.findByIdAndUpdate(req.user._id, {
            $pull:{
                searchHistory:{
                    id:id
                }
            }
        });

        res.status(200).json({success:true, message: "item has been removed from search history" });
    } catch (error) {
        
        console.log("error in searchTv controller ", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}