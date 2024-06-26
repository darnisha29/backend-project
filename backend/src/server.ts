import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import { DataSource } from 'typeorm';
import cors from 'cors';
import metaRoute from './routes/meta-route.routes';
import tableRoute from './routes/tables-routes.routes';
import dataRoute from './routes/data.routes';

const port = 8000;

const server = express();

server.use(cors());
server.use(bodyParser.json())
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

export default function initializeDataSource(dataSource: DataSource): Promise<DataSource> {
    return dataSource.initialize();
}

initializeDataSource(AppDataSource)
    .then(() => {
        console.log('Database connected successfully');
        
        server.use("/api/tableNames/",tableRoute);//http://localhost:8000/api/tableNames
        server.use("/api/metaInfo/", metaRoute);//http://localhost:8000/api/metaInfo?tableNames='employee_data'
        server.use("/api/data/", dataRoute);//GET-http://localhost:8000/api/data?tableNames=company_data //POST-http://localhost:8000/api/data?tableName=company_data
        
        server.listen(port, () => console.log(`Server started on http://localhost:${port}`));
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });



    