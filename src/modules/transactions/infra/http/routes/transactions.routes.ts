// import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';
import uploadConfig from '@config/upload';
import ImportTransactionsService from '@modules/transactions/services/ImportTransactionsService';
import ensureIsValidId from '@modules/transactions/infra/middlewares/ensureIsValidId';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const upload = multer(uploadConfig);
const transactionsController = new TransactionsController();

// transactionsRouter.get('/', async (request, response) => {
//   const transactionsRepository = getCustomRepository(TransactionsRepository);
//   const balancerepository = new TransactionsRepository();

//   const balance = await balancerepository.getBalance();

//   const transactions = await transactionsRepository.all();
//   response.json({ transactions, balance });
// });

transactionsRouter.post('/:category_id', transactionsController.create);

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
  async (request, response) => {
    const importTransaction = new ImportTransactionsService();

    const transactions = await importTransaction.execute(request.file.path);

    response.json(transactions);
  },
);

export default transactionsRouter;
