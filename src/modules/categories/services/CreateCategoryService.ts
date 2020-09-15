import { injectable, inject } from 'tsyringe';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  categoryTitle: string;
}
@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ categoryTitle }: IRequest): Promise<Category | null> {
    const category = await this.categoryRepository.create(categoryTitle);

    return category;
  }
}

export default CreateCategoryService;
