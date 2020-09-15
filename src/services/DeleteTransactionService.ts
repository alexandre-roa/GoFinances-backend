import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    await transactionsRepository.find();

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
