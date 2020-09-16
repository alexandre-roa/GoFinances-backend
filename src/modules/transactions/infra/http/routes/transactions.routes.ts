// import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import TransactionsController from '../controllers/TransactionsController';
import ImportTransactionsController from '../controllers/ImportTransactionsController';

const transactionsRouter = Router();
const upload = multer(uploadConfig);
const transactionsController = new TransactionsController();
const importTransactionsController = new ImportTransactionsController();

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.post('/create/:category_id', transactionsController.create);

transactionsRouter.delete('/delete/:id', transactionsController.delete);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionsController.create,
);

export default transactionsRouter;
