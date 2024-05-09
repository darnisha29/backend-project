import express from 'express'
import { mssqlConfig } from '../config/database';
import { ConnectionPool } from 'mssql';

const pool = new ConnectionPool(mssqlConfig);

export const tabelNames = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        pool.connect()
            .then(() => {
                return pool.request()
                    .query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='dbo' AND TABLE_NAME NOT LIKE '%migration%';`)
            })
            .then(result =>{
                const tableNames = result.recordset.map(row => row.TABLE_NAME);
                res.send({message:'All table name get successfully',data:tableNames}).status(200)
            }
        )

    } catch (error) {
        console.log(error);

    }
}