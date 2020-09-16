// import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';
import uploadConfig from '@config/upload';
import ensureIsValidId from '@modules/transactions/infra/middlewares/ensureIsValidId';
import TransactionsController from '../controllers/TransactionsController';
import ImportTransactionsController from '../controllers/ImportTransactionsController';

const transactionsRouter = Router();
const upload = multer(uploadConfig);
const transactionsController = new TransactionsController();
const importTransactionsController = new ImportTransactionsController();

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.post('/create/:category_id', transactionsController.create);

transactionsRouter.delete(
  '/:id',
  ensureIsValidId,
  async (request, response) => {
    const { id } = request.params;
    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute(id);

    return response.status(204).send();
  },
);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionsController.create,
);

export default transactionsRouter;
