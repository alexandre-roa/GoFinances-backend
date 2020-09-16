import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  create(categoryTitle: string): Promise<Category>;
  findId(category_id: string | undefined): Promise<Category | undefined>;
  findOne(categoryTitle: string): Promise<Category | undefined>;
  find(): Promise<Category[] | undefined>;
  delete(category_id: string): Promise<void>;
}
