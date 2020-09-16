import { injectable, inject } from 'tsyringe';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

@injectable()
class ImportTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(csvFilePath: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.import(csvFilePath);

    return transactions;
  }
}

export default ImportTransactionService;
