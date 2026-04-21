import dotenv from 'dotenv';
import app from './app.js';
import connectToDB from './config/db.js';
dotenv.config();

const port = process.env.PORT;
app.listen(port,()=>{
    connectToDB();
    console.log(`Server is running on port ${port}`);
})