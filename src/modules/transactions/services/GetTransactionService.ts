import { inject, injectable } from 'tsyringe';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
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

  public async balance(): Promise<IBalance> {
    const balance = await this.transactionsRepository.getBalance();

    return balance;
  }
}

export default GetTransactionService;
