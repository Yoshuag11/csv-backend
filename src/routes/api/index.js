import { Router } from 'express';
import { route as query } from './query';
import { route as files } from './files';
import { route as schema } from './schema';

export const route = Router();

route.use('/query', query);
route.use('/files', files);
route.use('/schema', schema);