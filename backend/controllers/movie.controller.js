import { fetchFromTMDB } from "../services/tmdb.service.js";


export async function getTrendingMovie(req,res){
    try {

        

        //pass the URL for the data
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        

        //fetch a random movie
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
       
       

        res.json({success:true, content: randomMovie});

    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"});
    }

}