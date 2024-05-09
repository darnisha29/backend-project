import {Router} from 'express';
import { getMetaData } from '../controller/meta.controller';

const router= Router();

router.get("/",getMetaData);

export default router