import {Router} from 'express';
import { getData } from '../controller/meta.controller';

const router= Router();

router.get("/",getData);

export default router