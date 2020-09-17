import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async delete(category_id: string): Promise<void | Category[]> {
    const categories = await this.categoryRepository.delete(category_id);

    return categories;
  }
}

export default DeleteCategoryService;
