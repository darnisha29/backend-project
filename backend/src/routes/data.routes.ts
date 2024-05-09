import {Router} from 'express';
import { getData ,postData} from '../controller/data.controller';

const dataRoute= Router();

dataRoute.get("/",getData);
dataRoute.post("/",postData);

export default dataRoute