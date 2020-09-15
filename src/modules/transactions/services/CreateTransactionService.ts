import CategoryRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import GetCategoryService from '@modules/categories/services/GetCategoryService';

interface IRequest {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
}
@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    title,
    type,
    value,
    category_id,
  }: IRequest): Promise<Transaction | null> {
    const { total } = await this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance', 400);
    }

    const categoryRepository = new CategoryRepository();

    const getCategory = new GetCategoryService(categoryRepository);

    const category = await getCategory.execute({ category_id });

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
      category_id,
      category,
    });

    return transaction;
  }
}

export default CreateTransactionService;
