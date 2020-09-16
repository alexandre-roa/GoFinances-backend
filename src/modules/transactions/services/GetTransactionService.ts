import { inject, injectable } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
class GetTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find();

    return transactions;
  }
}

export default GetTransactionService;
