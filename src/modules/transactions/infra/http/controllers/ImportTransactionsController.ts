import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ImportTransactionService from '@modules/transactions/services/ImportTransactionService';

export default class ImportTransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importTransaction = container.resolve(ImportTransactionService);

    const transaction = await importTransaction.execute(request.file.path);

    return response.json(transaction);
  }
}
