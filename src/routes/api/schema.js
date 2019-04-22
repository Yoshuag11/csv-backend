import { Router } from 'express';

// import client from '../../db';

export const route = Router();


const schema = [
	"Type", "Direction", "From", "To", "Extension", "Forwarded To", "Name", "Date",
	"Time", "Action", "Action Result", "Result Description", "Duration", "Included",
	"Purchased"
];

route.get('/ring-central', (req, res)=>{
    res.json(schema);
});