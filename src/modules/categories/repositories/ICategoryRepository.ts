import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ITransactionsRepository {
  create(categoryTitle: string): Promise<Category>;
  // findCategoryTitle(categoryTitle: string): Promise<Category | undefined>;
  // findAllCategories(categoryTitle: string): Promise<Category[]>;
}
