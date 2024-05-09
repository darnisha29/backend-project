import {Router} from 'express';
import { getEmployeeData ,postEmployeeData} from '../controller/employee.controller';

const employeeRoute= Router();

employeeRoute.get("/",getEmployeeData);
employeeRoute.post("/",postEmployeeData);

export default employeeRoute