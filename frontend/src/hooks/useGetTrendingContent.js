import {useEffect, useState} from 'react';
//going to return a state
import { useContentStore } from '../store/content';
import axios from 'axios';



const useGetTrendingContent = () => {
   const [trendingContent, setTrendingContent] = useState(null);

   const {contentType} = useContentStore();

   useEffect(() => {


    const getTrendingContent = async () => {
       const response =  await axios.get(`/api/v1/${contentType}/trending`);

       setTrendingContent(response.data.content);
    }

    getTrendingContent();
  
    //every time contentType changes, when we flip from Movies tab to TV shows tab, run this useEffect function,
    //which fetches based on if its tv show or movie

   }, [contentType]);


   
   return {trendingContent};
}




export default useGetTrendingContent