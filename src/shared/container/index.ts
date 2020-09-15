import { container } from 'tsyringe';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import CategoryRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
