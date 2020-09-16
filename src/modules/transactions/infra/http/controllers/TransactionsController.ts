// index, show, create, update(Atualizar todos os dados, se for uma info fazer um novo controller), delete

import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import GetTransactionService from '@modules/transactions/services/GetTransactionService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { title, value, type } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      title,
      type,
      value,
      category_id,
    });

    return response.json(transaction);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getTransactions = container.resolve(GetTransactionService);

    const transactions = await getTransactions.execute();
    const balance = await getTransactions.balance();

    return response.json({ transactions, balance });
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const deleteTransaction = container.resolve(DeleteTransactionService);

    await deleteTransaction.execute(id);

    response.status(200).json({ message: 'Transaction deleted' });
  }
}
