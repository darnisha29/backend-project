import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import { DataSource } from 'typeorm';
import cors from 'cors';
import metaRoute from './routes/metaRoute'
const server = express();
server.use(cors());
server.use(bodyParser.json())
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

function initializeDataSource(dataSource: DataSource): Promise<DataSource> {
    return dataSource.initialize();
}

initializeDataSource(AppDataSource)
    .then(() => {
        console.log('Database connected successfully');
        
        server.use("/api/metaInfo/", metaRoute);
        
        server.listen(8000, () => console.log("Server started on http://localhost:8000"));
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });



    