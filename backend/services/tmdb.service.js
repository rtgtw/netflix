//create the service for the movide data base api
import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';



  



export const fetchFromTMDB = async (url) => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
        }
      };

     
      try {
        const response = await axios.get(url, options)

        

        if(response.status !== 200){
          throw new Error('Failed to fetch from TMDB ' + response.statusText);
        }
  
     

        return response.data;

      } catch (error) {

        console.error("Error fetching data from tmbd", error.message);
        return null;
      }
     
}