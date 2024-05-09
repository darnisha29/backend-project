import { Request, Response } from "express";
import { mssqlConfig } from "../config/database";
import { ConnectionPool } from "mssql";

const pool = new ConnectionPool(mssqlConfig);

export const getMetaData =async (req: Request, res: Response) => {
    try {
        const {tableNames} = req.query      
        const connection = await pool.connect();
        const result = await connection.request().query(`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ${tableNames}`);
        
        const metadata = result.recordset
            .filter((row: any) => row.COLUMN_NAME !== 'id')
            .map((row: any) => ({
                columnName: row.COLUMN_NAME,
                dataType: row.DATA_TYPE
            }));
        return res.json(metadata);
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return res.status(500).json({ error: "Error fetching metadata" });
    }
}
