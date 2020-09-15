import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Category from '../../categories/infra/typeorm/entities/Category';

interface IRequest {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  categoryTitle: string;
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
    categoryTitle,
  }: IRequest): Promise<Transaction | null> {
    const categoryRepository = getRepository(Category);

    const { total } = await this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance', 400);
    }

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: categoryTitle },
    });

    if (checkCategoryExists) {
      const categoryAll = await categoryRepository.find({
        where: { title: categoryTitle },
      });

      const transaction = this.transactionsRepository.create({
        title,
        type,
        value,
        category_id: categoryAll[0].id,
        category: categoryAll[0],
      });

      return transaction;
    }

    const category = categoryRepository.create({
      title: categoryTitle,
    });

    await categoryRepository.save(category);

    const category_id = category.id;
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
