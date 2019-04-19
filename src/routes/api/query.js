import { Router } from 'express';

import client from '../../db';

export const route = Router();

route.get('/', async (req, res) => {
    const {
        query,
        criteria,
        offset = 0,
        limit
    } = req.query;
    try {
        const response = await client.getFiltered({ criteria, query, limit, offset });
        const { rowCount, rows } = response;
        res.send({ rowCount, rows });
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});