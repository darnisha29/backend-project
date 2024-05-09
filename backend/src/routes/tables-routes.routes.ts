import {Router} from 'express';
import { tabelNames } from '../controller/table-name.controller';

const tableRoute= Router();

tableRoute.get("/",tabelNames);

export default tableRoute