import { uuid } from 'uuidv4';
import Category from '@modules/categories/infra/typeorm/entities/Category';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[] = [];

  private transactions: Transaction[] = [];

  public async create(categoryTitle: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), title: categoryTitle });

    this.categories.push(category);

    return category;
  }

  public async findId(category_id: string): Promise<Category | undefined> {
    const category = this.categories.find(
      categoryId => categoryId.id === category_id,
    );

    return category;
  }

  public async findOne(categoryTitle: string): Promise<Category | undefined> {
    const checkCategoryExist = this.categories.find(
      category => category.title === categoryTitle,
    );

    return checkCategoryExist;
  }

  public async find(): Promise<Category[] | undefined> {
    return this.categories;
  }

  public async delete(category_id: string): Promise<void> {
    const filteredIds = this.transactions.findIndex(
      transaction => transaction.category_id === category_id,
    );

    this.transactions.splice(filteredIds, 1);
  }
}

export default CategoriesRepository;
