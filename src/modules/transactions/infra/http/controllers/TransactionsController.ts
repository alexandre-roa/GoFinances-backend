// index, show, create, update(Atualizar todos os dados, se for uma info fazer um novo controller), delete

import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, categoryTitle } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      title,
      type,
      value,
      categoryTitle,
    });

    return response.json(transaction);
  }
}
