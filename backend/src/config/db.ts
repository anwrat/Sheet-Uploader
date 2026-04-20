import {sequelize} from './sequelize.js';

const connectToDB = async() =>{
    try{
        await sequelize.authenticate();
        console.log("Connection to database established successfully");
        
    }catch(err){
        console.error("Unable to connect to database: ",err);
        process.exit(1);
    }
}

export default connectToDB;