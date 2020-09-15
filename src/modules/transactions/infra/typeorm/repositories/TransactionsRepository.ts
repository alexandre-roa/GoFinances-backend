import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Category from '@modules/categories/infra/typeorm/entities/Category';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IGetTransactionsDTO from '@modules/transactions/dtos/IGetTransactionsDTO';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';

@EntityRepository(Transaction)
class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async getBalance(): Promise<IBalance> {
    const transactions = await this.ormRepository.find();

    const { income, outcome } = transactions.reduce(
      (acc, cur) => {
        switch (cur.type) {
          case 'income':
            acc.income += cur.value;
            break;
          case 'outcome':
            acc.outcome += cur.value;
            break;
          default:
            break;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public async create({
    title,
    type,
    value,
    category_id,
    category,
  }: ICreateTransactionsDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      title,
      type,
      value,
      category_id,
      category,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async all(): Promise<IGetTransactionsDTO[]> {
    const categoryRepository = getRepository(Category);

    const transaction = await this.ormRepository.find();
    const category = await categoryRepository.find();

    const transactions = transaction.map(item => {
      return {
        id: item.id,
        title: item.title,
        value: item.value,
        type: item.type,
        category: category.find(cat => cat.id === item.category_id),
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    });

    return transactions;
  }
}

export default TransactionsRepository;
