import dotenv from 'dotenv';
import app from './app.js';
import connectToDB from './config/db.js';
dotenv.config();

const port = process.env.PORT;
connectToDB();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})