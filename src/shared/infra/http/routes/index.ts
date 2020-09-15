import { Router } from 'express';

import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
