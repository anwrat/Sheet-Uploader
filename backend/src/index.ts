import dotenv from 'dotenv';
import app from './app.js';
import connectToDB from './config/db.js';
import { initDB } from './config/sequelize.js';
dotenv.config();

const port = process.env.PORT;
app.listen(port,()=>{
    connectToDB();
    initDB();
    console.log(`Server is running on port ${port}`);
})