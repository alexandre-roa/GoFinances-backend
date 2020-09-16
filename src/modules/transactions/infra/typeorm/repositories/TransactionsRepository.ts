import csvParse from 'csv-parse';
import fs from 'fs';
import { getRepository, In, EntityRepository, Repository } from 'typeorm';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Category from '@modules/categories/infra/typeorm/entities/Category';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
import ICreateTransactionsDTO from '@modules/transactions/dtos/ICreateTransactionsDTO';

interface ICSVTransactions {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

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

  public async find(): Promise<Transaction[]> {
    const transaction = await this.ormRepository.find();

    return transaction;
  }

  public async import(csvFilePath: string): Promise<Transaction[]> {
    const categoriesRepository = getRepository(Category);

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const transactions: ICSVTransactions[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentsCategories = await categoriesRepository.find({
      where: { title: In(categories) },
    });

    const exsitenCategoriesTitle = existentsCategories.map(
      (category: Category) => category.title,
    );

    const addCategoryTitles = categories
      .filter(category => !exsitenCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = this.ormRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentsCategories];

    const createdTransaction = this.ormRepository.create(
      transactions.map(transation => ({
        title: transation.title,
        type: transation.type,
        value: transation.value,
        category: finalCategories.find(
          category => category.title === transation.category,
        ),
      })),
    );

    await this.ormRepository.save(createdTransaction);

    await fs.promises.unlink(csvFilePath);

    return createdTransaction;
  }

  public async delete([...id]: Array<string>): Promise<void> {
    await this.ormRepository.delete([...id]);
  }
}

export default TransactionsRepository;
