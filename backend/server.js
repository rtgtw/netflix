import express from 'express';


//creates an express backend application 
const app = express();

//use the methods from the express library 
//listen on port 5000
app.listen(5000, ()=>{
    console.log('Server started on http://localhost:5000')
});