import express from 'express';
import { ConnectionPool } from 'mssql';
import { mssqlConfig } from '../config/database';
import { RESPONSE_MESSAGE, STATUS_CODE } from '../constants';


const pool = new ConnectionPool(mssqlConfig);

export const getEmployeeData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {emp_id} = req.query

        pool
            .connect()
            .then(() => {
                return pool.request()
                    .query(`SELECT [email],[firstName],[lastName] from [company].[dbo].[employee_data] WHERE id=${emp_id};`)
            }).then(result=>{
                if(result.recordset.length>0){
                    return res.json({data:result.recordset[0],message:RESPONSE_MESSAGE.__SUCCESS('Data gets')}).status(STATUS_CODE.__SUCCESS)
                }else{
                    return res.json({message:RESPONSE_MESSAGE.__NOTFOUND('Data')}).status(STATUS_CODE.__NOTFOUND)
                }})

    } catch (error) {
        res.json({error:RESPONSE_MESSAGE.__FAIL('Get employee')}).status(STATUS_CODE.__FAIL)
    }
};

export const postEmployeeData = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        await pool.connect();
        const request = pool.request();
        request.input('email', email);
        request.input('password', password);
        request.input('firstName', firstName);
        request.input('lastName', lastName);
        request.input('role', 'employee'); // Assuming 'role' is a constant value
        
        const result = await request.query(`
            INSERT INTO [company].[dbo].[employee_data] (email, password, role, firstName, lastName)
            VALUES (@email, @password, @role, @firstName, @lastName);
        `);

        res.json({ message: RESPONSE_MESSAGE.__SUCCESS('Data inserted') }).status(STATUS_CODE.__SUCCESS);
    } catch (error) {
        console.error(error);
        res.json({ error: RESPONSE_MESSAGE.__FAIL('Insert employee data') }).status(STATUS_CODE.__FAIL);
    }
};
