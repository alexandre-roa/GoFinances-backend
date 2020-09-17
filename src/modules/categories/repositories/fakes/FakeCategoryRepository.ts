import Category from '@modules/categories/infra/typeorm/entities/Category';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[] = [];

  private transactions: Transaction[] = [];

  public async create(categoryTitle: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: '1234567890', title: categoryTitle });

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

  public async delete(category_id: string): Promise<void | Category[]> {
    const filteredIds = this.categories.findIndex(
      category => category.id === category_id,
    );

    this.categories.splice(filteredIds, 1);
    return this.categories;
  }
}

export default CategoriesRepository;
