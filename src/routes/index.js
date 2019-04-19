import { Router } from 'express';
import {route as api} from './api';

export const route = Router();

route.get('/', (req, res) => {
    res.send(`API is working! with es6`);
});

route.use(api);