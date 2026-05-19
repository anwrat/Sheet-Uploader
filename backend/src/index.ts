import app from './app.js';
import connectToDB from './config/db.js';
import { initDB } from './config/sequelize.js';
import "./workers/workers.js";
import config from './config/dotenv.config.js';
import {tusServer} from './config/tus.config.js';

app.all("/files", (req, res) => {
  tusServer.handle(req, res);
});

app.all('/files*path',(req,res)=>{
    tusServer.handle(req,res);
});

app.listen(config.port,()=>{
    connectToDB();
    initDB();
    console.log(`Server is running on port ${config.port}`);
    console.log(`Tus endpoint ready at http://localhost:${config.port}/files`);
})