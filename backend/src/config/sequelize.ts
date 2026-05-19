import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { Employee } from '../models/employee.model.js';
import { Job } from '../models/job.model.js';
import config from '../config/dotenv.config.js'

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: 'SheetUploader',
    user: config.postgres_user,
    password: config.postgres_pass,
    host: 'localhost',
    port: 5432,
    models: [Employee, Job],
    pool:{
        max: 20,
        min: 2,
    }
})

export async function initDB(){
    await sequelize.authenticate();
    await sequelize.sync({
        // force: true
    });
    console.log('Database synced successfully');
}
