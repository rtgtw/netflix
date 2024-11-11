import express from 'express';
import authRoutes from './routes/auth.route.js';


//creates an express backend application 
const app = express();

app.use("/api/v1/auth", authRoutes);









//use the methods from the express library 
//listen on port 5000
app.listen(5000, ()=>{
    console.log('Server started on http://localhost:5000')
});