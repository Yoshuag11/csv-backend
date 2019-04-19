import { Router } from 'express';
import formidable from 'formidable';
import csvtojson from 'csvtojson';
import client from '../../db';

export const route = Router();

route.put('/', (req, res) => {
    new formidable.IncomingForm().parse(req)
        .on('file', async (name, file) => {
            try {
                const jsonData = await csvtojson().fromFile(file.path);
                const keys = await client.setData(jsonData);
 
                res.send({ keys });

            } catch (error) {
                console.log(error);
                res
                    .status(400)
                    .send({ message: 'file could not be uploaded' });
            }
        })
        .on('error', err => {
            res.status(400).send({ message: 'file could not be uploaded' });
        });
});