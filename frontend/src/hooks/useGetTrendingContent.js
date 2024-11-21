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

    //by triggering this, this sets Trending Content, then we just return trending content
    //as an object
    getTrendingContent();
  
    //every time contentType changes, when we flip from Movies tab to TV shows tab, run this useEffect function,
    //which fetches based on if its tv show or movie
    //so everytime the tab is flipped, content type changes back and forth
    //everytime its triggered, the code in useEffect triggers as well

   }, [contentType]);


   
   return {trendingContent};
}




export default useGetTrendingContent