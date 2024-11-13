import { fetchFromTMDB } from "../services/tmdb.service.js";

//route/path params, query params ?, body params


export async function getTrendingTv(req,res){
    try {

        

        //pass the URL for the data
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        

        //fetch a random movie
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
       
       

        res.json({success:true, content: randomMovie});

    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"});
    }

};


export async function getTvTrailers(req,res){
    const {id} = req.params;
    console.log("entered");

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        res.json({success:true, trailers: data.results})
     } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({success:true, message:"Internal server error"});
        
    }
};


export async function getTvDetails(req,res){
    const {id} = req.params;
    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

        res.status(200).json({success:true, content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({success:false, message:"internal server error"});
    }
}



export async function getSimilarTvs(req,res){
        //https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

    
        res.status(200).json({success:true, similar: data.results});
        
    } catch (error) {
        res.status(500).json({success:false, message: "internal server error"});
    }
}

export async function getTvsByCategory(req,res){

    const {category} = req.params;

    console.log(category);

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

        res.status(200).json({success:true, content: data.results});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"});
    }

}