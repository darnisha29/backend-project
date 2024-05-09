import express from 'express';
import { ConnectionPool } from 'mssql';
import { mssqlConfig } from '../config/database';
import { RESPONSE_MESSAGE, STATUS_CODE } from '../constants';


const pool = new ConnectionPool(mssqlConfig);

export const getData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { tableNames } = req.query;

        await pool.connect();
        const connection = pool.request();

        const tableData = await connection.query(`
            SELECT COLUMN_NAME, DATA_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = '${tableNames}'
        `);

        const metadata = tableData.recordset
            .filter((row: any) => row.COLUMN_NAME !== 'id' && row.COLUMN_NAME !== 'created_at' && row.COLUMN_NAME !== 'updated_at' && row.COLUMN_NAME !== 'password' && row.COLUMN_NAME !== 'role')
            .map((row: any) => row.COLUMN_NAME);

        const selectColumns = metadata.map(column => `[${column}]`).join(',');


        const result = await connection.query(`
            SELECT ${selectColumns}
            FROM [company].[dbo].[${tableNames}]
        `);

        if (result.recordset.length > 0) {
            res.json({ data: result.recordset[0], message: RESPONSE_MESSAGE.__SUCCESS('Data gets') }).status(STATUS_CODE.__SUCCESS);
        } else {
            res.json({ message: RESPONSE_MESSAGE.__NOTFOUND('Data') }).status(STATUS_CODE.__NOTFOUND);
        }
    } catch (error) {
        res.json({ error: RESPONSE_MESSAGE.__FAIL('Get employee') }).status(STATUS_CODE.__FAIL);
    }
};


// export const postData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     try {
//         const { fields } = req.body;
//         //pass data like this
//         //{
//         //     "fields": {
//         //         "email": "demo@gmail.com",
//         //         "firstName": "demo",
//         //         "lastName": "Patel",
//         //         "password": "23454"
//         //     }
//         // }
//         const { tableNames } = req.query;

//         await pool.connect();
//         const request = pool.request();
//         request.input('email', email);
//         request.input('password', password);
//         request.input('firstName', firstName);
//         request.input('lastName', lastName);
//         request.input('role', 'employee'); // Assuming 'role' is a constant value

//         const result = await request.query(`
//             INSERT INTO [company].[dbo].[employee_data] (email, password, role, firstName, lastName)
//             VALUES (@email, @password, @role, @firstName, @lastName);
//         `);

//         res.json({ message: RESPONSE_MESSAGE.__SUCCESS('Data inserted') }).status(STATUS_CODE.__SUCCESS);
//     } catch (error) {
//         res.json({ error: RESPONSE_MESSAGE.__FAIL('Insert employee data') }).status(STATUS_CODE.__FAIL);
//     }
// };

export const postData = async (req:express.Request, res:express.Response) => {
    try {
        const { fields } = req.body;
        const { tableName } = req.query;
        //pass data like this
//         //{
//         //     "fields": {
//         //         "email": "demo@gmail.com",
//         //         "firstName": "demo",
//         //         "lastName": "Patel",
//         //         "password": "23454"
//         //     }
//         // }

        
        // Validate that tableName and fields are provided in the request
        if (!tableName || !fields) {
            return res.status(400).json({ error: 'tableName and fields are required' });
        }

        const columnNames = Object.keys(fields);
        const values = Object.values(fields);

        await pool.connect();
        const request = pool.request();

        // Dynamically add input parameters based on the column names and their values
        columnNames.forEach((column, index) => {
            request.input(column, values[index]);
        });

        const valuesPlaceholder = columnNames.map(column => `@${column}`).join(',');
        const columns = columnNames.join(',');

        const query = `
            INSERT INTO [company].[dbo].[${tableName}] (${columns})
            VALUES (${valuesPlaceholder});
        `;

        const result = await request.query(query);

        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to insert data' });
    }
};
