import app from './app.js';
import connectToDB from './config/db.js';
import { initDB } from './config/sequelize.js';
import "./workers/workers.js";
import config from './config/dotenv.config.js';

app.listen(config.port,()=>{
    connectToDB();
    initDB();
    console.log(`Server is running on port ${config.port}`);
})